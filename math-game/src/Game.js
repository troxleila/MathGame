import React from "react";
import { useState, useEffect } from "react";
import { GameLogic } from "./GameLogic";
import { Arithmetic } from "./Arithmetic";

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
    let startingNumbers = [];
    const combiner = Arithmetic(operator);
    for (let i = 0; i < 8; i++) {
        let newNumber = Math.round(Math.random() * MULTIPLIER);
        startingNumbers.push(newNumber)
        for (let j = i-1; j >= 0; j--) {
            startingNumbers.push(combiner.operate(newNumber, startingNumbers[j]));
        }
    }
    console.log("Number Options");
    console.log(startingNumbers);
    for (let i = 0; i < 16; i++) {
      let whichNumberIndex = Math.round(Math.random() * (startingNumbers.length-1));
      let newNumber = startingNumbers[whichNumberIndex];
      numbersWorking.push({ i, newNumber });
    }

    if (!checkPossibilityOfSuccess(numbersWorking)) {
      generateNumbers();
    }
    console.log("FINAL NUMBERS");
    console.log(numbersWorking);
    setNumbers(numbersWorking);
  }

  function checkPossibilityOfSuccess(numbersChecking) {
    const gameLogic = GameLogic(numbersChecking, operator);
    return gameLogic.possibilityOfSuccess();
  }

  function answerSelected(event) {
    const value = event.currentTarget.value;
    console.log(event.currentTarget);
    console.log(value);
    console.log(selected.includes(value));
    if (!selected.includes(value)) {
        setSelected([...selected, value]);
    } else {
        setSelected((state) => state.filter((item) => item !== value));
    }
    console.log(selected);
    event.currentTarget.style.backgroundColor = (!selected.includes(value)) ? 'red' : 'green';
  }

  return (
    <div>
        <header>Welcome to {operator["operator"]}</header>
        <div class="container" id="answerChoices">
        {numbers.map((number) => (
            <div class="cell" key={number["i"]}>
            <button class="numberOption" key={number["i"]} onClick={answerSelected} value={number["newNumber"]}>
                {number["newNumber"]}
            </button>
            </div>
        ))}
        </div>
    </div>
  );
}

export default Game;
