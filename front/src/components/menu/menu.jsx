import React from "react";
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




function Sidebar() {
  return (
    <div className="sidebar-style">
      <h4 id="menu-title">Меню</h4>
      <div className="menu-item-home">
        <img id="HomeIcon" src={HomeIcon}/>
        <h7>Головна</h7>
      </div>

      <div className="menu-item">
      <img src={MyMediatekIcon} alt="Library" className="img-style" />
      <h7>Моя медіатека</h7>
      </div>

      <div style={{height: "1px", backgroundColor: "rgb(67, 110, 132)" }}></div>
      
      <div className="menu-item-playlists">
      <h4 >Плейлисти</h4>
      </div>
      
      <div className="menu-item">
      <img src={HeartIcon} alt="Playlist" className="img-style" />
      <h7>Улюблені треки</h7>
      </div>
      
      <div className="menu-item">
      <img src={PlaylistIcon} alt="Heart" className="img-style" />
      <h7>Створити плейлист</h7>
      </div>

      <div className="menu-item-your-playlists">
      <h7>Ваші плейлисти</h7>
      <img src={YourPlayListsIcon} alt="" className="img-style-your-playlists" />
      </div>

        <div id="playlist-style">
          <div className="playlist-item-style">
          <img src={Lisa} alt="Lisa" />
          <h4>Lisa</h4>
          <p>Виконавець</p>
          </div>
          
          <div className="playlist-item-style">
          <img src={BrunoMars} alt="Bruno Mars" />
          <h4>Bruno Mars</h4>
          <p>Виконавець</p>
          </div>  

          <div className="playlist-item-style">
          <img src={LadyGaga} alt="Lady Gaga" />
          <h4>Lady Gaga</h4>
          <p>Виконавець</p>
          </div>

          <div className="playlist-item-style">
          <img src={LanaDelRey} alt="Lana Del Rey" />
          <h4>Lana Del Rey</h4>
          <p>Виконавець</p>
          </div>

          <div className="playlist-item-style">
          <img src={BTS} alt="BTS" />
          <h4>BTS</h4>
          <p>Виконавець</p>
          </div>
        </div>
        <div style={{height: "1px", backgroundColor: "rgb(67, 110, 132)" }}></div>
    </div>
  );
}

export default Sidebar;