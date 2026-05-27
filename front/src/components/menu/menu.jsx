import { NavLink } from "react-router-dom";
import "./menu.css";
import HomeIcon from "/Home.svg";
import MyMediatekIcon from "/MyMediatek.svg";
import HeartIcon from "/Heart.svg";
import PlaylistIcon from "/Playlist.svg";
import YourPlayListsIcon from "/YourPlayLists.svg";
import Lisa from "/Lisa.svg";
import BrunoMars from "/BrunoMars.svg";
import LadyGaga from "/LadyGaga.svg";
import LanaDelRey from "/LanaDelRey.svg";
import BTS from "/BTS.svg";
import SAD from "/sad.svg"
import Stream from "/List--Streamline-Mynaui.svg.svg"
import { NavLink } from "react-router-dom";


const playlists = [
  { title: "Lisa", meta: "Виконавець" },
  { title: "Lady Gaga", meta: "Виконавець" },
  { title: "Bruno Mars", meta: "Виконавець" },
  { title: "BTS", meta: "Виконавець" },
  { title: "Lana Del Rey", meta: "Виконавець" }
];

function Sidebar({ isOpen = false, onClose = () => {} }) {
  return (
    <>
      {/* Оверлей — только когда меню открыто на мобиле */}
      {isOpen && (
        <div
          className="menu-overlay"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`menu-sidebar${isOpen ? ' menu-sidebar-open' : ''}`}
        aria-label="Бічне меню"
      >
        <section className="menu-section">
          <h2 className="menu-title">Меню</h2>

          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "menu-item menu-item-active" : "menu-item"
            }
            onClick={onClose}
          >
            <span className="menu-item-icon">⌂</span>
            <span>Головна</span>
          </NavLink>

          <NavLink
            to="/media"
            className={({ isActive }) =>
              isActive ? "menu-item menu-item-active" : "menu-item"
            }
            onClick={onClose}
          >
            <span className="menu-item-icon">▮▮</span>
            <span>Моя медіатека</span>
          </NavLink>
        </section>

        <div className="menu-divider" />

        <section className="menu-section">
          <h2 className="menu-title">Плейлисти</h2>

          <NavLink
            to="/playlist"
            className={({ isActive }) =>
              isActive ? "menu-item menu-item-active" : "menu-item"
            }
            onClick={onClose}
          >
            <span className="menu-item-icon">♡</span>
            <span>Улюблені треки</span>
          </NavLink>

          <button type="button" className="menu-item menu-item-plain">
            <span className="menu-item-icon">≡</span>
            <span>Створити плейлист</span>
          </button>

          <div className="menu-subhead-row">
            <h3 className="menu-subhead">Ваші плейлисти</h3>
            <span className="menu-subhead-icon">☰</span>
          </div>

          <div className="menu-playlist-list">
            {playlists.map((item, idx) => (
              <button
                key={item.title}
                type="button"
                className={
                  idx === 0
                    ? "menu-playlist menu-playlist-active"
                    : "menu-playlist"
                }
                onClick={onClose}
              >
                <span className="menu-playlist-title">{item.title}</span>
                <span className="menu-playlist-meta">{item.meta}</span>
              </button>
            ))}
          </div>
        </section>

        <div className="menu-divider" />

        <section className="menu-bottom">
          <div className="menu-subhead-row">
            <h3 className="menu-subhead">Нещодавно прослухані</h3>
            <span className="menu-subhead-icon">⟳</span>
          </div>
          <div className="menu-clock">◷</div>
        </section>
      </aside>
    </>
  );
}

export default Sidebar;