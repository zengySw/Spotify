import { useState, useEffect, useRef } from "react";
import HeaderBar from "./src/components/header/header.jsx";
import FooterBar from "./src/components/Footer/footer.jsx";
import Menu from "./src/components/menu/menu.jsx";
import Player from "./src/components/player/player.jsx";
import SidebarPlayer from "./src/components/player/sidebarPlayer.jsx";
import Main from "./src/components/App/Main.jsx";
import { OnePList, RowList } from "./src/components/Lists";
import { MusicCard, GenreCard, ArtistCard, PodcastCard, AudioBookCard } from "./src/components/Cards";


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
    <div className="app-shell">
      <HeaderBar />
      <Menu />

      <div>
        <Main />
        {/* <Playlist
          name="Мій плейлист"
          icon="/likes_ico.png"
          author={{ name: "Автор плейлиста", icon: "https://i.pinimg.com/564x/1c/8e/0b/1c8e0b9a7d2f5a3c9e4b6c9e5f1a2b.jpg" }}
          tracks={[
            { id: 1, num: 1, icon: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-29/vG4wFeyyZv.png", title: "ВИМОЛИВ", artists: ["Jerry Heil", "MONATIK", "Evgeny Khmara"], album: "Вимолв", listenCount: null, duration: "3:02", addDate: "Сьогодні" },
            { id: 2, num: 2, icon: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-29/oFWQHwbxbg.png", title: "Для моєї душі", artists: ["Сайонай Ли"], album: "Струни моєї душі", listenCount: null, duration: "2:56", addDate: "Сьогодні" },
            { id: 3, num: 3, icon: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-29/14aiRt4ZhQ.png", title: "Remember me", artists: ["Hozen Recks"], album: "Harmonic Corwergence", listenCount: null, duration: "2:43", addDate: "Сьогодні" },
            { id: 4, num: 4, icon: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-29/ws6rP8MeUL.png", title: "Solo", artists: ["MOLIN PRIM"], album: "G I R L", listenCount: null, duration: "1:34", addDate: "Сьогодні" },
            { id: 5, num: 5, icon: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-29/oOXP6nmo1b.png", title: "How You Like That", artists: ["BLACKPINK"], album: "THE ALBUM", listenCount: null, duration: "2:34", addDate: "Сьогодні" },
            { id: 6, num: 6, icon: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-29/NZS5kfBpwY.png", title: "Ice Cream", artists: ["BLACKPINK"], album: "THE ALBUM", listenCount: null, duration: "3:02", addDate: "02.04.2025" },
            { id: 7, num: 7, icon: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-29/AMaspWa5Sw.png", title: "Bet You Wanna", artists: ["BLACKPINK"], album: "THE ALBUM", listenCount: null, duration: "3:02", addDate: "02.04.2025" },
            { id: 8, num: 8, icon: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-29/QPoSZc315i.png", title: "TOMBOY", artists: ["(G)I-DLE"], album: "100% (G)I-DLE", listenCount: null, duration: "3:22", addDate: "02.04.2025" },
            { id: 9, num: 9, icon: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-29/aSnGgL80Db.png", title: "LION", artists: ["(G)I-DLE"], album: "100% (G)I-DLE", listenCount: null, duration: "3:45", addDate: "02.04.2025" },
            { id: 10, num: 10, icon: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-29/pUJvCsYzjC.png", title: "JEALOUSY", artists: ["Offset", "Cardi B"], album: "JEALOUSY", listenCount: null, duration: "3:22", addDate: "23.03.2025" },
            { id: 11, num: 11, icon: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-29/U84tYvUhYa.png", title: "I Like It", artists: ["Cardi B"], album: "Invasion of Privacy", listenCount: null, duration: "3:12", addDate: "23.03.2025" },
            { id: 12, num: 12, icon: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-29/HWpJ2gGFsu.png", title: "Up", artists: ["Cardi B"], album: "Invasion of Privacy", listenCount: null, duration: "1:11", addDate: "22.03.2025" },
            { id: 13, num: 13, icon: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-29/gVwO9RNruM.png", title: "APT.", artists: ["ROSÉ", "Bruno Mars"], album: "Invasion of Privacy", listenCount: null, duration: "2:48", addDate: "12.03.2025" },
            { id: 14, num: 14, icon: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-29/5QmmXGdKTA.png", title: "When I Was Your Man", artists: ["Bruno Mars"], album: "Unorthodox Jukebox", listenCount: null, duration: "2:43", addDate: "12.03.2025" },
            { id: 15, num: 15, icon: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-29/VzC8Nj0Ck5.png", title: "Die With A Smile", artists: ["Lady Gaga", "Bruno Mars"], album: "Die With A Smile", listenCount: null, duration: "4:10", addDate: "12.03.2025" },
            { id: 16, num: 16, icon: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-29/UXXXykUcfn.png", title: "Shallow", artists: ["Lady Gaga", "Bradley Cooper"], album: "A Star Is Born Soundtrack", listenCount: null, duration: "2:43", addDate: "12.03.2024" },
            { id: 17, num: 17, icon: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-29/k36MLZyxCE.png", title: "Rockstar", artists: ["LISA"], album: "Alter Ego", listenCount: null, duration: "2:46", addDate: "14.02.2024" },
            { id: 18, num: 18, icon: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-29/6EJOz3XAFz.png", title: "Thunder", artists: ["LISA"], album: "Alter Ego", listenCount: null, duration: "2:42", addDate: "14.02.2024" },
          ]}
        /> */}

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
