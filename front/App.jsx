import { useState, useEffect, useRef, useCallback } from "react";
import { OnePList, RowList } from "./Components/Lists";
import { MusicCard, GenreCard, ArtistCard } from "./Components/Cards";

const API_URL =
  "https://uwupad.me/music/api/music?limit=50&offset=0&sort_by=fyp&period=all_time&geo=global";

function fmt(s) {
  if (!s || isNaN(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${String(sec).padStart(2, "0")}`;
}

function MusicNote() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ opacity: 0.35 }}>
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
    </svg>
  );
}

function PrevIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" />
    </svg>
  );
}

function NextIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
    </svg>
  );
}

function VolumeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
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
        // API returns { total: N, data: [...] }
        const list = Array.isArray(d) ? d : (d.data || d.items || d.tracks || []);
        setTracks(list);
        setLoading(false);
      })
      .catch(() => {
        setError("Не удалось загрузить треки.");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const a = audioRef.current;
    a.volume = volume;

    const onTime = () => {
      setCurrentTime(a.currentTime);
      setProgress(a.duration ? (a.currentTime / a.duration) * 100 : 0);
    };
    const onLoad = () => setDuration(a.duration);
    const onEnded = () => {
      setCurrentIdx((i) => (i + 1) % tracks.length);
    };

    a.addEventListener("timeupdate", onTime);
    a.addEventListener("loadedmetadata", onLoad);
    a.addEventListener("ended", onEnded);
    return () => {
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("loadedmetadata", onLoad);
      a.removeEventListener("ended", onEnded);
    };
  }, [tracks.length]);

  useEffect(() => {
    if (currentIdx < 0 || !tracks[currentIdx]) return;
    const t = tracks[currentIdx];
    // Audio: https://cdn.uwupad.me/{id}.mp3
    const url = `http://localhost:3000/audio?id=${t.id}`;
    const a = audioRef.current;
    a.src = url;
    a.play().then(() => setIsPlaying(true)).catch(() => { });
  }, [currentIdx, tracks]);

  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  const playTrack = useCallback((idx) => {
    if (idx === currentIdx) {
      togglePlay();
    } else {
      setCurrentIdx(idx);
    }
  }, [currentIdx]);

  const togglePlay = () => {
    const a = audioRef.current;
    if (isPlaying) {
      a.pause();
      setIsPlaying(false);
    } else {
      a.play().then(() => setIsPlaying(true)).catch(() => { });
    }
  };

  const seekTo = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    const a = audioRef.current;
    if (a.duration) {
      a.currentTime = pct * a.duration;
    }
  };

  const currentTrack = tracks[currentIdx];

  const getTitle = (t) => t?.title || "Unknown";
  const getArtist = (t) => t?.owner?.username || "Unknown artist";
  const getCover = (t) =>
    t?.cover_image
      ? `http://localhost:3000/image?url=${encodeURIComponent(t.cover_image)}`
      : null;
  const getTags = (t) => t?.tags?.slice(0, 2).map((g) => g.name).join(" · ") || "";

  return (
    // <div style={{ display: "flex", flexDirection: "column", height: "100vh", background: "#121212", color: "#fff", fontFamily: "system-ui, sans-serif" }}>

    //   {/* Header */}
    //   <div style={{ padding: "24px 24px 16px", borderBottom: "1px solid #2a2a2a" }}>
    //     <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0, letterSpacing: "-0.5px" }}>uwupad</h1>
    //     <p style={{ fontSize: 12, color: "#888", margin: "4px 0 0" }}>top · global · all time</p>
    //   </div>

    //   {/* Tracklist */}
    //   <div style={{ flex: 1, overflowY: "auto" }}>
    //     {loading && <div style={{ padding: 40, textAlign: "center", color: "#666" }}>Загружаем треки…</div>}
    //     {error && <div style={{ padding: 40, textAlign: "center", color: "#e55" }}>{error}</div>}
    //     {tracks.map((t, i) => {
    //       const active = i === currentIdx;
    //       const cover = getCover(t);
    //       return (
    //         <div
    //           key={t.id}
    //           onClick={() => playTrack(i)}
    //           style={{
    //             display: "flex", alignItems: "center", gap: 12, padding: "8px 24px",
    //             cursor: "pointer", borderBottom: "1px solid #1e1e1e",
    //             background: active ? "#1e1e1e" : "transparent",
    //             transition: "background 0.1s",
    //           }}
    //           onMouseEnter={e => { if (!active) e.currentTarget.style.background = "#181818"; }}
    //           onMouseLeave={e => { if (!active) e.currentTarget.style.background = "transparent"; }}
    //         >
    //           {/* Number / playing indicator */}
    //           <span style={{ fontSize: 12, color: active ? "#1db954" : "#555", width: 20, textAlign: "right", flexShrink: 0 }}>
    //             {active && isPlaying
    //               ? <svg width="12" height="12" viewBox="0 0 24 24" fill="#1db954"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
    //               : (i + 1)}
    //           </span>

    //           {/* Cover */}
    //           <div style={{ width: 40, height: 40, borderRadius: 4, background: "#282828", flexShrink: 0, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
    //             {cover
    //               ? <img src={cover} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={e => { e.target.style.display = "none"; }} />
    //               : <MusicNote />}
    //           </div>

    //           {/* Info */}
    //           <div style={{ flex: 1, minWidth: 0 }}>
    //             <div style={{ fontSize: 14, fontWeight: 500, color: active ? "#1db954" : "#fff", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
    //               {getTitle(t)}
    //             </div>
    //             <div style={{ fontSize: 12, color: "#888", marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
    //               {getArtist(t)}
    //               {getTags(t) && <span style={{ color: "#555", marginLeft: 8 }}>{getTags(t)}</span>}
    //             </div>
    //           </div>

    //           {/* Duration */}
    //           <span style={{ fontSize: 12, color: "#555", flexShrink: 0 }}>{fmt(t.duration)}</span>
    //         </div>
    //       );
    //     })}
    //   </div>

    //   {/* Player bar */}
    //   <div style={{ borderTop: "1px solid #2a2a2a", padding: "12px 24px 16px", background: "#181818" }}>

    //     {/* Now playing */}
    //     <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
    //       <div style={{ width: 44, height: 44, borderRadius: 4, background: "#282828", flexShrink: 0, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
    //         {currentTrack && getCover(currentTrack)
    //           ? <img src={getCover(currentTrack)} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={e => { e.target.style.display = "none"; }} />
    //           : <MusicNote />}
    //       </div>
    //       <div style={{ flex: 1, minWidth: 0 }}>
    //         <div style={{ fontSize: 13, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
    //           {currentTrack ? getTitle(currentTrack) : "—"}
    //         </div>
    //         <div style={{ fontSize: 12, color: "#aaa", marginTop: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
    //           {currentTrack ? getArtist(currentTrack) : "—"}
    //         </div>
    //       </div>
    //     </div>

    //     {/* Controls */}
    //     <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginBottom: 10 }}>
    //       <button
    //         onClick={() => setCurrentIdx(i => (i - 1 + tracks.length) % tracks.length)}
    //         style={{ background: "none", border: "none", cursor: "pointer", color: "#aaa", display: "flex", padding: 4 }}
    //       >
    //         <PrevIcon />
    //       </button>
    //       <button
    //         onClick={togglePlay}
    //         style={{ width: 40, height: 40, borderRadius: "50%", background: "#fff", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#000" }}
    //       >
    //         {isPlaying ? <PauseIcon /> : <PlayIcon />}
    //       </button>
    //       <button
    //         onClick={() => setCurrentIdx(i => (i + 1) % tracks.length)}
    //         style={{ background: "none", border: "none", cursor: "pointer", color: "#aaa", display: "flex", padding: 4 }}
    //       >
    //         <NextIcon />
    //       </button>
    //     </div>

    //     {/* Progress + volume */}
    //     <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
    //       <span style={{ fontSize: 11, color: "#888", width: 30 }}>{fmt(currentTime)}</span>
    //       <div
    //         onClick={seekTo}
    //         style={{ flex: 1, height: 4, background: "#404040", borderRadius: 2, cursor: "pointer", position: "relative" }}
    //       >
    //         <div style={{ width: `${progress}%`, height: "100%", background: "#1db954", borderRadius: 2 }} />
    //       </div>
    //       <span style={{ fontSize: 11, color: "#888", width: 30, textAlign: "right" }}>{fmt(duration)}</span>
    //       <div style={{ display: "flex", alignItems: "center", gap: 6, marginLeft: 8 }}>
    //         <span style={{ color: "#888" }}><VolumeIcon /></span>
    //         <input
    //           type="range" min="0" max="100" value={Math.round(volume * 100)}
    //           onChange={e => setVolume(e.target.value / 100)}
    //           style={{ width: 70, accentColor: "#1db954" }}
    //         />
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div style={{ width: "1230px" }}>
      <OnePList
        title={<h4>Саундтреки на основі твого <span style={{ color: '#40a2ff' }}>настрою</span></h4>}
        childs={[
          <GenreCard title="Хеппi" icon="https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-17/9uWZmwDx2G.png" key="g1" />,
          <GenreCard title="Меланхолія" icon="https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-17/V9KLw2OTh0.png" key="g2" />,
          <GenreCard title="Романтика" icon="https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-17/rkGP1NG2sw.png" key="g3" />,
          <GenreCard title="Драйв" icon="https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-17/03b67rx1We.png" key="g4" />,
          <GenreCard title="Туса" icon="https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-17/pnLQZFgkXd.png" key="g5" />
        ]} />
      <RowList title={<h4>Топ ВАША <span style={{ color: '#40a2ff' }}>музика</span> сьогодні!</h4>} prevCount={5} childs={[
        <MusicCard title="Die with a smile" artists={["Lady Gaga", "Bruno Mars"]} icon="https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-14/yaScAQqSUg.png" key="t1" />,
        <MusicCard title="Глубоко" artists={["Monatik", "Надія Дорофєєва"]} icon="https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-14/SkKXoD6JkK.png" key="t2" />,
        <MusicCard title="Superman" artists={["Eminiem"]} icon="https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-14/1ZYeYLp7r9.png" key="t3" />,
        <MusicCard title="Sweater Weather" artists={["The Neighberhood"]} icon="https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-14/DktLLitmTE.png" key="t4" />,
        <MusicCard title="Cry Me A River" artists={["Justin Timberlake"]} icon="https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-14/W1sgeXF7XM.png" key="t5" />,
        <MusicCard title="Die with a smile" artists={["Lady Gaga", "Bruno Mars"]} icon="https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-14/yaScAQqSUg.png" key="t6" />,
        <MusicCard title="Глубоко" artists={["Monatik", "Надія Дорофєєва"]} icon="https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-14/SkKXoD6JkK.png" key="t7" />,
        <MusicCard title="Superman" artists={["Eminiem"]} icon="https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-14/1ZYeYLp7r9.png" key="t8" />,
        <MusicCard title="Sweater Weather" artists={["The Neighberhood"]} icon="https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-14/DktLLitmTE.png" key="t9" />,
        <MusicCard title="Cry Me A River" artists={["Justin Timberlake"]} icon="https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-14/W1sgeXF7XM.png" key="t10" />,
      ]} continueLink="/top-music" />

      <RowList title={<h4>Нові <span style={{ color: '#40a2ff' }}>музичні</span> релізи</h4>} prevCount={5} childs={[
        <MusicCard title="On The Floor" artists={["JLO"]} icon="https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-14/6y5vGRyAum.png" groupTracks={19} key="t1" />,
        <MusicCard title="Reputation" artists={["Taylor Swift"]} icon="https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-14/wqhKCqFkk3.png" groupTracks={10} key="t2" />,
        <MusicCard title="Yours Truly" artists={["Ariana Grande"]} icon="https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-14/7b6RVkNZTT.png" groupTracks={5} key="t3" />,
        <MusicCard title="Маргарита" artists={["Michelle Andrade"]} icon="https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-14/ndLwq4S0j7.png" groupTracks={7} key="t4" />,
        <MusicCard title="30 Vinyl" artists={["Adele"]} icon="https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-14/PWUvYeX7uv.png" groupTracks={7} key="t5" />,
        <MusicCard title="On The Floor" artists={["JLO"]} icon="https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-14/6y5vGRyAum.png" groupTracks={19} key="t6" />,
        <MusicCard title="Reputation" artists={["Taylor Swift"]} icon="https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-14/wqhKCqFkk3.png" groupTracks={10} key="t7" />,
        <MusicCard title="Yours Truly" artists={["Ariana Grande"]} icon="https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-14/7b6RVkNZTT.png" groupTracks={5} key="t8" />,
        <MusicCard title="Маргарита" artists={["Michelle Andrade"]} icon="https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-14/ndLwq4S0j7.png" groupTracks={7} key="t9" />,
        <MusicCard title="30 Vinyl" artists={["Adele"]} icon="https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-14/PWUvYeX7uv.png" groupTracks={7} key="t10" />,
      ]} continueLink="/new-music" />
      <RowList title={<h4>Твої улюблені <span style={{ color: '#40a2ff' }}>виконавці</span></h4>} prevCount={4} childs={[
        <ArtistCard name="Lana Del Rey" icon="https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-14/jJLgPEaOGQ.png" followers="4 690 563" key="a1" />,
        <ArtistCard name="Lady Gaga" icon="https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-14/n8SOennME3.png" followers="4 690 563" key="a2" />,
        <ArtistCard name="Shakira" icon="https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-14/o8PCATp2U3.png" followers="4 690 563" key="a3" />,
        <ArtistCard name="Jennifer Lopez" icon="https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-14/jJLgPEaOGQ.png" followers="4 690 563" key="a4" />,
        <ArtistCard name="Lana Del Rey" icon="https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-14/jJLgPEaOGQ.png" followers="4 690 563" key="a5" />,
        <ArtistCard name="Lady Gaga" icon="https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-14/n8SOennME3.png" followers="4 690 563" key="a6" />,
        <ArtistCard name="Shakira" icon="https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-14/o8PCATp2U3.png" followers="4 690 563" key="a7" />,
        <ArtistCard name="Jennifer Lopez" icon="https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-14/jJLgPEaOGQ.png" followers="4 690 563" key="a8" />,
      ]} />
    </div>
  );
}