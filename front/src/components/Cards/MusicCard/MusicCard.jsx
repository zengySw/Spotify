import '../PlayingVisualisator.css';
import './MusicCard.css';
import { useState, useEffect, use } from 'react';
import React from 'react';

export default function MusicCard(props) {
    const track = props.track ?? props;

    const {
        id,
        icon,
        title,
        artists = [],
    } = track;

    const {
        groupTracks = null,
        onClick = () => { },
        onDoubleClick = () => { },
        currentlyPlaying = null
    } = props;

    const [playingState, setPlayingState] = useState(currentlyPlaying === id);

    useEffect(() => {
        setPlayingState(currentlyPlaying?.id === id);
    }, [currentlyPlaying, id]);

    const Wrapper = groupTracks ? "a" : "button";

    return (
        <Wrapper
            href={groupTracks ? `media/playlist/${id}` : ""}
            className="music-card"
            onClick={() => onClick()}
            onDoubleClick={() => onDoubleClick()}
            style={groupTracks ? {} : { cursor: "default" }}
        >
            <div className="image-container">
                {playingState ?
                    <span className="playing-visualisator"><div className="rectangle" />
                        <div className="rectangle-one" />
                        <div className="rectangle-two" />
                        <div className="rectangle-three" />
                    </span> : null}
                <img src={icon} alt={title} />
            </div>

            <div className="footer">
                <span className="song-title">{title}</span>

                <span className="artists">{groupTracks ? 'by ' : null}{artists.map((artist, index) => (
                    artist + (index < artists.length - 1 ? ' & ' : '')
                ))}</span>

                {groupTracks ? <span className="group-tracks">{groupTracks} tracks</span> : null}
            </div>
        </Wrapper>
    );
}
