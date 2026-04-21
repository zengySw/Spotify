import React from "react";

const sidebarStyle = {
  width: "280px",
  height: "100vh",
  backgroundColor: "rgba(13, 13, 13, 0.85)",
  color: "#fff",
  padding: "20px",
  position: "fixed",
  top: 0,
  left: 0

};

const playlistStyle = {
  width: "100%",
  marginTop: "10px",
  padding: "10px",
  

};
function Sidebar() {
  return (
    <div style={sidebarStyle}>
      <h2>Меню</h2>
      <div style={{ borderRadius: "20%" }}>
        <img src="../assets/imgs/Home.svg" alt="Home" style={{ width: "24px", height: "24px" }} />
        <h3>Головна</h3>
      </div>
      <img src="../assets/imgs/MyMediatek.svg" alt="Library" style={{ width: "24px", height: "24px" }} />
      <h3>Моя медіатека</h3>
      <div style={{ padding: "5px", border: "1px solid #426D83" }}></div>
      <h2>Плейлисти</h2>
      <img src="../assets/imgs/Heart.svg" alt="Heart" style={{ width: "24px", height: "24px" }} />
      <h3>Улюблені треки</h3>
      <img src="../assets/imgs/Playlist.svg" alt="Playlist" style={{ width: "24px", height: "24px" }} />
      <h3>Створити плейлист</h3>
      <h3>Ваші плейлисти</h3>
      <img src="../assets/imgs/YourPlayLists.svg" alt="" style={{ width: "24px", height: "24px" }} />
        <div style={playlistStyle}>
          <img src="" alt="" />
          <h4>Плейлист 1</h4>
          <p>Опис плейлиста 1</p>
          <img src="" alt="" />
          <h4>Плейлист 2</h4>
          <p>Опис плейлиста 2</p>
          <img src="" alt="" />
          <h4>Плейлист 3</h4>
          <p>Опис плейлиста 3</p>
          <img src="" alt="" />
          <h4>Плейлист 4</h4>
          <p>Опис плейлиста 4</p>
          <img src="" alt="" />
          <h4>Плейлист 5</h4>
          <p>Опис плейлиста 5</p>
        </div>
    </div>
  );
}

export default Sidebar;