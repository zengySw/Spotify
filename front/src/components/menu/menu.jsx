import React, { useState } from "react";
import "./menu.css";
import HomeIcon from "../../assets/imgs/Home.svg";
import MyMediatekIcon from "../../assets/imgs/MyMediatek.svg";
import HeartIcon from "../../assets/imgs/Heart.svg";
import PlaylistIcon from "../../assets/imgs/Playlist.svg";
import YourPlayListsIcon from "../../assets/imgs/YourPlayLists.svg";
import Lisa from "../../assets/imgs/Lisa.svg";
import BrunoMars from "../../assets/imgs/BrunoMars.svg";
import LadyGaga from "../../assets/imgs/LadyGaga.svg";
import LanaDelRey from "../../assets/imgs/LanaDelRey.svg";
import BTS from "../../assets/imgs/BTS.svg";
import SAD from "../../assets/imgs/sad.svg"
import Stream from "../../assets/imgs/List--Streamline-Mynaui.svg.svg"




function Sidebar({ onSelectView }) {
  const [active, setActive] = useState("home");

  const handleSelect = (key, view) => {
    setActive(key);
    if (view && onSelectView) onSelectView(view);
  };

  return (
    <div className="sidebar-style">
      <h4 id="menu-title">Меню</h4>
      <div
        className={`menu-item-home ${active === "home" ? "active" : ""}`}
        role="button"
        tabIndex={0}
        onClick={() => handleSelect("home")}
        onKeyPress={(e) => { if (e.key === 'Enter') handleSelect("home"); }}
      >
        <img id="HomeIcon" src={HomeIcon}/>
        <h5>Головна</h5>
      </div>

      <div
        className={`menu-item ${active === "found" ? "active" : ""}`}
        role="button"
        tabIndex={0}
        onClick={() => handleSelect("found", "found")}
        onKeyPress={(e) => { if (e.key === 'Enter') handleSelect("found", "found"); }}
      >
        <img src={MyMediatekIcon} alt="Library" className="img-style" />
        <h5>Моя медіатека</h5>
      </div>

      <div style={{height: "1px", backgroundColor: "rgb(67, 110, 132)" }}></div>
      
      <div className="menu-item-playlists">
      <h4 >Плейлисти</h4>
      </div>
      
      <div
        className={`menu-item ${active === "tracks" ? "active" : ""}`}
        role="button"
        tabIndex={0}
        onClick={() => handleSelect("tracks", "tracks")}
        onKeyPress={(e) => { if (e.key === 'Enter') handleSelect("tracks", "tracks"); }}
      >
        <img src={HeartIcon} alt="Playlist" className="img-style" />
        <h5>Улюблені треки</h5>
      </div>
      
      <div className="menu-item">
      <img src={PlaylistIcon} alt="Heart" className="img-style" />
      <h5>Створити плейлист</h5>
      </div>

      <div className="menu-item-your-playlists">
      <h5>Ваші плейлисти</h5>
      <img src={YourPlayListsIcon} alt="" className="img-style-your-playlists" />
      </div>

        <div id="playlist-style">
          <div className="playlist-item-style">
          <img src={Lisa} alt="Lisa" />
          <div className="playlist-text">
          <h4>Lisa</h4>
          <p>Виконавець</p>
          </div>
          </div>
          
          <div className="playlist-item-style">
          <img src={BrunoMars} alt="Bruno Mars" />
          <div className="playlist-text">
          <h4>Bruno Mars</h4>
          <p>Виконавець</p>
          </div>  
          </div>

          <div className="playlist-item-style">
          <img src={LadyGaga} alt="Lady Gaga" />
          <div className="playlist-text">
          <h4>Lady Gaga</h4>
          <p>Виконавець</p>
          </div>
          </div>

          <div className="playlist-item-style">
          <img src={LanaDelRey} alt="Lana Del Rey" />
          <div className="playlist-text">
          <h4>Lana Del Rey</h4>
          <p>Виконавець</p>
          </div>
          </div>

          <div className="playlist-item-style">
          <img src={BTS} alt="BTS" />
          <div className="playlist-text">
          <h4>BTS</h4>
          <p>Виконавець</p>
          </div>
          </div>
        </div>
        <div style={{height: "1px", backgroundColor: "rgb(67, 110, 132)" }}></div>
        <h5 id="MenuEnd">Нещодавно прослуханi</h5>
        <img id="Stream" src={Stream} alt="" />
        <img id="SAD" src={SAD} alt="" />
    </div>
  );
}

export default Sidebar;