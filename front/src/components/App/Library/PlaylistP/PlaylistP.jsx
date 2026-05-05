import "./PlaylistP.css";
import { MusicSCard } from "../../../Cards";
import { useState } from "react";

export default function PlaylistP({ name, icon, author, tracks = [] }) {
    const [sortBy, setSortBy] = useState("date");
    const sortOptions = [
        { value: "date", label: "Дата додавання" },
        { value: "name", label: "Назва" },
        { value: "artist", label: "Артист" },
        { value: "album", label: "Альбом" },
    ];

    return (
        <div className="playlist" style={{ width: "1230px" }}>
            <div className="playlist-header" style={{ backgroundImage: `url(${icon})` }}>
                <p>Плейлист</p>
                <h3>{name}</h3>
                <div className="author">
                    <img src={author.icon} alt={author.name} />
                    <span>{author.name}</span>
                    <br />
                    <span>{tracks.length} треків</span>
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
                    {tracks.map((track, index) => (
                        <MusicSCard key={index} {...track} />
                    ))}
                </div>
            </div>
        </div>
    );
}