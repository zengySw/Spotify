import podcasts from "../data/podcasts.json";
import audiobooks from "../data/audiobooks.json";
import playlists from "../data/playlists.json";
import users from "../data/users.json";

const env = import.meta.env;

const USER_ID = env.VITE_USER_ID;
const MAX_TRACKS = env.VITE_MAX_TRACKS;
const API_KEY = env.VITE_API_KEY;

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
    const results = await apiRequest("tracks", {
        id,
    });

    const info = await getInfoByName("track", {
        artist: results[0]?.artist_name,
        track: results[0]?.name,
    });

    results.map(track => {
        track.title = track.name;
        track.artists = Array.isArray(track.artist_name) ? track.artist_name : [track.artist_name];
        track.icon = track.image;
        track.album = track.album_name;
        track.addDate = track.releasedate;
    });

    return results[0] || null;
};

export const getArtistById = async (id) => {
    const results = await apiRequest("artists", {
        id,
    });

    const info = await getInfoByName("artist", {
        artist: results[0]?.name,
    });

    results.map(artist => {
        artist.icon = artist.image;
        artist.followers = Number(info?.artist?.stats?.listeners) || 0;
    });

    return results[0] || null;
};

export const getAlbumById = async (id) => {
    const results = await apiRequest("albums", {
        id,
    });

    const info = await getInfoByName("album", {
        artist: results[0]?.artist_name,
        album: results[0]?.name,
    });

    results.map(album => {
        album.title = album.name;
        album.artists = Array.isArray(album.artist_name) ? album.artist_name : [album.artist_name];
        album.icon = album.image;
        album.groupTracks = Number(info?.album?.tracks?.track?.length) || 0;
    });

    return results[0] || null;
};

export const getTracks = async () => {
    return await apiRequest("tracks");
};

export const getArtists = async () => {
    return await apiRequest("artists");
};

export const getAlbums = async () => {
    return await apiRequest("albums");
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
    const results = await apiRequest("playlists", {
        id,
    });

    if (!results[0]) return null;

    const tracks = await apiRequest("playlists/tracks", {
        id,
    });

    const user = await getUserById(results[0].user_id);

    results.map(playlist => {
        playlist.icon = playlist.image;
        playlist.tracks = tracks[0].tracks.map(track => track.id);
        playlist.author = user ? { name: user.username, icon: user.avatar } : { name: "Unknown", icon: "" };
    });

    console.log(results[0]);

    return results[0];
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