import "./PlaylistP.css";
import { MusicSCard } from "../../../components/Cards";
import { useState, useEffect, useRef } from "react";
import { getPlaylistById } from "../../../hooks/dataHooks";
import { useParams } from "react-router-dom";

export default function PlaylistP() {
    const { id } = useParams();

    const [playlist, setPlaylist] = useState(null);

    const [sortBy, setSortBy] = useState("date");

    const sortOptions = [
        { value: "date", label: "Дата додавання" },
        { value: "name", label: "Назва" },
        { value: "artist", label: "Артист" },
        { value: "album", label: "Альбом" },
    ];

    const loadedRef = useRef(null);

    useEffect(() => {
        if (!id) return;

        if (loadedRef.current === id) return;

        loadedRef.current = id;

        let ignore = false;

        getPlaylistById(id)
            .then(data => {
                if (!ignore) setPlaylist(data);
            })
            .catch(console.error);

        return () => {
            ignore = true;
        };

    }, [id]);

    if (!playlist) return <div>Loading...</div>;

    return (
        <div className="playlist">
            <div className="playlist-header" style={{ backgroundImage: `url(${playlist.icon})` }}>
                <p>Плейлист</p>
                <h3>{playlist.title}</h3>
                <div className="author">
                    <img src={playlist.author.icon} alt={playlist.author.name} />
                    <span>{playlist.author.name}</span>
                    <br />
                    <span>{playlist?.tracks?.length ?? 0} треків</span>
                </div>
            </div>
            <div className="controls">
                <button onClick={() => { }}><img src="/playB.svg" alt="Play" /></button>
                <button onClick={() => { }}><img src="/rand.svg" alt="Random" /></button>
                <button onClick={() => { }}><img src="/download.svg" alt="Download" /></button>
                <div className="frame">
                    <button onClick={() => { }}><img src="/search.svg" alt="Search" /></button>
                    <button onClick={() => { }}>{sortOptions.find((option) => option.value === sortBy)?.label || "Сортувати за" + ' '}<img src="/menuList.svg" alt="Sort by" /></button>
                </div>
            </div>
            <div className="playlist-tracks">
                <div className="playlist-tracks-header">
                    <span>Альбом</span>
                    <span>Дата додавання</span>
                    <span>Час</span>
                </div>
                <div className="playlist-tracks-list">
                    {(playlist?.tracks || []).map((track, index) => (
                        <MusicSCard
                            key={track.id}
                            num={index + 1}
                            {...track}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}