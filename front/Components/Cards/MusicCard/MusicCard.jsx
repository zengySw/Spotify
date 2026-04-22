import '../PlayingVisualisator.css';
import './MusicCard.css';
import { useState, useEffect } from 'react';
import React from 'react';

export default function MusicCard({ id, icon, title, artists, groupTracks = null, onClick = (id, playingState) => { }, onDoubleClick = (id, playingState) => { }, isPlaying = false }) {
    const [playingState, setPlayingState] = useState(isPlaying);

    useEffect(() => {
        setPlayingState(isPlaying);
    }, [isPlaying]);

    return (
        <button className="music-card" onClick={onClick(id, playingState)} onDoubleClick={onDoubleClick(id, playingState)}>
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