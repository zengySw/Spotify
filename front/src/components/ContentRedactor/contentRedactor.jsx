import React from "react";
import { Draggable } from "../../../node_modules/react-draggable";
import "./contentRedactor.css";


export default function ContentRedactor() {
  return (
    <Draggable bounds="parent">
      <div
        style={{
          width: "200px",
          height: "100px",
          backgroundColor: "#426D83",
          borderRadius: "10px",
          cursor: "grab",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        Перемещаемый блок
      </div>
    </Draggable>
  );
}