﻿import ReactDOM from 'react-dom/client';
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

// profile
import Profile from "./src/App/Profile/Profile.jsx";
import Register from "./src/App/Register/Register.jsx";
import Login from "./src/App/Login/Login.jsx";
import Error from "./src/App/error404/Error.jsx";
import Settings from "./src/App/Settings/Settings.jsx";
import Main from "./src/App/Main.jsx";
import PlaylistP from "./src/App/Library/PlaylistP/PlaylistP.jsx";
import MediaListP from "./src/App/Library/MediaListP.jsx";

import { getPlaylistById } from './src/hooks/dataHooks.js';

const Root = () => {

  return (
    <div className="app">
      <HeaderBar />

      <div className="main-layout">

        <aside className="main-layout__menu">
          <Menu />
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
      <Route path="playlist" element={<PlaylistP {...getPlaylistById(1)} />} />
      <Route path="profile" element={<Profile />} />
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route path="error" element={<Error />} />
      <Route path="settings" element={<Settings />} />

    </Route>
  )
);