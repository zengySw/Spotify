import '../PlayingVisualisator.css';
import './PodcastCard.css';
import { useState, useEffect } from 'react';

export default function PodcastCard({ id, icon, title, episode_name, date, duration, description, onClick = (id, playingState) => { }, onDoubleClick = (id, playingState) => { }, isPlaying = false }) {
    const [playingState, setPlayingState] = useState(isPlaying);

    useEffect(() => {
        setPlayingState(isPlaying);
    }, [isPlaying]);

    return (
        <button className="podcast-card" onClick={onClick(id, playingState)} onDoubleClick={onDoubleClick(id, playingState)}>
            <div className="card-header">
                <span className="title">
                    {title}
                </span>
                <div className="episode-container">
                    <span className="episode">Епізод • </span>
                    <span className="episode_name">
                        {episode_name}
                    </span>
                </div>
            </div>
            <div className="image-container">
                {playingState ? <span className="playing-visualisator"><div className="rectangle" />
                    <div className="rectangle-one" />
                    <div className="rectangle-two" />
                    <div className="rectangle-three" /></span> : null}
                <img src={icon} alt={title} />
            </div>
            <div className="footer">
                <span className="date-long">{date} • {duration} • </span>
                <span className="description">
                    {description}
                </span>
            </div>
        </button>
    )
}