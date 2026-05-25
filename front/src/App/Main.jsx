import "./Main.css";
import { OnePList, RowList } from "../components/Lists";
import { MusicCard, GenreCard, ArtistCard, PodcastCard, AudioBookCard } from "../components/Cards";
import { getRecommendations, getMyAlbums, getMyArtists, getPodcastById, getAudiobookById } from "../hooks/dataHooks";
import { useState, useEffect } from "react";

import data from "../data/main.json";
import { Banner } from "../components/Banner/Banner.jsx";

const noopPlayer = {
    currentTrack: null,
    playTrack: () => { },
};

export default function Main({ player: externalPlayer = null }) {
    const [selected, setSelected] = useState("Всі");
    const player = externalPlayer || noopPlayer;

    const [topTracks, setTopTracks] = useState([]);
    const [newAlbums, setNewAlbums] = useState([]);
    const [topArtists, setTopArtists] = useState([]);

    useEffect(() => {
        getRecommendations(8, { tracks: ["2Nti2yhOJ8iEgFAfcXPhBU"] })
            .then(results => setTopTracks(results));

        getMyAlbums(8)
            .then(results => setNewAlbums(results));

        getMyArtists(8)
            .then(results => setTopArtists(results));
    }, []);

    return (
        <main className="main-page">
            <Banner 
            Pics={[
                "https://placehold.co/748x374",
                "https://placehold.co/748x374",
                "https://placehold.co/748x374"
            ]}
            />
            <nav className="filter-tabs" aria-label="Фільтрація контенту">
                
                {["Всі", "Треки", "Інше"].map((label) => (
                    <button
                        key={label}
                        type="button"
                        className={`filter-btn ${selected === label ? "active" : ""}`}
                        onClick={() => setSelected(label)}
                    >
                        {label}
                    </button>
                ))}
            </nav>

            {(selected === "Всі" || selected === "Треки") && <>
                <OnePList
                    title={<h4>Саундтреки на основі твого <span style={{ color: '#40a2ff' }}>настрою</span></h4>}
                    childs={data.mainPage.moodGenres
                        .slice(0, selected === "Треки" ? 7 : 5)
                        .map((genre, index) => (
                            <GenreCard
                                key={index}
                                title={genre.title}
                                icon={genre.icon}
                                link={genre.link}
                            />
                        ))}
                />
                <RowList
                    title={<h4>Топ ВАША <span style={{ color: '#40a2ff' }}>музика</span> сьогодні!</h4>}
                    prevCount={5}
                    childs={topTracks.map((track) => (
                        <MusicCard
                            key={track.id}
                            {...track}
                            onClick={(id) => player.playTrack(id)}
                            currentlyPlaying={player.currentTrack?.id}
                        />
                    ))}
                    continueLink={data.mainPage.topMusicToday.continueLink}
                />
                <RowList
                    title={<h4>Нові <span style={{ color: '#40a2ff' }}>музичні</span> релізи</h4>}
                    prevCount={5}
                    childs={newAlbums.map((album) => (
                        <MusicCard
                            key={album.id}
                            {...album}
                        />
                    ))}
                    continueLink={data.mainPage.newMusicReleases.continueLink}
                />
                <RowList
                    title={<h4>Твої улюблені <span style={{ color: '#40a2ff' }}>виконавці</span></h4>}
                    prevCount={4}
                    childs={topArtists.map((artist) => (
                        <ArtistCard
                            key={artist.id}
                            {...artist}
                        />
                    ))}
                />
            </>}

            {(selected === "Всі" || selected === "Інше") && <>
                <OnePList
                    title={<h4>Нові релізи <span style={{ color: '#40a2ff' }}>подкастів</span></h4>}
                    childs={data.mainPage.newPodcasts.podcasts
                        .map(id => getPodcastById(id))
                        .filter(Boolean)
                        .map((podcast) => (
                            <PodcastCard key={podcast.id} {...podcast} />
                        ))}
                />
                <OnePList
                    title={<h4>Нові релізи <span style={{ color: '#40a2ff' }}>Аудиокниг</span></h4>}
                    childs={data.mainPage.newAudiobooks.audiobooks
                        .map(id => getAudiobookById(id))
                        .filter(Boolean)
                        .map((book) => (
                            <AudioBookCard key={book.id} {...book} />
                        ))}
                    flexDirection="column"
                />
            </>}
        </main>
    );
}
