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
  const [menuOpen, setMenuOpen] = useState(false);
  const audioRef = useRef(new Audio());

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1280) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!menuOpen || window.innerWidth > 1280) return undefined;

    const prevOverflow = document.body.style.overflow;
    const onEsc = (e) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onEsc);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onEsc);
    };
  }, [menuOpen]);

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
      <HeaderBar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Main
        menu={<Menu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />}
        sidebar={
          <SidebarPlayer
            track={currentTrack}
            onTogglePlay={togglePlay}
            onPrev={playPrev}
            onNext={playNext}
          />
        }
      >
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
        <ArtistCard name="Shakira" icon="https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-24/aXe0vJZ72q.png" followers="4 690 563" key="a3" />,
        <ArtistCard name="Jennifer Lopez" icon="https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-14/jJLgPEaOGQ.png" followers="4 690 563" key="a4" />,
        <ArtistCard name="Lana Del Rey" icon="https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-14/jJLgPEaOGQ.png" followers="4 690 563" key="a5" />,
        <ArtistCard name="Lady Gaga" icon="https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-14/n8SOennME3.png" followers="4 690 563" key="a6" />,
        <ArtistCard name="Shakira" icon="https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-24/aXe0vJZ72q.png" followers="4 690 563" key="a7" />,
        <ArtistCard name="Jennifer Lopez" icon="https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-14/jJLgPEaOGQ.png" followers="4 690 563" key="a8" />,
      ]} />
      <OnePList title={<h4>Нові релізи <span style={{ color: '#40a2ff' }}>подкастів</span></h4>} childs={[
        <PodcastCard icon="https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-24/OE8kDcEH8q.png" title="Частина 1. Хроніки майбутнього" episode_name="Consectetur adipiscing elit quisque faucibus" date="Лип. 2024" duration="5 год. 22 хв." description="«Яким буде світ за 50 років? Чи станемо ми кіборгами? Чи можлива колонізація Марса? Ми розбираємо найновіші відкриття, дослідження та гіпотези, які можуть зробити майбутнє ще більш непередбачуваним..»" key="p1" />,
        <PodcastCard icon="https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-24/Wu0dojYbUR.png" title="Частина 10. Тіньові справи" episode_name="Consectetur adipiscing elit quisque faucibus" date="Лип. 2024" duration="5 год. 22 хв." description="«Реальні кримінальні історії, що лякають своєю жорстокістю та загадковістю. Ми аналізуємо резонансні злочини, розбираємо деталі розслідувань і намагаємось зрозуміти, що рухає злочинцями. У кожному випуску — розбір нових справ: від зникнень до серійних убивств.»" key="p2" />,
        <PodcastCard icon="https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-24/rr39sNXLJ6.png" title="Частина 1. Теорії змови" episode_name="Consectetur adipiscing elit quisque faucibus" date="Лип. 2024" duration="5 год. 22 хв." description="«Від таємного уряду до фейкової висадки на Місяць. Ми аналізуємо найпопулярніші теорії змови, шукаємо докази та розбираємося, що з цього — реальність, а що — вигадка.»" key="p3" />
      ]} />
      <OnePList title={<h4>Нові релізи <span style={{ color: '#40a2ff' }}>Аудиокниг</span></h4>} childs={[
        <AudioBookCard icon="https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-24/Mie3QZhhXd.png" title="Тінь минулого" author="Хоппінс Нілл" genres={["Історичний роман", "Драма"]} description={`Під час холодної осені 1921 року, в невеликому гірському містечку, загубленому серед Карпат, молодий лікар Арсен випадково рятує від смерті незнайому жінку. Вона з'явилася нізвідки, не пам’ятає свого імені, а її руки вкриті старими, ніби ритуальними шрамами. Єдине, що вона вимовляє крізь гарячковий шепіт, — це слова про \"Тінь\", яка прийде за нею.`} date="Серп. 2023" duration="12 год. 22 хв." key="ab1" />,
        <AudioBookCard icon="https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-28/nkYeuNvuMn.png" title="Остання надія" author="NewTree" genres={["Драма", "Сучасна проза"]} description={`П’ятеро друзів з дитинства опинилися на життєвому роздоріжжі. Хтось бореться з залежностями, хтось не може пробачити собі старі помилки, а хтось більше не вірить у майбутнє. Але старий лист, знайдений у коробці спогадів, змушує їх знову зібратися разом, щоб відновити те, що вони втратили багато років тому.`} date="Серп. 2023" duration="12 год. 22 хв." key="ab2" />,
        <AudioBookCard icon="https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-28/U8UH4ctrZr.png" title="Голоси снів" author="Аманда Т." genres={["Психологічний трилер"]} description={`Психотерапевт Андрій починає чути голоси своїх пацієнтів у снах. Вони розповідають йому про події, які ще не відбулися, але невдовзі стають реальністю. Він розуміє, що його дар — це не благословення, а прокляття, і тепер йому потрібно знайти, хто стоїть за цими жахіттями.`} date="Серп. 2023" duration="12 год. 22 хв." key="ab3" />
      ]} flexDirection="column" />
      </Main>
      <FooterBar />
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
