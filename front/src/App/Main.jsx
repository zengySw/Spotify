import "./Main.css";
import { OnePList, RowList } from "../components/Lists";
import { MusicCard, GenreCard, ArtistCard, PodcastCard, AudioBookCard } from "../components/Cards";
import { getRecommendations, getAlbumsByIds, getArtistsByIds, getMyAlbums, getMyArtists, getPodcastById, getAudiobookById } from "../hooks/dataHooks";
import { useState, useEffect } from "react";

import data from "../data/main.json";

import useMusicPlayer from "../hooks/useMusicPlayer.js";

export default function Main() {
    const [selected, setSelected] = useState("Всі");
    const player = useMusicPlayer();

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
        <div className="main-page">
            <div style={{ display: "flex", gap: 10, padding: "12px 18px 10px" }}>
                {["Всі", "Треки", "Інше"].map((label) => (
                    <button
                        key={label}
                        type="button"
                        style={{
                            minWidth: 68,
                            height: 28,
                            borderRadius: 6,
                            border: "1px solid rgba(132, 184, 220, 0.45)",
                            background: selected === label ? "rgba(33, 56, 77, 0.55)" : "rgba(33, 56, 77, 0.25)",
                            color: "#d8ebfb",
                            fontSize: 12,
                            fontWeight: 700,
                            cursor: "pointer",
                        }}
                        onClick={() => setSelected(label)}
                    >
                        {label}
                    </button>
                ))}
            </div>

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
        </div>
    );
}