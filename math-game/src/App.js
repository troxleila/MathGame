import React from "react";
import Game from "./Game";
import Link from "react-router-dom";
import "./App.css";

function App() {
  state = {
    wins: null,
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>Pick Your Mode</h2>
        <GamePanel />
      </header>
    </div>
  );
}

export default App;
