import "./sidebarPlayer.css";
import { useState, useEffect } from "react";
import Heart from "/public/Heart.svg";
import Rand from "/public/rand.svg";
import MenuList from "/public/menuList.svg";
import Download from "/public/Download.svg";

function getTitle(track) {
  return track?.title || "Kill This Love";
}

function getArtist(track) {
  return track?.owner?.username || "BLACK PINK";
}

function getCover(track, fallback = "https://placehold.co/382x323") {
  return (
    track?.album?.cover_medium ||     // Deezer
    track?.icon ||                    // Твоя локальная база / маппинг Spotify
    track?.artwork ||                 // Audius / Jamendo (из функции searchMp3)
    track?.album?.images?.[0]?.url || // Прямой ответ Spotify API
    track?.album?.cover_big ||        // Запасной Deezer
    fallback
  );
}

export default function SidebarPlayer({ track, onTogglePlay, onPrev, onNext }) {
  return (
    <div className="sidebar-player">
      <header className="sidebar-header">
        <h1 className="radio-title">Lana Del Rey Radio</h1>
        <div className="header-actions">
          <div className="icon dots" onClick={onPrev} ><img src={MenuList} alt="Dots" /></div>
          <div className="icon close" onClick={onNext} ><img src={Download} alt="Close" /></div>
        </div>
      </header>

      <div className="main-cover">
        <img src={getCover(track)} alt="Cover Art" />
      </div>

      <div className="track-info-section">
        <div className="titles">
          <h2 className="song-title">{getTitle(track)}</h2>
          <p className="artist-name">{getArtist(track)}</p>
        </div>
        <div className="track-actions">
          <div className="icon heart" ><img src={Heart} alt="Heart" /></div>
          <div className="icon options" onClick={onTogglePlay} ><img src={Rand} alt="Options" /></div>
        </div>
      </div>

      <section className="artist-card">
        <img
          src={getCover(track, "https://placehold.co/382x323")}
          className="artist-photo"
          alt="Artist photo"
        />
        <div className="artist-details">
          <h3 className="artist-card-title">{getArtist(track)}</h3>
          <div className="artist-stats">
            <span className="monthly-listeners">72 780 975 слухачів на місяць</span>
            <button className="subscribe-btn" type="button" onClick={onTogglePlay}>
              Відписатися
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
