import podcasts from "../data/podcasts.json";
import audiobooks from "../data/audiobooks.json";
import playlists from "../data/playlists.json";
import users from "../data/users.json";

const env = import.meta.env;

const USER_ID = env.VITE_USER_ID;
const MAX_TRACKS = env.VITE_MAX_TRACKS;
const API_KEY = env.VITE_API_KEY;

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// const apiRequest = async (endpoint, params = {}) => {
//     const query = new URLSearchParams({
//         client_id: USER_ID,
//         format: "json",
//         limit: MAX_TRACKS,
//         ...params,
//     });

//     const url = `/jamendo/${endpoint}/?${query.toString()}`;

//     const res = await fetch(url);

//     if (!res.ok) throw new Error("Request failed");

//     const data = await res.json();

//     return data.results || [];
// };

const SPOTIFY_API = "https://api.spotify.com/v1";

let tokenCache = null;
let tokenExpiry = 0;
let tokenPromise = null;

// ===== CACHE =====
const cache = new Map();



// ===== TOKEN =====
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

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

const runWithRetry = async (fn, retries = 5) => {
    let delay = 2000;

    for (let i = 0; i < retries; i++) {
        const res = await fn();

        if (res.ok) return res;

        if (res.status === 429) {
            const retryAfter = Number(res.headers.get("Retry-After") || 0);

            const waitTime = Math.max(retryAfter * 1000, delay);

            console.log(`[Spotify] cooldown ${waitTime}ms`);

            await sleep(waitTime);

            delay *= 2; // 🔥 exponential backoff
            continue;
        }

        throw new Error(await res.text());
    }

    throw new Error("Spotify retry limit exceeded");
};

export const spotifyApiRequest = async (endpoint, params = {}) => {
    const key = endpoint + JSON.stringify(params);

    if (cache.has(key)) return cache.get(key);

    const token = await getToken();

    const url =
        `https://api.spotify.com/v1/${endpoint}?` +
        new URLSearchParams(params);

    const res = await runWithRetry(() =>
        fetch(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    );

    const data = await res.json();

    cache.set(key, data);
    setTimeout(() => cache.delete(key), 300000);

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
})

// const getInfoByName = async (endpoint, params = {}) => {
//     const query = new URLSearchParams({
//         api_key: API_KEY,
//         method: `${endpoint}.getInfo`,
//         format: "json",
//         ...params,
//     });

//     const url = `/lastfm/?${query.toString()}`;

//     const res = await fetch(url);

//     if (!res.ok) throw new Error("Request failed");

//     return await res.json();
// };

export const getTrackById = async (id) => {
    const cleanId = id.split("?")[0];
    const result = await spotifyApiRequest(`tracks/${cleanId}`, { market: "UA" });
    return result ? mapTrack(result) : null;
};

export const getArtistById = async (id) => {
    const result = await spotifyApiRequest(`artists/${id}`);
    console.log(result);
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

export const searchTracks = async (search) => {
    return await apiRequest("tracks", {
        search,
    });
};

export const searchArtists = async (search) => {
    return await apiRequest("artists", {
        search,
    });
};

export const searchAlbums = async (search) => {
    return await apiRequest("albums", {
        search,
    });
};

export const getPodcastById = (id) => {
    return podcasts.podcasts.find(
        podcast => podcast.id === Number(id)
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

export const getUserLikedTracks = async (userId) => {
    const user = getUserById(userId);

    if (!user) return [];

    const tracks = await Promise.all(
        user.mediaLibrary.likedTracks.map(trackId =>
            getTrackById(trackId)
        )
    );

    return tracks.filter(Boolean);
};

export const getUserLikedArtists = async (userId) => {
    const user = getUserById(userId);

    if (!user) return [];

    const artists = await Promise.all(
        user.mediaLibrary.likedArtists.map(artistId =>
            getArtistById(artistId)
        )
    );

    return artists.filter(Boolean);
};

export const getUserLikedAlbums = async (userId) => {
    const user = getUserById(userId);

    if (!user) return [];

    const albums = await Promise.all(
        user.mediaLibrary.likedAlbums.map(albumId =>
            getAlbumById(albumId)
        )
    );

    return albums.filter(Boolean);
};

export const getUserLikedPodcasts = (userId) => {
    const user = getUserById(userId);

    if (!user) return [];

    return user.mediaLibrary.likedPodcasts
        .map(podcastId => getPodcastById(podcastId))
        .filter(Boolean);
};

export const getUserLikedAudiobooks = (userId) => {
    const user = getUserById(userId);

    if (!user) return [];

    return user.mediaLibrary.likedAudiobooks
        .map(bookId => getAudiobookById(bookId))
        .filter(Boolean);
};