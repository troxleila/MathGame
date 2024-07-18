import React from "react";
import Game from "./Game";
import GamePanel from "./GamePanel";
import NoMatch from "./NoMatch";
import InProgress from "./InProgress.js";
import {
  ADDITION,
  SUBTRACTION,
  DIVISION,
  MULTIPLICATION,
} from "./constants.js";
import { Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path="/" element={<GamePanel />} />
          <Route path="/addition" element={<Game operator={ADDITION} />} />
          <Route
            path="/multiplication"
            element={<Game operator={MULTIPLICATION} />}
          />
          <Route
            path="/subtraction"
            element={<Game operator={SUBTRACTION} />}
          />
          <Route path="/division" element={<Game operator={DIVISION}/>} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
