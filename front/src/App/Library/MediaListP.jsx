import './MediaListP.css';

import { useEffect, useRef, useState } from 'react';

import {
    MusicCard,
    ArtistCard,
    PodcastCard
} from '../../components/Cards';

import { RowList } from '../../components/Lists';

import {
    getLikedTracks,
    getMyPlaylists,
    getMyArtists,
    getMyPodcasts
} from '../../hooks/dataHooks';

export default function MediaListP({ title = 'Моя медіатека' }) {
    const [userTracks, setUserTracks] = useState([]);
    const [userPlaylists, setUserPlaylists] = useState([]);
    const [userArtists, setUserArtists] = useState([]);
    const [userPodcasts, setUserPodcasts] = useState([]);

    const didRun = useRef(false);

    useEffect(() => {
        if (didRun.current) return;
        didRun.current = true;

        getLikedTracks(16).then(setUserTracks).catch(console.error);
        getMyPlaylists(16).then(setUserPlaylists).catch(console.error);
        getMyArtists(16).then(setUserArtists).catch(console.error);
        getMyPodcasts(16).then(setUserPodcasts).catch(console.error);
    }, []);

    return (
        <div className="media-list-p">
            <h2>{title}</h2>

            <div className="media-lists">
                {userTracks.length > 0 ? (
                    <RowList
                        title={<h4>Улюблені треки</h4>}
                        childs={userTracks.map((track) => (
                            <MusicCard key={track.id} {...track} />
                        ))}
                        prevCount={Math.min(userTracks.length, 7)}
                        continueLink="/liked-music"
                    />
                ) : null}

                {userPlaylists.length > 0 ? (
                    <RowList
                        title={<h4>Плейлисти</h4>}
                        childs={userPlaylists.map((playlist) => (
                            <MusicCard key={playlist.id} {...playlist} />
                        ))}
                        prevCount={Math.min(userPlaylists.length, 7)}
                        continueLink="/liked-albums"
                    />
                ) : null}

                {userArtists.length > 0 ? (
                    <RowList
                        title={
                            <h4>
                                Твої улюблені{' '}
                                <span style={{ color: '#40a2ff' }}>
                                    виконавці
                                </span>
                            </h4>
                        }
                        childs={userArtists.map((artist) => (
                            <ArtistCard key={artist.id} {...artist} />
                        ))}
                        prevCount={Math.min(userArtists.length, 5)}
                        continueLink="/liked-artists"
                    />
                ) : null}

                {userPodcasts.length > 0 ? (
                    <RowList
                        title={
                            <h4>
                                <span style={{ color: '#40a2ff' }}>
                                    Подкасти
                                </span>{' '}
                                які тобі сподобались
                            </h4>
                        }
                        childs={userPodcasts.map((podcast) => (
                            <PodcastCard
                                key={podcast.id}
                                episodeName={podcast.episodes?.[0]?.title}
                                date={podcast.episodes?.[0]?.date}
                                duration={podcast.episodes?.[0]?.duration}
                                {...podcast}
                            />
                        ))}
                        prevCount={Math.min(userPodcasts.length, 4)}
                    />
                ) : null}
            </div>
        </div>
    );
}
