import './MediaListP.css';

import {
    MusicCard,
    ArtistCard,
    PodcastCard,
    AudioBookCard
} from '../../components/Cards';

import { RowList } from '../../components/Lists';

import {
    getTrackById,
    getArtistById,
    getPodcastById,
    getAudiobookById,
    getAlbumById,
    getUserById
} from '../../hooks/dataHooks';

export default function MediaListP({ title, userId }) {

    const media = getUserById(userId)?.mediaLibrary;

    return (
        <div className="media-list-p">
            <h2>{title}</h2>

            <div className="media-lists">

                {
                    media?.likedTracks?.length > 0 ? (
                        <RowList
                            title={<h4>Улюблені треки</h4>}
                            childs={
                                media.likedTracks.map((item, index) => {
                                    const track = getTrackById(item);

                                    if (!track) return null;

                                    return (
                                        <MusicCard
                                            key={index}
                                            {...track}
                                        />
                                    );
                                })
                            }
                            prevCount={
                                media.likedTracks.length > 7
                                    ? 7
                                    : media.likedTracks.length
                            }
                            continueLink="/liked-music"
                        />
                    ) : null
                }

                {
                    media?.likedAlbums?.length > 0 ? (
                        <RowList
                            title={<h4>Плейлисти</h4>}
                            childs={
                                media.likedAlbums.map((item, index) => {
                                    const album = getAlbumById(item);

                                    if (!album) return null;

                                    return (
                                        <MusicCard
                                            key={index}
                                            {...album}
                                        />
                                    );
                                })
                            }
                            prevCount={
                                media.likedAlbums.length > 7
                                    ? 7
                                    : media.likedAlbums.length
                            }
                            continueLink="/liked-albums"
                        />
                    ) : null
                }

                {
                    media?.likedArtists?.length > 0 ? (
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
                                media.likedArtists.map((item, index) => {
                                    const artist = getArtistById(item);

                                    if (!artist) return null;

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
                                media.likedArtists.length > 5
                                    ? 5
                                    : media.likedArtists.length
                            }
                            continueLink="/liked-artists"
                        />
                    ) : null
                }

                {
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
                }

                {
                    media?.likedPodcasts?.length > 0 ? (
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
                                media.likedPodcasts.map((item, index) => {
                                    const podcast = getPodcastById(item);

                                    if (!podcast) return null;

                                    return (
                                        <PodcastCard
                                            key={index}
                                            {...podcast}
                                        />
                                    );
                                })
                            }
                            prevCount={
                                media.likedPodcasts.length > 4
                                    ? 4
                                    : media.likedPodcasts.length
                            }
                        />
                    ) : null
                }

                {
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
                }

            </div>
        </div>
    );
}