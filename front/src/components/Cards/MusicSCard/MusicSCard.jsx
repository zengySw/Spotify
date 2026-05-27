import '../PlayingVisualisator.css';
import './MusicSCard.css';
import { useEffect, useState } from 'react';

export default function MusicSCard(props) {
    const track = props.track ?? props;

    const {
        id,
        icon,
        album,
        title,
        duration,
        artists = [],
        listenCount = null,
        addDate = null,
    } = track;

    const {
        num,
        groupTracks = null,
        onClick = () => { },
        onDoubleClick = () => { },
        currentlyPlaying = null
    } = props;

    const [playingState, setPlayingState] = useState(currentlyPlaying === id);

    useEffect(() => {
        setPlayingState(currentlyPlaying?.id === id);
    }, [currentlyPlaying, id]);

    return (
        <button className="music-s-card" onClick={() => onClick()} onDoubleClick={() => onDoubleClick()}>
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
