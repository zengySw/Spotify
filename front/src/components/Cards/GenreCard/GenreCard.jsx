import './GenreCard.css';

export default function GenreCard({ icon, genre }) {
    return (
        <div className="genre-card">
            <span>{genre}</span>
            <Image src={icon} alt={genre} />
        </div>
    )
}