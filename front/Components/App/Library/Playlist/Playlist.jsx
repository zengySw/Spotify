import "./Playlist.css";
import { MusicSCard } from "../../../Cards";

export default function Playlist({ name, icon, author, tracks = [] }) {
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
                <button onClick={() => { }}>Play</button>
                <button onClick={() => { }}>Random</button>
                <button onClick={() => { }}>Download</button>
            </div>
            <div className="playlist-tracks">
                <div className="playlist-tracks-header">
                    <span>Альбом</span>
                    <span>Дата додавання</span>
                    <span>час</span>
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