import { NavLink } from "react-router-dom";
import "./menu.css";

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

      <NavLink to="/media" className={({ isActive }) =>
        isActive ? "menu-item Selected-item" : "menu-item"}>
        <img src={MyMediatekIcon} className="img-style" />
        <h3>Моя медіатека</h3>
      </NavLink>


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

      <NavLink to="/media/playlist/7f8GHAXGwZLefZ0Zq0cHgx" className={({ isActive }) =>
        isActive ? "menu-item Selected-item" : "menu-item"}>
        <img src={HeartIcon} className="img-style" />
        <h3>Улюблені треки</h3>
      </NavLink>


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

        <NavLink to="/playlist" className={({ isActive }) =>
          isActive ? "menu-item Selected-item" : "menu-item"}>
          <img src={HeartIcon} className="img-style" />
          <h3>Улюблені треки</h3>
        </NavLink>

        <div className="menu-item ">
          <img src={PlaylistIcon} alt="Heart" className="img-style" />
          <h3>Створити плейлист</h3>
        </div>

        <div className="menu-item-your-playlists">
          <h3>Ваші плейлисти</h3>
          <img src={YourPlayListsIcon} alt="" className="img-style-your-playlists" />
        </div>

        <div id="playlist-style ">
          <div className="playlist-item-style">
            <img src={Lisa} alt="Lisa" />
            <div className="playlist-text">
              <h4>Lisa</h4>
              <p>Виконавець</p>
            </div>
          </div>

          <div className="playlist-item-style">
            <img src={LadyGaga} alt="Lady Gaga" />
            <div className="playlist-text">
              <h4>Lady Gaga</h4>
              <p>Виконавець</p>
            </div>
          </div>

          <div className="playlist-item-style">
            <img src={LanaDelRey} alt="Lana Del Rey" />
            <div className="playlist-text">
              <h4>Lana Del Rey</h4>
              <p>Виконавець</p>
            </div>
          </div>

          <div className="playlist-item-style">
            <img src={BTS} alt="BTS" />
            <div className="playlist-text">
              <h4>BTS</h4>
              <p>Виконавець</p>
            </div>
          </div>
        </div>
        <div style={{ height: "1px", backgroundColor: "rgb(67, 110, 132)" }}></div>
        <h3 id="MenuEnd">Нещодавно прослуханi</h3>
        <img id="Stream" src={Stream} alt="" />
        <img id="SAD" src={SAD} alt="" />
      </div>
    </div>

  );
}

export default Sidebar;