function fmt(seconds) {
  if (!seconds || Number.isNaN(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

function getTitle(track) {
  return track?.title || "Unknown";
}

function getArtist(track) {
  return track?.owner?.username || "Unknown artist";
}

function getCover(track) {
  if (!track?.cover_image) return null;
  return `http://localhost:3000/image?url=${encodeURIComponent(track.cover_image)}`;
}

function getTags(track) {
  return track?.tags?.slice(0, 2).map((genre) => genre.name).join(" | ") || "";
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

const wrapperStyle = { flex: 1, minWidth: 0 };
const filterRowStyle = { display: "flex", gap: 10, padding: "12px 18px 10px" };
const filterButtonStyle = {
  minWidth: 68,
  height: 28,
  borderRadius: 6,
  border: "1px solid rgba(132, 184, 220, 0.45)",
  background: "rgba(33, 56, 77, 0.55)",
  color: "#d8ebfb",
  fontSize: 12,
  fontWeight: 700,
  cursor: "pointer",
};
const stateStyle = { padding: 40, textAlign: "center" };

export default function TrackList({ tracks, currentIdx, isPlaying, loading, error, onPlayTrack }) {
  return (
    <div style={wrapperStyle}>
      <div style={filterRowStyle}>
        {["Всі", "Треки", "Інше"].map((label) => (
          <button key={label} type="button" style={filterButtonStyle}>
            {label}
          </button>
        ))}
      </div>

      {loading && <div style={{ ...stateStyle, color: "#666" }}>Loading tracks...</div>}
      {error && <div style={{ ...stateStyle, color: "#e55" }}>{error}</div>}

      {tracks.map((track, index) => {
        const active = index === currentIdx;
        const cover = getCover(track);

        return (
          <div
            key={track.id}
            onClick={() => onPlayTrack(index)}
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
              {active && isPlaying ? "||" : index + 1}
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
                    e.currentTarget.style.display = "none";
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
                {getTitle(track)}
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
                {getArtist(track)}
                {getTags(track) && <span style={{ color: "#555", marginLeft: 8 }}>{getTags(track)}</span>}
              </div>
            </div>

            <span style={{ fontSize: 12, color: "#555", flexShrink: 0 }}>{fmt(track.duration)}</span>
          </div>
        );
      })}
    </div>
  );
}
