import React from "react";
import "./menu.css";

function Sidebar() {
  return (
    <aside className="menu-sidebar">
      <section className="menu-section">
        <h2 className="menu-title">Меню</h2>

        <button type="button" className="menu-item menu-item-active">
          <span className="menu-item-icon">⌂</span>
          <span>Головна</span>
        </button>

        <button type="button" className="menu-item">
          <span className="menu-item-icon">▮▮</span>
          <span>Моя медіатека</span>
        </button>
      </section>

      <div className="menu-divider" />

      <section className="menu-section">
        <h2 className="menu-title">Плейлисти</h2>

        <button type="button" className="menu-item menu-item-plain">
          <span className="menu-item-icon">♡</span>
          <span>Улюблені треки</span>
        </button>

        <button type="button" className="menu-item menu-item-plain">
          <span className="menu-item-icon">≡</span>
          <span>Створити плейлист</span>
        </button>

        <div className="menu-subhead-row">
          <h3 className="menu-subhead">Ваші плейлисти</h3>
          <span className="menu-subhead-icon">☰</span>
        </div>

        <div className="menu-playlist-list">
          <button type="button" className="menu-playlist menu-playlist-active">
            <span className="menu-playlist-title">Lisa</span>
            <span className="menu-playlist-meta">Виконавець</span>
          </button>
          <button type="button" className="menu-playlist">
            <span className="menu-playlist-title">Lady Gaga</span>
            <span className="menu-playlist-meta">Виконавець</span>
          </button>
          <button type="button" className="menu-playlist">
            <span className="menu-playlist-title">Bruno Mars</span>
            <span className="menu-playlist-meta">Виконавець</span>
          </button>
          <button type="button" className="menu-playlist">
            <span className="menu-playlist-title">BTS</span>
            <span className="menu-playlist-meta">Виконавець</span>
          </button>
          <button type="button" className="menu-playlist">
            <span className="menu-playlist-title">Lana Del Rey</span>
            <span className="menu-playlist-meta">Виконавець</span>
          </button>
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
  );
}

export default Sidebar;
