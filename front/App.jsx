import { useState, useEffect, useRef } from "react";
import HeaderBar from "./src/components/header/header.jsx";
import FooterBar from "./src/components/Footer/footer.jsx";
import Menu from "./src/components/menu/menu.jsx";
import Player from "./src/components/player/player.jsx";
import SidebarPlayer from "./src/components/player/sidebarPlayer.jsx";

const API_URL =
  "https://uwupad.me/music/api/music?limit=50&offset=0&sort_by=fyp&period=all_time&geo=global";

function fmt(seconds) {
  if (!seconds || Number.isNaN(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

function MusicNote() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      style={{ opacity: 0.35 }}
    >
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  );
}

export default function App() {
  const [tracks, setTracks] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const audioRef = useRef(new Audio());

  useEffect(() => {
    fetch(API_URL)
      .then((r) => r.json())
      .then((d) => {
        const list = Array.isArray(d) ? d : d.data || d.items || d.tracks || [];
        setTracks(list);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load tracks.");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const audio = audioRef.current;

    const onTime = () => {
      setCurrentTime(audio.currentTime || 0);
      setDuration(audio.duration || 0);
      setProgress(audio.duration ? (audio.currentTime / audio.duration) * 100 : 0);
    };

    const onLoad = () => {
      setDuration(audio.duration || 0);
      setProgress(audio.duration ? (audio.currentTime / audio.duration) * 100 : 0);
    };

    const onEnded = () => {
      if (!tracks.length) {
        setIsPlaying(false);
        return;
      }
      setCurrentIdx((i) => (i + 1) % tracks.length);
    };

    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onLoad);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onLoad);
      audio.removeEventListener("ended", onEnded);
    };
  }, [tracks.length]);

  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    if (currentIdx < 0 || !tracks[currentIdx]) return;

    const audio = audioRef.current;
    const track = tracks[currentIdx];
    audio.src = `http://localhost:3000/audio?id=${track.id}`;
    audio
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false));
  }, [currentIdx, tracks]);

  const togglePlay = () => {
    if (!tracks.length) return;

    if (currentIdx < 0) {
      setCurrentIdx(0);
      return;
    }

    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    audio
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false));
  };

  const playTrack = (idx) => {
    if (idx === currentIdx) {
      togglePlay();
      return;
    }
    setCurrentIdx(idx);
  };

  const playPrev = () => {
    if (!tracks.length) return;
    setCurrentIdx((i) => (i <= 0 ? tracks.length - 1 : i - 1));
  };

  const playNext = () => {
    if (!tracks.length) return;
    setCurrentIdx((i) => (i + 1) % tracks.length);
  };

  const setSeekByPercent = (percent) => {
    const audio = audioRef.current;
    if (!audio.duration) return;
    const safe = Math.max(0, Math.min(100, percent));
    audio.currentTime = (safe / 100) * audio.duration;
  };

  const currentTrack = tracks[currentIdx] || null;

  const getTitle = (t) => t?.title || "Unknown";
  const getArtist = (t) => t?.owner?.username || "Unknown artist";
  const getCover = (t) =>
    t?.cover_image
      ? `http://localhost:3000/image?url=${encodeURIComponent(t.cover_image)}`
      : null;
  const getTags = (t) => t?.tags?.slice(0, 2).map((g) => g.name).join(" | ") || "";

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#01060f",
        backgroundImage: `
          radial-gradient(30% 18% at 10% 8%, rgba(90, 169, 204, 0.35) 0%, rgba(90, 169, 204, 0) 100%),
          radial-gradient(28% 20% at 52% 16%, rgba(42, 84, 176, 0.28) 0%, rgba(42, 84, 176, 0) 100%),
          radial-gradient(26% 20% at 82% 12%, rgba(39, 154, 154, 0.25) 0%, rgba(39, 154, 154, 0) 100%),
          radial-gradient(24% 18% at 18% 44%, rgba(34, 103, 187, 0.24) 0%, rgba(34, 103, 187, 0) 100%),
          radial-gradient(28% 20% at 72% 42%, rgba(26, 104, 157, 0.24) 0%, rgba(26, 104, 157, 0) 100%),
          radial-gradient(25% 20% at 12% 74%, rgba(44, 127, 120, 0.22) 0%, rgba(44, 127, 120, 0) 100%),
          radial-gradient(30% 20% at 78% 76%, rgba(32, 131, 173, 0.2) 0%, rgba(32, 131, 173, 0) 100%),
          linear-gradient(180deg, #020913 0%, #01050d 58%, #00040a 100%)
        `,
        backgroundRepeat: "no-repeat",
        color: "#fff",
        fontFamily: "system-ui, sans-serif",
        paddingTop: 64,
        boxSizing: "border-box",
      }}
    >
      <HeaderBar />
      <Menu />

      <div
        style={{
          marginLeft: 280,
          paddingBottom: 88,
          paddingRight: 16,
          minHeight: "calc(100vh - 64px)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", gap: 10, padding: "12px 18px 10px" }}>
              {["Всі", "Треки", "Інше"].map((label) => (
                <button
                  key={label}
                  type="button"
                  style={{
                    minWidth: 68,
                    height: 28,
                    borderRadius: 6,
                    border: "1px solid rgba(132, 184, 220, 0.45)",
                    background: "rgba(33, 56, 77, 0.55)",
                    color: "#d8ebfb",
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  {label}
                </button>
              ))}
            </div>

            {loading && (
              <div style={{ padding: 40, textAlign: "center", color: "#666" }}>Loading tracks...</div>
            )}
            {error && <div style={{ padding: 40, textAlign: "center", color: "#e55" }}>{error}</div>}

            {tracks.map((t, i) => {
              const active = i === currentIdx;
              const cover = getCover(t);

              return (
                <div
                  key={t.id}
                  onClick={() => playTrack(i)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "8px 24px",
                    cursor: "pointer",
                    borderBottom: "1px solid rgba(39, 88, 130, 0.45)",
                    background: active ? "#1e1e1e" : "transparent",
                    transition: "background 0.1s",
                  }}
                  onMouseEnter={(e) => {
                    if (!active) e.currentTarget.style.background = "#181818";
                  }}
                  onMouseLeave={(e) => {
                    if (!active) e.currentTarget.style.background = "transparent";
                  }}
                >
                  <span
                    style={{
                      fontSize: 12,
                      color: active ? "#1db954" : "#555",
                      width: 20,
                      textAlign: "right",
                      flexShrink: 0,
                    }}
                  >
                    {active && isPlaying ? "||" : i + 1}
                  </span>

                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 4,
                      background: "#282828",
                      flexShrink: 0,
                      overflow: "hidden",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {cover ? (
                      <img
                        src={cover}
                        alt=""
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    ) : (
                      <MusicNote />
                    )}
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: 500,
                        color: active ? "#1db954" : "#fff",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {getTitle(t)}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: "#888",
                        marginTop: 2,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {getArtist(t)}
                      {getTags(t) && <span style={{ color: "#555", marginLeft: 8 }}>{getTags(t)}</span>}
                    </div>
                  </div>

                  <span style={{ fontSize: 12, color: "#555", flexShrink: 0 }}>{fmt(t.duration)}</span>
                </div>
              );
            })}
          </div>

          <div style={{ width: 310, flexShrink: 0, position: "sticky", top: 64 }}>
            <SidebarPlayer track={currentTrack} onTogglePlay={togglePlay} onPrev={playPrev} onNext={playNext} />
          </div>
        </div>

        <FooterBar />
      </div>

      <Player
        track={currentTrack}
        isPlaying={isPlaying}
        currentTime={currentTime}
        duration={duration}
        progress={progress}
        volume={volume}
        onTogglePlay={togglePlay}
        onPrev={playPrev}
        onNext={playNext}
        onSeekPercent={setSeekByPercent}
        onVolumeChange={setVolume}
      />
    </div>
  );
}
