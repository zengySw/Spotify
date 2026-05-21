import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Outlet,
  useParams
} from 'react-router-dom';

// import useMusicPlayer from "./src/hooks/useMusicPlayer.js";

import HeaderBar from "./src/components/header/header.jsx";
import FooterBar from "./src/components/Footer/footer.jsx";
import Menu from "./src/components/menu/menu.jsx";
import SidebarPlayer from "./src/components/player/sidebarPlayer.jsx";
import Player from "./src/components/player/player.jsx";
/* pages */
import Main from "./src/App/Main.jsx";
import PlaylistP from "./src/App/Library/PlaylistP/PlaylistP.jsx";
import MediaListP from "./src/App/Library/MediaListP.jsx";
import Profile from "./src/App/Profile/Profile.jsx";
import Login from "./src/App/Login/Login.jsx";
import Register from "./src/App/Register/Register.jsx";
import Settings from "./src/App/Settings/Settings.jsx";
import Error from "./src/App/error404/error.jsx";
import NewPass from "./src/App/ForgotPass/newPass.jsx";
import ForgotPass from "./src/App/ForgotPass/ForgotPass.jsx";

import { getPlaylistById } from './src/hooks/dataHooks.js';

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
          {/* <SidebarPlayer
            {...useMusicPlayer()}
          /> */}
        </aside>

      </div>

      <FooterBar />

      {/* <Player
        {...useMusicPlayer()}
      /> */}
    </div>
  );
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Root />} >
      <Route index element={<Main />} />
      <Route path='media' element={<MediaListP title="Моя медіатека" userId={0} />} />
      <Route path="media/playlist/:id" element={<PlaylistP />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);