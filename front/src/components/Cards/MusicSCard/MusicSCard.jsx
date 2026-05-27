import '../PlayingVisualisator.css';
import './MusicSCard.css';
import { useEffect, useState } from 'react';

export default function MusicSCard({ id, num, icon, title, album, duration, artists = [], listenCount = null, onClick = (id, playingState) => { }, onDoubleClick = (id, playingState) => { }, isPlaying = false, addDate = null }) {
    const [playingState, setPlayingState] = useState(isPlaying);

    useEffect(() => {
        setPlayingState(isPlaying);
    }, [isPlaying]);

    const handleClick = () => {
        onClick(id, playingState);
    };

    const handleDoubleClick = () => {
        onDoubleClick(id, playingState);
    };

    return (
        <button className="music-s-card" onClick={handleClick} onDoubleClick={handleDoubleClick}>
            {num && num != null ? playingState ? <span className="playing-visualisator"><div className="rectangle" />
                <div className="rectangle-one" />
                <div className="rectangle-two" />
                <div className="rectangle-three" /></span> : <span className="num">{num}</span> : null}
            <div className="card">
                <div className="image-container">
                    {num && num != null ? null : playingState ? <span className="playing-visualisator"><div className="rectangle" />
                        <div className="rectangle-one" />
                        <div className="rectangle-two" />
                        <div className="rectangle-three" /></span> : null}
                    <img src={icon} alt={title} />
                </div>
                <div className="frame">
                    <div className="naming">
                        <span className="title">{title}</span>
                        <span className="artists">
                            {artists.map((artist, index) => (
                                artist + (index < artists.length - 1 ? ', ' : '')
                            ))}
                        </span>
                    </div>
                    <div className="about">
                        <span className="album">{album}</span>
                        {addDate ? <span className="add-date">{addDate}</span> : <span className="listen-count">{listenCount}</span>}
                        <span className="duration">{Math.floor(duration / 60000)}:{String(Math.floor((duration % 60000) / 1000)).padStart(2, '0')}</span>
                    </div>
                </div>
            </div>
        </button>
    )
}
