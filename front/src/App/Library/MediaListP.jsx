import './MediaListP.css';

import { useState, useEffect, useRef } from 'react'

import {
    MusicCard,
    ArtistCard,
    PodcastCard,
    AudioBookCard
} from '../../components/Cards';

import { RowList } from '../../components/Lists';

import {
    // getTrackById,
    // getArtistById,
    // getPodcastById,
    // getAudiobookById,
    // getAlbumById,
    // getUserById
    getLikedTracks,
    getMyPlaylists,
    getMyAlbums,
    getMyArtists,
    getMyPodcasts
} from '../../hooks/dataHooks';

export default function MediaListP({ title, userId }) {

    const [userTracks, setUserTracks] = useState([]);
    const [userPlaylists, setUserPlaylists] = useState([]);
    const [userAlbums, setUserAlbums] = useState([]);
    const [userArtists, setUserArtists] = useState([]);
    const [userPodcasts, setUserPodcasts] = useState([]);

    const didRun = useRef(false);

    useEffect(() => {
        if (didRun.current) return;
        didRun.current = true;

        getLikedTracks(16).then(tracks => setUserTracks(tracks));

        getMyPlaylists(16).then(playlists => setUserPlaylists(playlists));

        // getMyAlbums(16).then(albums => setUserAlbums(albums));

        getMyArtists(16).then(artists => setUserArtists(artists));

        getMyPodcasts(16).then(podcasts => setUserPodcasts(podcasts))
    }, []);

    return (
        <div className="media-list-p">
            <h2>{title}</h2>

            <div className="media-lists">

                {
                    userTracks.length > 0 ? (
                        <RowList
                            title={<h4>Улюблені треки</h4>}
                            childs={
                                userTracks.map((track, index) => {

                                    return (
                                        <MusicCard
                                            key={index}
                                            {...track}
                                        />
                                    );
                                })
                            }
                            prevCount={
                                userTracks.length > 7
                                    ? 7
                                    : userTracks.length
                            }
                            continueLink="/media/playlist/7f8GHAXGwZLefZ0Zq0cHgx"
                        />
                    ) : null
                }

                {
                    userPlaylists.length ? (
                        <RowList
                            title={<h4>Плейлисти</h4>}
                            childs={
                                userPlaylists.map((playlist, index) => {

                                    return (
                                        <MusicCard
                                            key={index}
                                            artists={playlist.author.name.split(", ").map(s => s.trim())}
                                            groupTracks={playlist.items.total}
                                            {...playlist}
                                        />
                                    );
                                })
                            }
                            prevCount={
                                userPlaylists.length > 7
                                    ? 7
                                    : userPlaylists.length
                            }
                            continueLink="/"
                        />
                    ) : null
                }

                {
                    userArtists.length > 0 ? (
                        <RowList
                            title={
                                <h4>
                                    Твої улюблені{' '}
                                    <span style={{ color: '#40a2ff' }}>
                                        виконавці
                                    </span>
                                </h4>
                            }
                            childs={
                                userArtists.map((artist, index) => {

                                    return (
                                        <ArtistCard
                                            key={index}
                                            icon={artist.avatar}
                                            {...artist}
                                        />
                                    );
                                })
                            }
                            prevCount={
                                userArtists.length > 5
                                    ? 5
                                    : userArtists.length
                            }
                            continueLink="/liked-artists"
                        />
                    ) : null
                }

                {/* {
                    media?.likedMixes?.length > 0 ? (
                        <RowList
                            title={
                                <h4>
                                    Твої найкращі{' '}
                                    <span style={{ color: '#40a2ff' }}>
                                        мікси
                                    </span>
                                </h4>
                            }
                            childs={
                                media.likedMixes.map((item, index) => {
                                    const mix = getAlbumById(item);

                                    if (!mix) return null;

                                    return (
                                        <MusicCard
                                            key={index}
                                            groupTracks={mix.tracksCount}
                                            {...mix}
                                        />
                                    );
                                })
                            }
                            prevCount={
                                media.likedMixes.length > 7
                                    ? 7
                                    : media.likedMixes.length
                            }
                            continueLink="/liked-mixes"
                        />
                    ) : null
                } */}

                {
                    userPodcasts.length > 0 ? (
                        <RowList
                            title={
                                <h4>
                                    <span style={{ color: '#40a2ff' }}>
                                        Подкасти
                                    </span>{' '}
                                    які тобі сподобались
                                </h4>
                            }
                            childs={
                                userPodcasts.map((podcast, index) => {

                                    return (
                                        <PodcastCard
                                            key={index}
                                            episodeName={podcast.episodes[0]?.title}
                                            date={podcast.episodes[0]?.date}
                                            duration={podcast.episodes[0]?.duration}
                                            {...podcast}
                                        />
                                    );
                                })
                            }
                            prevCount={
                                userPodcasts.length > 4
                                    ? 4
                                    : userPodcasts.length
                            }
                        />
                    ) : null
                }

                {/* {
                    media?.likedAudiobooks?.length > 0 ? (
                        <RowList
                            title={
                                <h4>
                                    <span style={{ color: '#40a2ff' }}>
                                        Аудіокниги
                                    </span>{' '}
                                    які тобі сподобались
                                </h4>
                            }
                            childs={
                                media.likedAudiobooks.map((item, index) => {
                                    const book = getAudiobookById(item);

                                    if (!book) return null;

                                    return (
                                        <AudioBookCard
                                            key={book.id}
                                            {...book}
                                        />
                                    );
                                })
                            }
                            prevCount={
                                media.likedAudiobooks.length > 7
                                    ? 7
                                    : media.likedAudiobooks.length
                            }
                            flexDirection="column"
                        />
                    ) : null
                } */}

            </div>
        </div>
    );
}