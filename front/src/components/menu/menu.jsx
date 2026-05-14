import React from "react";
import "./menu.css";
import HomeIcon from "/Home.svg";
import MyMediatekIcon from "/MyMediatek.svg";
import HeartIcon from "/Heart.svg";
import PlaylistIcon from "/Playlist.svg";
import YourPlayListsIcon from "/YourPlayLists.svg";
import Lisa from "/Lisa.svg";
import BrunoMars from "/BrunoMars.svg";
import LadyGaga from "/LadyGaga.svg";
import LanaDelRey from "/LanaDelRey.svg";
import BTS from "/BTS.svg";
import SAD from "/sad.svg"
import Stream from "/List--Streamline-Mynaui.svg.svg"




function Sidebar() {
  return (
    <div className="sidebar-style">
      <h4 id="menu-title">Меню</h4>
      <div className="menu-item-home">
        <img id="HomeIcon" src={HomeIcon} />
        <h3>Головна</h3>
      </div>

      <div className="menu-item">
        <img src={MyMediatekIcon} alt="Library" className="img-style" />
        <h3>Моя медіатека</h3>
      </div>

      <div style={{ height: "1px", backgroundColor: "rgb(67, 110, 132)" }}></div>

      <div className="menu-item-playlists">
        <h4 >Плейлисти</h4>
      </div>

      <div className="menu-item">
        <img src={HeartIcon} alt="Playlist" className="img-style" />
        <h3>Улюблені треки</h3>
      </div>

      <div className="menu-item">
        <img src={PlaylistIcon} alt="Heart" className="img-style" />
        <h3>Створити плейлист</h3>
      </div>

      <div className="menu-item-your-playlists">
        <h3>Ваші плейлисти</h3>
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
      <div style={{ height: "1px", backgroundColor: "rgb(67, 110, 132)" }}></div>
      <h3 id="MenuEnd">Нещодавно прослуханi</h3>
      <img id="Stream" src={Stream} alt="" />
      <img id="SAD" src={SAD} alt="" />
    </div>
  );
}

export default Sidebar;
