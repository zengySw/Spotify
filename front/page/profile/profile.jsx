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

export default function App() {

  <div>
    <HeaderBar />
    <Menu />



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
}
