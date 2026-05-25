import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import HeaderBar from "./src/components/header/header.jsx";
import FooterBar from "./src/components/Footer/footer.jsx";
import Menu from "./src/components/menu/menu.jsx";
import Player from "./src/components/player/player.jsx";
import SidebarPlayer from "./src/components/player/sidebarPlayer.jsx";
import AppLayout from "./src/components/App/Main.jsx";
import HomePage from "./src/App/Main.jsx";
import MediaListP from "./src/App/Library/MediaListP.jsx";
import PlaylistP from "./src/App/Library/PlaylistP/PlaylistP.jsx";
import useMusicPlayer from "./src/hooks/useMusicPlayer.js";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const player = useMusicPlayer();

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

  return (
    <div className="app-shell">
      <HeaderBar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <AppLayout
        menu={<Menu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />}
        sidebar={
          <SidebarPlayer
            track={player.currentTrack}
            onTogglePlay={player.togglePlay}
            onPrev={player.playPrev}
            onNext={player.playNext}
          />
        }
      >
        <Routes>
          <Route path="/" element={<HomePage player={player} />} />
          <Route path="/media" element={<MediaListP title="Моя медіатека" />} />
          <Route path="/playlist" element={<PlaylistP />} />
          <Route path="/media/playlist/:id" element={<PlaylistP />} />
        </Routes>
      </AppLayout>
      <FooterBar />
      <Player
        track={player.currentTrack}
        isPlaying={player.isPlaying}
        currentTime={player.currentTime}
        duration={player.duration}
        progress={player.progress}
        volume={player.volume}
        onTogglePlay={player.togglePlay}
        onPrev={player.playPrev}
        onNext={player.playNext}
        onSeekPercent={player.setSeekByPercent}
        onVolumeChange={player.setVolume}
      />
    </div>
  );
}
