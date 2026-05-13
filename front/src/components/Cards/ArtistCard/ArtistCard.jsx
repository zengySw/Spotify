import './ArtistCard.css';

export default function ArtistCard({ icon, name, followers }) {
    return (
        <div className="artist-card">
            <div className="image-container">
                <Image src={icon} alt={name} />
            </div>
            <div className="footer">
                <span className="artist-name">{name}</span>
                <span className="followers">{followers} followers</span>
            </div>
        </div>
    )
}