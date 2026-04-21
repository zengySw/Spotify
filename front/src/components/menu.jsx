import React from "react";

const sidebarStyle = {
  width: "280px",
  height: "100vh",
  backgroundColor: "rgba(13, 13, 13, 0.85)",
  color: "#fff",
  padding: "20px",
  oppacity: "75%",
};

function Sidebar() {
  return (
    <div style={sidebarStyle}>
      <h2>Меню</h2>
      <div style={{ borderRadius: "20%" }}>
        <img src="../assets/imgs/Home.svg" alt="Home" />
        <h3>Головна</h3>
      </div>
      <img src="../assets/imgs/MyMediatek.svg" alt="Library" />
      <h3>Моя медіатека</h3>
      
      </div>
  );
}

export default Sidebar;