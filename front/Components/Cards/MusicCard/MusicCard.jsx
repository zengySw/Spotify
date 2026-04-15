import './PlayingVisualisator.css';
import './MusicCard.css';

export default function MusicCard({ id, icon, title, artists, onClick = (id, playingState) => { }, onDoubleClick = (id, playingState) => { }, isPlaying = false }) {
    const { playingState, setPlayingState } = useState(isPlaying);

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
                <Image src={icon} alt={title} />
            </div>
            <div className="footer">
                <span className="song-title">{title}</span>
                <span className="artists">{artists.map((artist, index) => (
                    artist + (index < artists.length - 1 ? ' & ' : '')
                ))}</span>
            </div>
        </button>
    )
}