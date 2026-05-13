import "./Main.css";
import { OnePList, RowList } from "../components/Lists";
import { MusicCard, GenreCard, ArtistCard, PodcastCard, AudioBookCard } from "../components/Cards";
import { getTrackById, getAlbumById, getArtistById, getPodcastById, getAudiobookById } from "../hooks/dataHooks";

import data from "../data/main.json";

export default function Main() {
    return (
        <div className="main-page">
            <OnePList
                title={<h4>Саундтреки на основі твого <span style={{ color: '#40a2ff' }}>настрою</span></h4>}
                childs={
                    data.mainPage.moodGenres.map((genre, index) => (
                        <GenreCard
                            title={genre.title}
                            icon={genre.icon}
                            key={index}
                            link={`/genre/${genre.id}`}
                        />
                    ))
                }
            />

            <RowList
                title={<h4>Топ ВАША <span style={{ color: '#40a2ff' }}>музика</span> сьогодні!</h4>}
                prevCount={5}
                childs={
                    data.mainPage.topMusicToday.tracks.map((trackId, index) => {
                        const track = getTrackById(trackId)

                        if (!track) return null

                        return (
                            <MusicCard
                                key={index}
                                {...track}
                            />
                        )
                    })
                }
                continueLink={data.mainPage.topMusicToday.continueLink}
            />

            <RowList
                title={<h4>Нові <span style={{ color: '#40a2ff' }}>музичні</span> релізи</h4>}
                prevCount={5}
                childs={
                    data.mainPage.newMusicReleases.albums.map((albumId, index) => {
                        const album = getAlbumById(albumId)

                        if (!album) return null

                        return (
                            <MusicCard
                                key={index}
                                {...album}
                            />
                        )
                    })
                }
                continueLink={data.mainPage.newMusicReleases.continueLink}
            />

            <RowList
                title={<h4>Твої улюблені <span style={{ color: '#40a2ff' }}>виконавці</span></h4>}
                prevCount={4}
                childs={
                    data.mainPage.topArtists.artists.map((artistId, index) => {
                        const artist = getArtistById(artistId)

                        if (!artist) return null

                        return (
                            <ArtistCard
                                key={index}
                                icon={artist.avatar}
                                {...artist}
                            />
                        )
                    })
                }
            />

            <OnePList
                title={<h4>Нові релізи <span style={{ color: '#40a2ff' }}>подкастів</span></h4>}
                childs={
                    data.mainPage.newPodcasts.podcasts.map((podcastId, index) => {
                        const podcast = getPodcastById(podcastId)

                        if (!podcast) return null

                        return (
                            <PodcastCard
                                key={index}
                                {...podcast}
                            />
                        )
                    })
                }
            />

            <OnePList
                title={<h4>Нові релізи <span style={{ color: '#40a2ff' }}>Аудиокниг</span></h4>}
                childs={
                    data.mainPage.newAudiobooks.audiobooks.map((bookId, index) => {
                        const book = getAudiobookById(bookId)

                        if (!book) return null

                        return (
                            <AudioBookCard
                                key={index}
                                {...book}
                            />
                        )
                    })
                }
                flexDirection="column"
            />
        </div>
    );
}
