import { useEffect, useRef, useState, createContext, useContext } from "react";
import { searchMp3 } from "./dataHooks";

function normalizeTracks(data) {
  if (Array.isArray(data)) return data;
  return data?.results || data?.tracks || [];
}

// 1. Создаем контекст для глобального состояния
const MusicPlayerContext = createContext(null);

// 2. Создаем Провайдер, который обернет всё приложение
export function MusicPlayerProvider({ children }) {
  const [tracks, setTracks] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(-1);
  const [play_key, setPlayKey] = useState(0);
  const [is_playing, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [current_time, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const audio_ref = useRef(new Audio());
  const tracks_ref = useRef([]);
  const current_idx_ref = useRef(-1);

  useEffect(() => { tracks_ref.current = tracks; }, [tracks]);
  useEffect(() => { current_idx_ref.current = currentIdx; }, [currentIdx]);

  // Аудио-события
  useEffect(() => {
    const audio = audio_ref.current;

    const handle_time_update = () => {
      setCurrentTime(audio.currentTime || 0);
      setDuration(audio.duration || 0);
      setProgress(audio.duration ? (audio.currentTime / audio.duration) * 100 : 0);
    };

    const handle_metadata = () => setDuration(audio.duration || 0);

    const handle_ended = () => {
      const all = tracks_ref.current;
      if (!all.length) { setIsPlaying(false); return; }
      setCurrentIdx((i) => (i + 1) % all.length);
    };

    const handle_error = () => {
      console.error("Audio error, skipping...");
      const all = tracks_ref.current;
      if (all.length) setCurrentIdx((i) => (i + 1) % all.length);
    };

    audio.addEventListener("timeupdate", handle_time_update);
    audio.addEventListener("loadedmetadata", handle_metadata);
    audio.addEventListener("ended", handle_ended);
    audio.addEventListener("error", handle_error);

    return () => {
      audio.removeEventListener("timeupdate", handle_time_update);
      audio.removeEventListener("loadedmetadata", handle_metadata);
      audio.removeEventListener("ended", handle_ended);
      audio.removeEventListener("error", handle_error);
    };
  }, []);

  // Громкость
  useEffect(() => {
    audio_ref.current.volume = volume;
  }, [volume]);

  // Размонтирование
  useEffect(() => {
    return () => {
      const audio = audio_ref.current;
      audio.pause();
      audio.src = "";
    };
  }, []);

  // Главный эффект воспроизведения
  useEffect(() => {
    if (currentIdx < 0) return;

    const track = tracks_ref.current[currentIdx];
    if (!track) return;

    let cancelled = false;
    const audio = audio_ref.current;

    audio.pause();

    const load_and_play = async () => {
      setLoading(true);
      setError(null);
      setProgress(0);
      setCurrentTime(0);

      try {
        let mp3_url = track.mp3;

        if (!mp3_url) {
          const result = await searchMp3({
            title: track.title,
            artist: track.artists?.[0] ?? track.artist?.name ?? track.artist ?? "",
          });

          if (cancelled) return;

          if (!result?.mp3) {
            console.warn(`[Player] skipping "${track.title}" — not found`);
            const all = tracks_ref.current;
            if (all.length > 1) {
              setCurrentIdx((i) => (i + 1) % all.length);
            } else {
              setIsPlaying(false);
            }
            return;
          }

          mp3_url = result.mp3;

          tracks_ref.current = tracks_ref.current.map((t, i) =>
            i === currentIdx ? { ...t, mp3: mp3_url } : t
          );
          setTracks([...tracks_ref.current]);
        }

        if (cancelled) return;

        audio.src = mp3_url;
        await audio.play();

        if (!cancelled) setIsPlaying(true);
      } catch (err) {
        if (!cancelled) {
          console.error(err);
          setIsPlaying(false);
          setError(err.message ?? "Ошибка воспроизведения");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load_and_play();
    return () => { cancelled = true; };
  }, [currentIdx, play_key]);

  const toggle_play = () => {
    const audio = audio_ref.current;
    if (!tracks.length) return;

    if (currentIdx < 0) {
      setCurrentIdx(0);
      return;
    }

    if (is_playing) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  const play_track = (track_or_index) => {
    if (typeof track_or_index === "number") {
      if (track_or_index < 0) return;
      if (track_or_index === currentIdx) { toggle_play(); return; }
      setCurrentIdx(track_or_index);
      return;
    }

    const existing_idx = tracks_ref.current.findIndex(
      (t) => String(t.id) === String(track_or_index.id)
    );

    if (existing_idx >= 0) {
      if (existing_idx === current_idx_ref.current) { toggle_play(); return; }
      setCurrentIdx(existing_idx);
    } else {
      const new_tracks = [...tracks_ref.current, track_or_index];
      tracks_ref.current = new_tracks;
      setTracks(new_tracks);
      setCurrentIdx(new_tracks.length - 1);
    }
  };

  const play_prev = () => {
    if (!tracks.length) return;
    setCurrentIdx((i) => (i <= 0 ? tracks.length - 1 : i - 1));
  };

  const play_next = () => {
    if (!tracks.length) return;
    setCurrentIdx((i) => (i + 1) % tracks.length);
  };

  const seek_by_percent = (percent) => {
    const audio = audio_ref.current;
    if (!audio.duration) return;
    audio.currentTime = (Math.max(0, Math.min(100, percent)) / 100) * audio.duration;
  };

  const add_track = (track_or_tracks) => {
    const new_tracks = Array.isArray(track_or_tracks) ? track_or_tracks : [track_or_tracks];
    setTracks((prev) => {
      const updated = [...prev, ...new_tracks];
      tracks_ref.current = updated;
      return updated;
    });
  };

  const set_tracks = (new_tracks, start_idx = 0) => {
    const normalized = normalizeTracks(new_tracks);
    tracks_ref.current = normalized;
    setTracks(normalized);

    if (current_idx_ref.current === start_idx) {
      setPlayKey((k) => k + 1);
    } else {
      setCurrentIdx(start_idx);
    }
  };

  // 3. Передаем все данные и функции в Контекст
  return (
    <MusicPlayerContext.Provider
      value={{
        tracks,
        currentIdx,
        is_playing,
        progress,
        duration,
        current_time,
        volume,
        loading,
        error,
        current_track: tracks[currentIdx] ?? null,
        toggle_play,
        play_track,
        play_prev,
        play_next,
        seek_by_percent,
        set_volume: setVolume,
        add_track,
        set_tracks,
      }}
    >
      {children}
    </MusicPlayerContext.Provider>
  );
}

// 4. Твой старый хук теперь просто читает данные из глобального Контекста
export default function useMusicPlayer() {
  return useContext(MusicPlayerContext);
}