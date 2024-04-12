import React from "react";
import Game from "./Game";
import GamePanel from "./GamePanel";
import NoMatch from "./NoMatch";
import { Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path="/" element={<GamePanel />} />
          <Route path="/addition" element={<Game operator="addition" />} />
          <Route
            path="/multiplication"
            element={<Game operator="multiplication" />}
          />
          <Route
            path="/subtraction"
            element={<Game operator="subtraction" />}
          />
          <Route path="/division" element={<Game operator="division" />} />
          <Route path="/division" element={<Game operator="division" />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
