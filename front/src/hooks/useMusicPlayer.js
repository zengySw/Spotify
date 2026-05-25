import { useEffect, useRef, useState } from "react";

const API_URL =
  "https://uwupad.me/music/api/music?limit=50&offset=0&sort_by=fyp&period=all_time&geo=global";

function normalizeTracks(data) {
  if (Array.isArray(data)) return data;
  return data?.data || data?.items || data?.tracks || [];
}

export default function useMusicPlayer() {
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
      .then((data) => {
        setTracks(normalizeTracks(data));
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load tracks.");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime || 0);
      setDuration(audio.duration || 0);
      setProgress(audio.duration ? (audio.currentTime / audio.duration) * 100 : 0);
    };

    const handleMetadata = () => {
      setDuration(audio.duration || 0);
      setProgress(audio.duration ? (audio.currentTime / audio.duration) * 100 : 0);
    };

    const handleEnded = () => {
      if (!tracks.length) {
        setIsPlaying(false);
        return;
      }
      setCurrentIdx((idx) => (idx + 1) % tracks.length);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
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

  const playTrack = (trackOrIndex) => {
    const idx =
      typeof trackOrIndex === "number"
        ? trackOrIndex
        : tracks.findIndex((track) => String(track.id) === String(trackOrIndex));

    if (idx < 0) return;

    if (idx === currentIdx) {
      togglePlay();
      return;
    }
    setCurrentIdx(idx);
  };

  const playPrev = () => {
    if (!tracks.length) return;
    setCurrentIdx((idx) => (idx <= 0 ? tracks.length - 1 : idx - 1));
  };

  const playNext = () => {
    if (!tracks.length) return;
    setCurrentIdx((idx) => (idx + 1) % tracks.length);
  };

  const setSeekByPercent = (percent) => {
    const audio = audioRef.current;
    if (!audio.duration) return;
    const safePercent = Math.max(0, Math.min(100, percent));
    audio.currentTime = (safePercent / 100) * audio.duration;
  };

  return {
    tracks,
    currentIdx,
    isPlaying,
    progress,
    duration,
    currentTime,
    volume,
    loading,
    error,
    currentTrack: tracks[currentIdx] || null,
    togglePlay,
    playTrack,
    playPrev,
    playNext,
    setSeekByPercent,
    setVolume,
  };
}
