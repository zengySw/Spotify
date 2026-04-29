import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Main from "./Components/App/Main";
import Playlist from "./Components/App/Library/Playlist/Playlist";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <Main /> */}
    <Playlist
      name="Мій плейлист"
      icon="https://i.pinimg.com/564x/1c/8e/0b/1c8e0b9a7d2f5a3c9e4b6c9e5f1a2b.jpg"
      author={{ name: "Автор плейлиста", icon: "https://i.pinimg.com/564x/1c/8e/0b/1c8e0b9a7d2f5a3c9e4b6c9e5f1a2b.jpg" }}
      tracks={[
        {
          id, num, icon, title, artists, alboum, listenCount, duration, addDate
          
        }
      ]}
    />
  </StrictMode>
);
