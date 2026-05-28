import '../PlayingVisualisator.css';
import './MusicSCard.css';
import { useEffect, useState } from 'react';

// Хелпер для форматирования времени (секунды или миллисекунды)
function formatDuration(time) {
    if (!time) return "0:00";
    // Если число гигантское (больше 10000), скорее всего это миллисекунды из старой БД
    const totalSeconds = time > 10000 ? Math.floor(time / 1000) : time;
    
    const m = Math.floor(totalSeconds / 60);
    const s = Math.floor(totalSeconds % 60);
    return `${m}:${String(s).padStart(2, '0')}`;
}

export default function MusicSCard(props) {
    const track = props.track ?? props;

    // Безопасное вытягивание полей с поддержкой Deezer API и старого формата
    const id = track?.id;
    const title = track?.title || "Невідомий трек";
    const duration = track?.duration || 0;
    const addDate = track?.addDate || null;
    const listenCount = track?.listenCount || null;

    // Картинка: берем либо старый icon, либо обложку альбома из Deezer
    const imgUrl = track?.icon || track?.album?.cover_medium || track?.album?.cover_small;

    // Альбом: берем строку из старой базы или название из объекта Deezer
    const albumTitle = typeof track?.album === 'object' ? track?.album?.title : track?.album;

    // Артисты: обрабатываем массив из старой структуры, либо одиночный объект от Deezer
    let artistList = [];
    if (track?.artists && Array.isArray(track.artists)) {
        artistList = track.artists;
    } else if (track?.artist) {
        artistList = [track.artist.name || track.artist];
    }

    const {
        num,
        groupTracks = null,
        onClick = () => { },
        onDoubleClick = () => { },
        currentlyPlaying = null
    } = props;

    const [playingState, setPlayingState] = useState(currentlyPlaying?.id === id);

    useEffect(() => {
        setPlayingState(currentlyPlaying?.id === id);
    }, [currentlyPlaying, id]);

    // Вынесем визуализатор в переменную, чтобы не дублировать простыню JSX
    const visualisator = (
        <span className="playing-visualisator">
            <div className="rectangle" />
            <div className="rectangle-one" />
            <div className="rectangle-two" />
            <div className="rectangle-three" />
        </span>
    );

    return (
        <button className="music-s-card" onClick={onClick} onDoubleClick={onDoubleClick}>
            {num && num != null ? (
                playingState ? visualisator : <span className="num">{num}</span>
            ) : null}
            
            <div className="card">
                <div className="image-container">
                    {!num && playingState ? visualisator : null}
                    <img src={imgUrl || "/default-cover.svg"} alt={title} />
                </div>
                
                <div className="frame">
                    <div className="naming">
                        <span className="title">{title}</span>
                        <span className="artists">
                            {artistList.map((artist, index) => (
                                artist + (index < artistList.length - 1 ? ', ' : '')
                            ))}
                        </span>
                    </div>
                    
                    <div className="about">
                        <span className="album">{albumTitle}</span>
                        {addDate ? (
                            <span className="add-date">{addDate}</span>
                        ) : (
                            listenCount !== null && <span className="listen-count">{listenCount}</span>
                        )}
                        <span className="duration">{formatDuration(duration)}</span>
                    </div>
                </div>
            </div>
        </button>
    );
}