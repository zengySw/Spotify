import podcasts from "../data/podcasts.json";
import audiobooks from "../data/audiobooks.json";
import playlists from "../data/playlists.json";
import users from "../data/users.json";

const env = import.meta.env;

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const SPOTIFY_API = "https://api.spotify.com/v1";

let tokenCache = null;
let tokenExpiry = 0;
let tokenPromise = null;

const cache = new Map();

export const getToken = async () => {
    const stored = sessionStorage.getItem("spotify_token");
    const expiry = Number(sessionStorage.getItem("spotify_token_expiry"));

    if (stored && Date.now() < expiry) {
        return stored;
    }

    if (tokenCache && Date.now() < tokenExpiry) {
        return tokenCache;
    }

    if (tokenPromise) return tokenPromise;

    tokenPromise = (async () => {
        console.log("[Spotify] refreshing token");

        const res = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization:
                    "Basic " +
                    btoa(
                        `${import.meta.env.VITE_SPOTIFY_CLIENT_ID}:${import.meta.env.VITE_SPOTIFY_CLIENT_SECRET}`
                    )
            },
            body: new URLSearchParams({
                grant_type: "refresh_token",
                refresh_token: import.meta.env.VITE_SPOTIFY_REFRESH_TOKEN
            })
        });

        const data = await res.json();

        tokenCache = data.access_token;
        tokenExpiry = Date.now() + (data.expires_in - 60) * 1000;

        sessionStorage.setItem("spotify_token", tokenCache);
        sessionStorage.setItem("spotify_token_expiry", tokenExpiry);

        tokenPromise = null;

        return tokenCache;
    })();

    return tokenPromise;
};

