import "./Main.css";
import { OnePList, RowList } from "../components/Lists";
import { MusicCard, GenreCard, ArtistCard, PodcastCard, AudioBookCard } from "../components/Cards";
import { getRecommendations, getMyAlbums, getMyArtists, getMyPodcasts, getAudiobookById } from "../hooks/dataHooks";
import { useState, useEffect } from "react";

import data from "../data/main.json";

import useMusicPlayer from "../hooks/useMusicPlayer";

export default function Main() {
    const [selected, setSelected] = useState("Всі");
    const player = useMusicPlayer();

    const [topTracks, setTopTracks] = useState([]);
    const [newAlbums, setNewAlbums] = useState([]);
    const [topArtists, setTopArtists] = useState([]);
    const [newPodcasts, setNewPodcasts] = useState([]);

    useEffect(() => {
        getRecommendations("3f2LmvIeHgvY8UKJPUbhR9", data.mainPage.topMusicToday.max, data.mainPage.topMusicToday.offset)
            .then(results => setTopTracks(results));

        getMyAlbums(8)
            .then(results => setNewAlbums(results));

        getMyArtists(8)
            .then(results => setTopArtists(results));

        getMyPodcasts(3)
            .then(results => setNewPodcasts(results));

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
                    childs={topTracks?.map((track, index) => (
                        <MusicCard
                            key={index}
                            track={track}
                            onClick={() => player.play_track(track)}
                            currentlyPlaying={player.current_track}
                        />
                    ))}
                    continueLink={data.mainPage.topMusicToday.continueLink}
                />
                <RowList
                    title={<h4>Нові <span style={{ color: '#40a2ff' }}>музичні</span> релізи</h4>}
                    prevCount={5}
                    childs={newAlbums?.map((album, index) => (
                        <MusicCard
                            key={index}
                            {...album}
                            groupTracks={album.groupTracks}
                        />
                    ))}
                    continueLink={data.mainPage.newMusicReleases.continueLink}
                />
                <RowList
                    title={<h4>Твої улюблені <span style={{ color: '#40a2ff' }}>виконавці</span></h4>}
                    prevCount={4}
                    childs={topArtists?.map((artist, index) => (
                        <ArtistCard
                            key={index}
                            {...artist}
                        />
                    ))}
                />
            </>}

            {(selected === "Всі" || selected === "Інше") && <>
                <OnePList
                    title={<h4>Нові релізи <span style={{ color: '#40a2ff' }}>подкастів</span></h4>}
                    childs={
                        newPodcasts.map((podcast, index) => {

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
