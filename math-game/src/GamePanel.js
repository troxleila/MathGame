import React from "react";
import { useNavigate } from "react-router-dom";
import Game from "./Game";

function GamePanel() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="title">
        <h1>Pick Your Mode</h1>
      </div>
      <table>
        <td>
          <tr>
            <button className="btn" onClick={() => navigate("addition")}>
              +
            </button>
          </tr>
          <tr>
            <button className="btn" onClick={() => navigate("multiplication")}>
              x
            </button>
          </tr>
        </td>
        <td>
          <tr>
            <button className="btn" onClick={() => navigate("subtraction")}>
              -
            </button>
          </tr>
          <tr>
            <button className="btn" onClick={() => navigate("division")}>
              /
            </button>
          </tr>
        </td>
      </table>
    </div>
  );
}

export default GamePanel;
