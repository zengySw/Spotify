import "./player.css";

function fmt(seconds) {
  if (!seconds || Number.isNaN(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

function getTitle(track) {
  return track?.title || "No track selected";
}

function getArtist(track) {
  return track?.owner?.username || "Unknown artist";
}

function getCover(track) {
  if (!track?.cover_image) return null;
  return `http://localhost:3000/image?url=${encodeURIComponent(track.cover_image)}`;
}

export default function Player({
  track,
  isPlaying,
  currentTime,
  duration,
  progress,
  volume,
  onTogglePlay,
  onPrev,
  onNext,
  onSeekPercent,
  onVolumeChange,
}) {
  const cover = getCover(track);

  const handleProgressClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    if (!rect.width) return;
    const percent = ((e.clientX - rect.left) / rect.width) * 100;
    onSeekPercent(percent);
  };

  return (
    <div className="player-bar">
      <div className="player-container">
        <div className="track-info">
          {cover ? (
            <img src={cover} alt={getTitle(track)} className="album-art" />
          ) : (
            <div className="album-art album-art-placeholder" />
          )}
          <div className="track-details">
            <h3 className="track-title">{getTitle(track)}</h3>
            <p className="artist-name">{getArtist(track)}</p>
          </div>
        </div>

        <div className="controls-section">
          <div className="buttons-row">
            <button type="button" className="icon-placeholder secondary" onClick={onPrev}>
              &lt;&lt;
            </button>
            <button type="button" className="play-button" onClick={onTogglePlay}>
              {isPlaying ? "||" : ">"}
            </button>
            <button type="button" className="icon-placeholder secondary" onClick={onNext}>
              &gt;&gt;
            </button>
          </div>

          <div className="progress-container">
            <span className="time current">{fmt(currentTime)}</span>
            <div className="progress-bar-bg" onClick={handleProgressClick}>
              <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
            </div>
            <span className="time total">{fmt(duration)}</span>
          </div>
        </div>

        <div className="utility-section">
          <input
            type="range"
            min="0"
            max="100"
            value={Math.round(volume * 100)}
            onChange={(e) => onVolumeChange(Number(e.target.value) / 100)}
            className="volume-slider"
          />
        </div>
      </div>
    </div>
  );
}
