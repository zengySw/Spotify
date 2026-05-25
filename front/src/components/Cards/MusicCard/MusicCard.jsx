import '../PlayingVisualisator.css';
import './MusicCard.css';
import { useState, useEffect } from 'react';

export default function MusicCard({
    id,
    icon,
    title,
    artists = [],
    groupTracks = null,
    onClick = () => { },
    onDoubleClick = () => { },
    isPlaying = false,
    currentlyPlaying = null
}) {
    const [playingState, setPlayingState] = useState(isPlaying || currentlyPlaying === id);

    useEffect(() => {
        setPlayingState(isPlaying || currentlyPlaying === id);
    }, [isPlaying, currentlyPlaying, id]);

    const handleClick = () => {
        onClick(id, playingState);
    };

    const handleDoubleClick = () => {
        onDoubleClick(id, playingState);
    };

    return (
        <button className="music-card" onClick={handleClick} onDoubleClick={handleDoubleClick}>
            <div className="image-container">
                {playingState ? <span className="playing-visualisator"><div className="rectangle" />
                    <div className="rectangle-one" />
                    <div className="rectangle-two" />
                    <div className="rectangle-three" /></span> : null}
                <img src={icon} alt={title} />
            </div>
            <div className="footer">
                <span className="song-title">{title}</span>
                <span className="artists">{groupTracks ? 'by ' : null}{artists.map((artist, index) => (
                    artist + (index < artists.length - 1 ? ' & ' : '')
                ))}</span>
                {groupTracks ? <span className="group-tracks">{groupTracks} tracks</span> : null}
            </div>
        </button>
    )
}
