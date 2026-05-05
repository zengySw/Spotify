import './GenreCard.css';
import { Link } from 'react-router-dom';

export default function GenreCard({ title, icon, link = null }) {
    return (
        <a className="genre-card" href={link}>
            <div className='image-container'><img src={icon} alt={title} /></div>
            <span>{title}</span>
        </a>
    )
}