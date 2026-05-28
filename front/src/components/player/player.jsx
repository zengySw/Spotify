import { useEffect, useRef, useState } from "react";
import "./player.css";

function fmt(seconds) {
  if (!seconds || Number.isNaN(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
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
  const [liked, set_liked] = useState(false);
  const [shuffle, set_shuffle] = useState(false);
  const [repeat, set_repeat] = useState(false);

  const cover =
    track?.album?.cover_medium ||
    track?.icon ||
    track?.artwork ||
    track?.album?.images?.[0]?.url ||
    track?.album?.cover_big ||
    null;

  const title = track?.title || "Невідомий трек";
  const artist = track?.artist?.name || "Невідомий виконавець";
  const audio_src = track?.preview || null;

  const audio_ref = useRef(null);

  useEffect(() => {
    if (!audio_ref.current) return;
    if (isPlaying) {
      audio_ref.current.play().catch((err) => console.log("Блокировка аудио:", err));
    } else {
      audio_ref.current.pause();
    }
  }, [isPlaying, track]);

  useEffect(() => {
    if (audio_ref.current) {
      audio_ref.current.volume = volume;
    }
  }, [volume]);

  const handle_time_update = () => {
    if (!audio_ref.current) return;
    const { currentTime: current, duration: total } = audio_ref.current;
    if (total) {
      onSeekPercent((current / total) * 100);
    }
  };

  const handle_progress_click = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    if (!rect.width) return;
    const percent = ((e.clientX - rect.left) / rect.width) * 100;
    if (audio_ref.current && duration) {
      audio_ref.current.currentTime = (percent / 100) * duration;
    }
    onSeekPercent(percent);
  };

  const vol_icon = volume === 0 ? "⊘" : volume < 0.4 ? "🔈" : "🔊";

  return (
    <div className="player-bar">
      {audio_src && (
        <audio
          ref={audio_ref}
          src={audio_src}
          onTimeUpdate={handle_time_update}
        />
      )}

      <div className="player-container">

        {/* ЛЕВАЯ ЧАСТЬ: обложка + инфо + лайк + добавить */}
        <div className="track-left">
          <div className="cover-circle">
            {cover ? (
              <img src={cover} alt="Cover" className="cover-img" />
            ) : (
              <span className="no-cover-icon">♪</span>
            )}
          </div>

          <div className="track-meta">
            <span className="track-title">{title}</span>
            <span className="artist-name">{artist}</span>
          </div>

          <div className="track-actions">
            <button
              type="button"
              className={`icon-btn${liked ? " active" : ""}`}
              onClick={() => set_liked((v) => !v)}
              aria-label="Like"
            >
              {liked ? "♥" : "♡"}
            </button>
            <button type="button" className="icon-btn" aria-label="Add to playlist">
              +
            </button>
          </div>
        </div>

        {/* ЦЕНТРАЛЬНАЯ ЧАСТЬ: кнопки + прогресс */}
        <div className="controls-center">
          <div className="ctrl-buttons">
            <button
              type="button"
              className={`icon-btn secondary${shuffle ? " active" : ""}`}
              onClick={() => set_shuffle((v) => !v)}
              aria-label="Shuffle"
              title="Перемешать"
            >
              ⇄
            </button>
            <button
              type="button"
              className="icon-btn secondary"
              onClick={onPrev}
              aria-label="Previous"
            >
              ⏮
            </button>
            <button
              type="button"
              className="play-button"
              onClick={onTogglePlay}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? "⏸" : "▶"}
            </button>
            <button
              type="button"
              className="icon-btn secondary"
              onClick={onNext}
              aria-label="Next"
            >
              ⏭
            </button>
            <button
              type="button"
              className={`icon-btn secondary${repeat ? " active" : ""}`}
              onClick={() => set_repeat((v) => !v)}
              aria-label="Repeat"
              title="Повтор"
            >
              ↺
            </button>
          </div>

          <div className="progress-row">
            <span className="time current">{fmt(currentTime)}</span>
            <div className="progress-bar-bg" onClick={handle_progress_click}>
              <div
                className="progress-bar-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="time total">{fmt(duration)}</span>
          </div>
        </div>

        {/* ПРАВАЯ ЧАСТЬ: громкость */}
        <div className="utility-right">
          <span className="vol-icon">{vol_icon}</span>
          <input
            type="range"
            min="0"
            max="100"
            value={Math.round(volume * 100)}
            onChange={(e) => onVolumeChange(Number(e.target.value) / 100)}
            className="volume-slider"
            style={{ "--vol-pct": `${Math.round(volume * 100)}%` }}
            aria-label="Volume"
          />
        </div>

      </div>
    </div>
  );
}