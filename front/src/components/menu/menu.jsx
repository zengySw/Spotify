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
import SAD from "/sad.svg";
import Stream from "/List--Streamline-Mynaui.svg.svg";

const playlists = [
  { title: "Lisa", meta: "Виконавець", img: Lisa },
  { title: "Lady Gaga", meta: "Виконавець", img: LadyGaga },
  { title: "Bruno Mars", meta: "Виконавець", img: BrunoMars },
  { title: "BTS", meta: "Виконавець", img: BTS },
  { title: "Lana Del Rey", meta: "Виконавець", img: LanaDelRey }
];

function Sidebar({ isOpen = false, onClose = () => { } }) {
  return (
    <>
      {isOpen && (
        <div className="menu-overlay" onClick={onClose} aria-hidden="true" />
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
            
            <img src={HomeIcon} alt="" className="menu-item-icon" />
            <span>Головна</span>
          </NavLink>

          <NavLink
            to="/media"
            className={({ isActive }) =>
              isActive ? "menu-item menu-item-active" : "menu-item"
            }
            onClick={onClose}
          >
            
            <img src={MyMediatekIcon} alt="" className="menu-item-icon" />
            <span>Моя медіатека</span>
          </NavLink>
        </section>

        <div className="menu-divider" />

        <section className="menu-section">
          <h2 className="menu-title">Плейлисти</h2>

          <NavLink
            to="/xd"
            className={({ isActive }) =>
              isActive ? "menu-item menu-item-active" : "menu-item"
            }
            onClick={onClose}
          >
            
            <img src={HeartIcon} alt="" className="menu-item-icon" />
            <span>Улюблені треки</span>
          </NavLink>

          <NavLink
            to="/*"
            className={({ isActive }) =>
              isActive ? "menu-item menu-item-active" : "menu-item"
            }
            onClick={onClose}
          >
            
            <img src={PlaylistIcon} alt="" className="menu-item-icon" />
            <span>Створити плейлист</span>
          </NavLink>

          <div className="menu-subhead-row">
            <h3 className="menu-subhead">Ваші плейлисти</h3>
            <img src={YourPlayListsIcon} alt="" className="menu-subhead-icon" />
          </div>

          <div className="menu-playlist-list">
            {playlists.map((item, idx) => (
              <NavLink
                key={item.title}
                to={`/playlist/${item.title}`}
                className={
                  idx === 0
                    ? "menu-playlist menu-playlist-active"
                    : "menu-playlist"
                }
                onClick={onClose}
              >
                
                <img src={item.img} alt={item.title} className="menu-playlist-avatar" />
                <div className="menu-playlist-info">
                  <span className="menu-playlist-title">{item.title}</span>
                  <span className="menu-playlist-meta">{item.meta}</span>
                </div>
              </NavLink>
            ))}
          </div>
        </section>

        <div className="menu-divider" />

        <section className="menu-bottom">
          <div className="menu-subhead-row">
            <h3 className="menu-subhead">Нещодавно прослухані</h3>
            
            <img src={Stream} alt="" className="menu-subhead-icon" />
          </div>
          
          <div className="menu-clock">
            <img src={SAD} alt="Sad" style={{ width: '24px', height: '24px' }} />
          </div>
        </section>
      </aside>
    </>
  );
}

export default Sidebar;
