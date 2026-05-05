import HeaderBar from "./src/components/header/header.jsx";
import FooterBar from "./src/components/Footer/footer.jsx";
import Menu from "./src/components/menu/menu.jsx";
import Player from "./src/components/player/player.jsx";
import MainSidebarPlayer from "./src/components/player/MainSidebarPlayer.jsx";
import TrackList from "./src/components/tracks/TrackList.jsx";
import useMusicPlayer from "./src/hooks/useMusicPlayer.js";

const pageStyle = {
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
};

const contentStyle = {
  marginLeft: 280,
  paddingBottom: 88,
  paddingRight: 16,
  minHeight: "calc(100vh - 64px)",
  display: "flex",
  flexDirection: "column",
};

const mainRowStyle = { display: "flex", alignItems: "flex-start", gap: 16 };

export default function App() {
  const {
    tracks,
    currentIdx,
    isPlaying,
    progress,
    duration,
    currentTime,
    volume,
    loading,
    error,
    currentTrack,
    togglePlay,
    playTrack,
    playPrev,
    playNext,
    setSeekByPercent,
    setVolume,
  } = useMusicPlayer();

  return (
    <div style={pageStyle}>
      <HeaderBar />
      <Menu />

      <div style={contentStyle}>
        <div style={mainRowStyle}>
          <TrackList
            tracks={tracks}
            currentIdx={currentIdx}
            isPlaying={isPlaying}
            loading={loading}
            error={error}
            onPlayTrack={playTrack}
          />
          <MainSidebarPlayer track={currentTrack} onTogglePlay={togglePlay} onPrev={playPrev} onNext={playNext} />
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
