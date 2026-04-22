import "./sidebarPlayer.css";

function getTitle(track) {
  return track?.title || "Kill This Love";
}

function getArtist(track) {
  return track?.owner?.username || "BLACK PINK";
}

function getCover(track, fallback = "https://placehold.co/382x382") {
  if (!track?.cover_image) return fallback;
  return `http://localhost:3000/image?url=${encodeURIComponent(track.cover_image)}`;
}

export default function SidebarPlayer({ track, onTogglePlay, onPrev, onNext }) {
  return (
    <div className="sidebar-player">
      <header className="sidebar-header">
        <h1 className="radio-title">Lana Del Rey Radio</h1>
        <div className="header-actions">
          <div className="icon dots" onClick={onPrev} />
          <div className="icon close" onClick={onNext} />
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
          <div className="icon heart" />
          <div className="icon options" onClick={onTogglePlay} />
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
