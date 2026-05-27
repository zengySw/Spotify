import "./menuCards.css";
import { NavLink } from "react-router-dom";

export default function MenuCards({ title, description, img_src, id, on_click }) {
    const handle_click = () => {
        if (on_click && id !== undefined) {
            on_click(id);
        }
    };

    return (
        <NavLink
            to={id !== undefined ? `/media/playlist/${id}` : "#"}
            className="playlist-item-style"
            onClick={handle_click}
        >
            <img src={img_src} alt={title} className="menu-card-image" />
            <div className="playlist-text">
                <h4 className="menu-card-title">{title}</h4>
                <p className="menu-card-description">{description}</p>
            </div>
        </NavLink>
    );
}