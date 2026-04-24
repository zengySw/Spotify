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
      <h3>Меню</h3>
      <div className="menu-item-home">
        <img src={HomeIcon} style={{marginLeft: "12px"}} />
        <h7>Головна</h7>
      </div>

      <div className="menu-item">
      <img src={MyMediatekIcon} alt="Library" className="img-style" />
      <h7>Моя медіатека</h7>
      </div>

      <div style={{height: "1px", backgroundColor: "rgb(67, 110, 132)" }}></div>
      
      <div className="menu-item">
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

      <div className="menu-item" style={{color: "rgb(191, 237, 253)"}}>
      <h7>Ваші плейлисти</h7>
      <img src={YourPlayListsIcon} alt="" className="img-style" />
      </div>

        <div id="playlist-style">
          <div className="playlist-item-style">
          <img src={Lisa} alt="Lisa" />
          <h6>Плейлист 1</h6>
          <p>Опис плейлиста 1</p>
          </div>
          
          <div className="playlist-item-style">
          <img src={BrunoMars} alt="Bruno Mars" />
          <h6>Плейлист 2</h6>
          <p>Опис плейлиста 2</p>
          </div>

          <div className="playlist-item-style">
          <img src={LadyGaga} alt="Lady Gaga" />
          <h6>Плейлист 3</h6>
          <p>Опис плейлиста 3</p>
          </div>

          <div className="playlist-item-style">
          <img src={LanaDelRey} alt="Lana Del Rey" />
          <h6>Плейлист 4</h6>
          <p>Опис плейлиста 4</p>
          </div>

          <div className="playlist-item-style">
          <img src={BTS} alt="BTS" />
          <h6>Плейлист 5</h6>
          <p>Опис плейлиста 5</p>
          </div>
        </div>
    </div>
  );
}

export default Sidebar;