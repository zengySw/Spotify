import tracks from "../data/tracks.json";
import artists from "../data/artists.json";
import albums from "../data/albums.json";
import podcasts from "../data/podcasts.json";
import audiobooks from "../data/audiobooks.json";
import playlists from "../data/playlists.json";
import users from "../data/users.json";

export const getTrackById = (id) => {
    return tracks.tracks.find(track => track.id === Number(id));
};

export const getArtistById = (id) => {
    return artists.artists.find(artist => artist.id === Number(id));
};

export const getAlbumById = (id) => {
    return albums.albums.find(album => album.id === Number(id));
};

export const getPodcastById = (id) => {
    return podcasts.podcasts.find(podcast => podcast.id === Number(id));
};

export const getAudiobookById = (id) => {
    return audiobooks.audiobooks.find(book => book.id === Number(id));
};

export const getPlaylistById = (id) => {
    return playlists.playlists.find(playlist => playlist.id === Number(id));
};

export const getUserById = (id) => {
    return users.users.find(user => user.id === Number(id));
};

export const getPlaylistTracks = (playlistId) => {
    const playlist = getPlaylistById(playlistId);

    if (!playlist) return [];

    return playlist.tracks
        .map(trackId => getTrackById(trackId))
        .filter(Boolean);
};

export const getUserLikedTracks = (userId) => {
    const user = getUserById(userId);

    if (!user) return [];

    return user.mediaLibrary.likedTracks
        .map(trackId => getTrackById(trackId))
        .filter(Boolean);
};

export const getUserLikedArtists = (userId) => {
    const user = getUserById(userId);

    if (!user) return [];

    return user.mediaLibrary.likedArtists
        .map(artistId => getArtistById(artistId))
        .filter(Boolean);
};

export const getUserLikedAlbums = (userId) => {
    const user = getUserById(userId);

    if (!user) return [];

    return user.mediaLibrary.likedAlbums
        .map(albumId => getAlbumById(albumId))
        .filter(Boolean);
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