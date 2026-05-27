import { useEffect, useRef, useState } from "react";
import { searchMp3 } from "./dataHooks";


function normalize_tracks(data) {

const API_URL = '/spotify/tracks';

function normalizeTracks(data) {

  if (Array.isArray(data)) return data;
  return data?.results || data?.tracks || [];
}

export default function useMusicPlayer() {
  const [tracks, setTracks] = useState([]);
  const [current_idx, setCurrentIdx] = useState(-1);
  const [play_key, setPlayKey] = useState(0); // форс-тригер если idx не меняется
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

  // Синхронизируем рефы сразу при изменении стейта
  useEffect(() => { tracks_ref.current = tracks; }, [tracks]);
  useEffect(() => { current_idx_ref.current = current_idx; }, [current_idx]);


  useEffect(() => {
    const audio = audio_ref.current;



  // useEffect(() => {
  //   const params = new URLSearchParams({
  //     client_id: CLIENT_ID,
  //     format: "json",
  //     limit: 50,
  //   });

  //   fetch(`${API_URL}/?${params}`)
  //     .then((r) => r.json())
  //     .then((data) => {
  //       setTracks(normalizeTracks(data));
  //       setLoading(false);
  //     })
  //     .catch(() => {
  //       setError("Failed to load tracks.");
  //       setLoading(false);
  //     });
  // }, []);







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

      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [tracks.length]);







  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    if (currentIdx < 0 || !tracks[currentIdx]) return;

    const audio = audioRef.current;
    audio.src = `http://localhost:3000/audio?id=${tracks[currentIdx].id}`;
    audio
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false));
  }, [currentIdx, tracks]);





  useEffect(() => {
    return () => {
      const audio = audioRef.current;
      audio.pause();
      audio.src = "";

    };
  }, []);

  useEffect(() => {
    audio_ref.current.volume = volume;
  }, [volume]);

  // Главный эффект воспроизведения
  useEffect(() => {
    if (current_idx < 0) return;

    // tracks_ref.current уже обновлён синхронно в set_tracks
    const track = tracks_ref.current[current_idx];
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
            artist: track.artists?.[0] ?? track.artist ?? "",
          });

          if (cancelled) return;

          
          console.warn(`[Player] skipping "${track.title}" — not found on Audius`);
          console.warn(`[Player] skipping "${track.title}" — not found on Audius`);

          mp3_url = result.mp3;

          // Кэшируем чтобы не искать повторно
          tracks_ref.current = tracks_ref.current.map((t, i) =>
            i === current_idx ? { ...t, mp3: mp3_url } : t
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
  }, [current_idx, play_key]); // play_key — чтобы перезапустить если idx уже 0

  const toggle_play = () => {
    const audio = audio_ref.current;
    if (!tracks.length) return;

    if (current_idx < 0) {
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
    const idx =
      typeof track_or_index === "number"
        ? track_or_index
        : tracks.findIndex((t) => String(t.id) === String(track_or_index));

    if (idx < 0) return;
    if (idx === current_idx) { toggle_play(); return; }
    setCurrentIdx(idx);
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
    const normalized = normalize_tracks(new_tracks);

    // Обновляем ref синхронно ДО setCurrentIdx, 
    // иначе эффект сработает раньше чем стейт обновится
    tracks_ref.current = normalized;
    setTracks(normalized);

    if (current_idx_ref.current === start_idx) {
      // idx не изменится — эффект не перезапустится без play_key
      setPlayKey((k) => k + 1);
    } else {
      setCurrentIdx(start_idx);
    }
  };

  return {
    tracks,
    current_idx,
    is_playing,
    progress,
    duration,
    current_time,
    volume,
    loading,
    error,
    current_track: tracks[current_idx] ?? null,
    toggle_play,
    play_track,
    play_prev,
    play_next,
    seek_by_percent,
    set_volume: setVolume,
    add_track,
    set_tracks,
  };
}