export const spotifyApiRequest = async (endpoint, params = {}) => {
    const key = endpoint + JSON.stringify(params);

    if (cache.has(key)) {
        return cache.get(key);
    }

    const token = await getToken();

    const url =
        `https://api.spotify.com/v1/${endpoint}?` +
        new URLSearchParams(params);

    console.log("[Spotify] request:", endpoint);

    const res = await fetch(url, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const text = await res.text();

    console.log("[Spotify] status:", res.status);

    if (!res.ok) {
        console.error("[Spotify] error response:", text);

        throw new Error(
            `Spotify API Error ${res.status}: ${text}`
        );
    }

    let data;

    try {
        data = JSON.parse(text);
    } catch (err) {
        console.error("[Spotify] invalid JSON:", text);

        throw new Error("Spotify returned invalid JSON");
    }

    cache.set(key, data);

    setTimeout(() => {
        cache.delete(key);
    }, 300000);

    return data;
};

const mapTrack = (result) => ({
    id: result.id,
    title: result.name,
    artists: (result.artists || []).map(a => a.name),
    icon: result.album?.images?.[0]?.url || "/default-avatar.jpg",
    album: result.album?.name || "",
    duration: result.duration_ms,
    addDate: null
});

const mapArtist = (artist) => ({
    ...artist,
    icon: artist.images?.[0]?.url || "/default-avatar.jpg",
    followers: artist.followers?.total || Math.floor(Math.random() * 50000) + 1000
});

const mapAlbum = (album) => ({
    ...album,
    title: album.name,
    artists: album.artists?.map(a => a.name) || [],
    icon: album.images?.[0]?.url || "",
    groupTracks: album.total_tracks || 0
});

const mapPlaylist = (playlist) => ({
    ...playlist,
    id: playlist.id,
    title: playlist.name,
    icon: playlist.images?.[0]?.url || "",

    author: {
        name: playlist.owner?.display_name || "Unknown",
        icon: playlist.owner?.images?.[0]?.url || "/default-avatar.jpg",
    },

    tracks: (playlist.items.items || [])
        .filter(item => item?.item)
        .map(item => ({
            id: item.item.id,
            title: item.item.name,
            icon: item.item.album?.images?.[0]?.url || "",
            album: item.item.album?.name || "",
            duration: item.item.duration_ms,
            artists: (item.item.artists || []).map(a => a.name),
            addDate: String(new Date(item.added_at).toLocaleDateString("eu-EU"))
        }))
});

const mapPodcast = ({ episodes = [], ...podcast }) => ({
    ...podcast,

    title: podcast.name,
    icon: podcast.images?.[0]?.url || "",

    episodes: episodes.map(({ name, images = [], release_date, duration_ms }) => ({
        title: name,
        icon: images?.[2]?.url || "",
        date: release_date,
        duration: duration_ms
    }))
});

export const getTrackById = async (id) => {
    const cleanId = id.split("?")[0];
    const result = await spotifyApiRequest(`tracks/${cleanId}`, { market: "UA" });
    return result ? mapTrack(result) : null;
};

export const getArtistById = async (id) => {
    const result = await spotifyApiRequest(`artists/${id}`);
    return result ? mapArtist(result) : null;
};

export const getAlbumById = async (id) => {
    const result = await spotifyApiRequest(`albums/${id.split("?")[0]}`, { market: "UA" });
    return result ? mapAlbum(result) : null;
};

export const getRecommendations = async (playlistUrl, max = 100, offset = 0) => {
    const id = playlistUrl;
    const playlist = await spotifyApiRequest(`playlists/${id}/items`, {
        limit: max,
        offset,
        market: "UA",
    });

    if (!playlist) return null;

    return (playlist.items || []).map(({ item }) => (mapTrack(item)));
};

export const getTracksByIds = async (ids) => {
    const uniqueIds = [...new Set(ids.map(id => id.split("?")[0]))];
    const results = [];
    for (const id of uniqueIds) {
        try {
            const track = await getTrackById(id);
            if (track) results.push(track);
        } catch { }
        await delay(300);
    }
    return results;
};

export const getArtistsByIds = async (ids) => {
    const uniqueIds = [...new Set(ids.map(id => id.split("?")[0]))];
    const results = [];
    for (const id of uniqueIds) {
        try {
            const artist = await getArtistById(id);
            if (artist) results.push(artist);
        } catch { }
        await delay(300);
    }
    return results;
};

export const getAlbumsByIds = async (ids) => {
    const uniqueIds = [...new Set(ids.map(id => id.split("?")[0]))];
    const results = [];
    for (const id of uniqueIds) {
        try {
            const album = await getAlbumById(id);
            if (album) results.push(album);
        } catch { }
        await delay(300);
    }
    return results;
};

export const getLikedTracks = async (limit = 50, offset = 0) => {
    const res = await spotifyApiRequest("me/tracks", {
        limit: limit,
        offset: offset,
        market: "UA",
    })

    return (res.items || []).map(item => ({
        ...mapTrack(item.track),
        addDate: item.added_at
    }));
}

export const getMyPlaylists = async (limit = 50, offset = 0) => {
    const result = await spotifyApiRequest("me/playlists", {
        limit: limit,
        offset: offset,
        market: "UA",
    });

    return (result.items || []).map(item => mapPlaylist(item))
}

export const getMyAlbums = async (limit = 50, offset = 0) => {
    const result = await spotifyApiRequest("me/albums", {
        limit,
        offset,
        market: "UA",
    });

    return (result.items || []).map(item => mapAlbum(item.album));
};

export const getMyArtists = async (limit = 50) => {
    const result = await spotifyApiRequest("me/following", {
        limit: limit,
        market: "UA",
        type: "artist"
    });

    return (result?.artists?.items || []).map(item => mapArtist(item));
};

export const getMyPodcasts = async (limit = 50) => {
    const { items = [] } = await spotifyApiRequest("me/shows", {
        limit,
        market: "UA"
    });

    return Promise.all(
        items.map(async ({ show }) => {
            const { items: episodes = [] } = await spotifyApiRequest(
                `shows/${show.id}/episodes`,
                { limit: 10, market: "UA" }
            );

            
            return mapPodcast({ ...show, episodes });
        })
    );
};

export const getAudiobookById = (id) => {
    return audiobooks.audiobooks.find(
        book => book.id === Number(id)
    );
};

export const getPlaylistById = async (id) => {
    const playlist = await spotifyApiRequest(`playlists/${id}`);
    if (!playlist) return null;

    return {
        id: playlist.id,
        name: playlist.name,
        icon: playlist.images?.[0]?.url || "",

        author: {
            name: playlist.owner?.display_name || "Unknown",
            icon: playlist.owner?.images?.[0]?.url || "/default-avatar.jpg",
        },

        tracks: (playlist.items.items || [])
            .filter(item => item?.item)
            .map(item => ({
                id: item.item.id,
                title: item.item.name,
                icon: item.item.album?.images?.[0]?.url || "",
                album: item.item.album?.name || "",
                duration: item.item.duration_ms,
                artists: (item.item.artists || []).map(a => a.name),
                addDate: String(new Date(item.added_at).toLocaleDateString("eu-EU"))
            }))
    };
};

export const getUserById = async (id) => {
    const results = await apiRequest("users", {
        id,
    });

    results.map(user => {
        user.username = user.name;
        user.avatar = user.image;
        user.bio = "Music lover & playlist curator";
    });

    return results[0] || null;
};

export const getPlaylistTracks = async (playlistId) => {
    const playlist = await getPlaylistById(playlistId);

    if (!playlist) return [];

    const tracks = await Promise.all(
        playlist.tracks.map(trackId =>
            getTrackById(trackId)
        )
    );

    return tracks.filter(Boolean);
};

export const searchMp3 = async ({ title, artist }) => {
    const query = encodeURIComponent(`${artist} ${title}`);

    const res = await fetch(
        `https://discoveryprovider.audius.co/v1/tracks/search?query=${query}&app_name=my_app`
    );

    if (!res.ok) {
        throw new Error(`Audius error: ${res.status}`);
    }

    const { data = [] } = await res.json();

    const track = data.find(
        t => t.access?.stream && t.stream?.url
    );

    if (!track) return null;

    return {
        id: track.id,
        title: track.title,
        artist: track.user?.name,
        artwork: track.artwork?.["480x480"] || "",
        mp3: track.stream.url
    };
};