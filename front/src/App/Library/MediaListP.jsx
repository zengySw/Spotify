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
    getLikedTracks,
    getMyPlaylists,
    getMyAlbums,
    getMyArtists,
    getMyPodcasts
} from '../../hooks/dataHooks';

import useMusicPlayer from "../../hooks/useMusicPlayer";

export default function MediaListP({ title, userId }) {

    const [userTracks, setUserTracks] = useState([]);
    const [userPlaylists, setUserPlaylists] = useState([]);
    const [userAlbums, setUserAlbums] = useState([]);
    const [userArtists, setUserArtists] = useState([]);
    const [userPodcasts, setUserPodcasts] = useState([]);

    const didRun = useRef(false);

    const player = useMusicPlayer();

    useEffect(() => {
        if (didRun.current) return;
        didRun.current = true;

        getLikedTracks(16).then(tracks => setUserTracks(tracks));

        getMyPlaylists(16).then(playlists => setUserPlaylists(playlists));

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
                                            track={track}
                                            onClick={() => player.play_track(track)}
                                            currentlyPlaying={player.current_track}
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

                {

}

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

                {

}

            </div>
        </div>
    );
}
