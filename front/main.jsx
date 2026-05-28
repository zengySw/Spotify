import ReactDOM from 'react-dom/client';
import './index.css';
import { StrictMode, useState, useEffect, useRef } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Outlet
} from 'react-router-dom';

import HeaderBar from "./src/components/header/header.jsx";
import FooterBar from "./src/components/Footer/footer.jsx";
import Menu from "./src/components/menu/menu.jsx";
import SidebarPlayer from "./src/components/player/sidebarPlayer.jsx";
import Player from "./src/components/player/player.jsx";

import Profile from "./src/App/Profile/Profile.jsx";
import Register from "./src/App/Register/Register.jsx";
import Step1 from "./src/App/Register/step1.jsx";
import Step2 from "./src/App/Register/step2.jsx";
import Login from "./src/App/Login/Login.jsx";
import Error from "./src/App/error404/Error.jsx";
import Settings from "./src/App/Settings/Settings.jsx";
import Main from "./src/App/Main.jsx";
import PlaylistP from "./src/App/Library/PlaylistP/PlaylistP.jsx";
import MediaListP from "./src/App/Library/MediaListP.jsx";
import Artist from "./src/App/Artist/Artist.jsx";

import useMusicPlayer, { MusicPlayerProvider } from "./src/hooks/useMusicPlayer";

import { searchMp3 } from './src/hooks/dataHooks.js';

const Root = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {
    current_track: currentTrack,
    is_playing: isPlaying,
    current_time: currentTime,
    duration,
    progress,
    volume,
    toggle_play: togglePlay,
    play_prev: playPrev,
    play_next: playNext,
    seek_by_percent: setSeekByPercent,
    set_volume: setVolume,
  } = useMusicPlayer();

  return (
    <div className="app">
      <HeaderBar menuOpen={isMenuOpen} setMenuOpen={setIsMenuOpen} />

      <div className="main-layout">
        <aside className="main-layout__menu">
          
          
          <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        </aside>

        <main className="main-layout__content">
          <Outlet />
        </main>

        <aside className="main-layout__sidebar">
          <SidebarPlayer
            track={currentTrack}
            onTogglePlay={togglePlay}
            onPrev={playPrev}
            onNext={playNext}
          />
        </aside>
      </div>

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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Root />} >
      <Route index element={<Main />} />
      <Route path='media' element={<MediaListP title="Моя медіатека" userId={0} />} />
      <Route path="media/playlist/:id" element={<PlaylistP />} />
      <Route path="profile" element={<Profile />} />
      <Route path="register" element={<Register />} />
      <Route path="step1" element={<Step1 />} />
      <Route path="step2" element={<Step2 />} />
      <Route path="login" element={<Login />} />
      <Route path="*" element={<Error />} />
      <Route path="settings" element={<Settings />} />
      <Route path="artist/:id" element={<Artist />} />

    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <MusicPlayerProvider>
    <RouterProvider router={router} />
  </MusicPlayerProvider>
);
