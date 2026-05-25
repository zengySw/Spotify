import podcasts from "../data/podcasts.json";
import audiobooks from "../data/audiobooks.json";
import playlists from "../data/playlists.json";
import users from "../data/users.json";

const env = import.meta.env;

const USER_ID = env.VITE_USER_ID;
const MAX_TRACKS = env.VITE_MAX_TRACKS;
const API_KEY = env.VITE_API_KEY;

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const apiRequest = async (endpoint, params = {}) => {
    const query = new URLSearchParams({
        client_id: USER_ID,
        format: "json",
        limit: MAX_TRACKS,
        ...params,
    });

    const url = `/jamendo/${endpoint}/?${query.toString()}`;

    const res = await fetch(url);

    if (!res.ok) throw new Error("Request failed");

    const data = await res.json();

    return data.results || [];
};

let cachedToken = null;
let tokenExpiry = 0;

const getToken = async () => {
    if (cachedToken && Date.now() < tokenExpiry) return cachedToken;
    const res = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Basic " + btoa(`${import.meta.env.VITE_SPOTIFY_CLIENT_ID}:${import.meta.env.VITE_SPOTIFY_CLIENT_SECRET}`)
        },
        body: new URLSearchParams({
            grant_type: "refresh_token",
            refresh_token: import.meta.env.VITE_SPOTIFY_REFRESH_TOKEN
        })
    });
    const data = await res.json();
    cachedToken = data.access_token;
    tokenExpiry = Date.now() + (data.expires_in - 60) * 1000;
    return cachedToken;
};

const spotifyApiRequest = async (endpoint, params = {}) => {
    const query = new URLSearchParams(params);
    const url = `/spotify/${endpoint}?${query.toString()}`;

    const res = await fetch(url, {
        headers: {
            Authorization: `Bearer ${await getToken()}`,
        },
    });

    if (!res.ok) {
        const text = await res.text();
        console.error("Spotify error:", res.status, text);
        throw new Error(text);
    }

    return await res.json();
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

const getInfoByName = async (endpoint, params = {}) => {
    const query = new URLSearchParams({
        api_key: API_KEY,
        method: `${endpoint}.getInfo`,
        format: "json",
        ...params,
    });

    const url = `/lastfm/?${query.toString()}`;

    const res = await fetch(url);

    if (!res.ok) throw new Error("Request failed");

    return await res.json();
};

export const getTrackById = async (id) => {
    const cleanId = id.split("?")[0];
    const result = await spotifyApiRequest(`tracks/${cleanId}`, { market: "UA" });
    return result ? mapTrack(result) : null;
};

export const getArtistById = async (id) => {
    const result = await spotifyApiRequest(`artists/${id.split("?")[0]}`);
    return result ? mapArtist(result) : null;
};

export const getAlbumById = async (id) => {
    const result = await spotifyApiRequest(`albums/${id.split("?")[0]}`, { market: "UA" });
    return result ? mapAlbum(result) : null;
};

export const getRecommendations = async (max = 100, { genres = [] } = {}) => {
    const playlist = await getPlaylistById("3f2LmvIeHgvY8UKJPUbhR9", { limit: max });
    return playlist?.tracks || [];
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

    console.log(result)

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

export const getPlaylistById = async (id, { limit = 100 } = {}) => {
    const playlist = await spotifyApiRequest(`playlists/${id}`);
    if (!playlist) return null;

    const tracksItems = playlist.tracks?.items || [];

    return {
        id: playlist.id,
        name: playlist.name,
        icon: playlist.images?.[0]?.url || "",

        author: {
            name: playlist.owner?.display_name || "Unknown",
            icon: playlist.owner?.images?.[0]?.url || "/default-avatar.jpg",
        },

        tracks: tracksItems
            .filter(item => item?.track)
            .map(item => ({
                id: item.track.id,
                title: item.track.name,
                icon: item.track.album?.images?.[0]?.url || "",
                album: item.track.album?.name || "",
                duration: item.track.duration_ms,
                artists: (item.track.artists || []).map(a => a.name),
                addDate: item.added_at ? String(new Date(item.added_at).toLocaleDateString("eu-EU")) : null
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