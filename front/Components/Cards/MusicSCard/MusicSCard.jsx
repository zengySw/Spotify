import '../PlayingVisualisator.css';
import './MusicSCard.css';
import { useEffect, useState } from 'react';

export default function MusicSCard({ id, num, icon, title, artists, alboum, listenCount, duration, onClick = (id, playingState) => { }, onDoubleClick = (id, playingState) => { }, isPlaying = false, addDate = null }) {
    const { playingState, setPlayingState } = useState(isPlaying);

    useEffect(() => {
        setPlayingState(isPlaying);
    }, [isPlaying]);

    return (
        <button className="music-s-card" onClick={onClick(id, playingState)} onDoubleClick={onDoubleClick(id, playingState)}>
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
                            {artists.join(', ')}
                        </span>
                    </div>
                    <div className="about">
                        <span className="alboum">{alboum}</span>
                        <div className="frame">
                            {addDate ? <span className="add-date">{addDate}</span> : <span className="listen-count">{listenCount}</span>}
                            <span className="duration">{duration}</span>
                        </div>
                    </div>
                </div>
            </div>
        </button>
    )
}