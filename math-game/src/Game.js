import React from "react";
import { useState, useEffect } from "react";
import { GameLogic } from "./GameLogic";

function Game(operator) {
  const [lives, setLives] = useState(3);
  const [win, setWin] = useState(false);
  const [numbers, setNumbers] = useState([]);
  const [selected, setSelected] = useState([]);
  const MULTIPLIER = 20;

  useEffect(() => {
    generateNumbers();
  }, []);

  // Event handlers or other methods
  function handleClick() {
    // Handle button click or any other event
  }

  function checkNumber(number) {
    return true;
  }

  function generateNumbers() {
    let numbersWorking = [];
    for (let i = 0; i < 16; i++) {
      let newNumber = Math.round(Math.random() * MULTIPLIER);
      numbersWorking.push({ i, newNumber });
    }

    if (!checkPossibilityOfSuccess(numbersWorking)) {
      console.log("this?");
      generateNumbers();
    }
    setNumbers(numbersWorking);
  }

  function checkPossibilityOfSuccess(numbersChecking) {
    const gameLogic = GameLogic(numbersChecking, operator);
    console.log("between");
    return gameLogic.possibilityOfSuccess();
  }

  function answerSelected(event) {
    const value = event.currentTarget.getAttribute("value");
  }

  return (
    <div class="container" id="answerChoices">
      {numbers.map((number) => (
        <div class="cell" id={number[0]}>
          <button onClick={answerSelected} value={number[1]}>
            {number[1]}
          </button>
        </div>
      ))}
    </div>
  );
}

export default Game;
