import './PlayingVisualisator.css';
import './AudioBookCard.css';

export default function AudioBookCard({ id, icon, title, author, genres, description, date, duration, onClick = (id, playingState) => { }, onDoubleClick = (id, playingState) => { }, isPlaying = false }) {
    const { playingState, setPlayingState } = useState(isPlaying);

    useEffect(() => {
        setPlayingState(isPlaying);
    }, [isPlaying]);

    return (
        <button className="audio-book-card" onClick={onClick(id, playingState)} onDoubleClick={onDoubleClick(id, playingState)}>
            <div className="image-container">
                {playingState ? <span className="playing-visualisator"><div className="rectangle" />
                    <div className="rectangle-one" />
                    <div className="rectangle-two" />
                    <div className="rectangle-three" /></span> : null}
                <Image src={icon} alt={title} />
            </div>
            <div className="frame">
                <div className="text-container">
                    <div className="naming">
                        <span className="title">{title}</span>
                        <span className='separator'>|</span>
                        <span className="author">{author}</span>
                    </div>
                    <span className="genre">{genres.join(', ')}</span>
                    <span className="description">
                        {description}
                    </span>
                </div>
                <div className="footer">
                    <span className="date">{date}</span>
                    <span className="duration">{duration}</span>
                </div>
            </div>
        </button>
    );
}