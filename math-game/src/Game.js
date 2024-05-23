import React from "react";
import { useState, useEffect } from "react";
import { GameLogic } from "./GameLogic";
import { Arithmetic } from "./Arithmetic";

function Game(operator) {
  const [lives, setLives] = useState(3);
  const [points, setPoints] = useState(0);
  const [numbers, setNumbers] = useState([]);
  const [itemColor, setItemColor] = useState({});
  const [selected, setSelected] = useState(0);
  const [counter, setCounter] = useState(60);
  const MULTIPLIER = 10;
  const UNSELECTED_COLOR = '#D3D3D3';
  const SELECTED_COLOR = '#85A1EF';

  useEffect(() => {
    resetBoard();
    setLives(3);
    setPoints(0);
    openModal();
  }, []);

  useEffect(() => {
    console.log(selected);
    if (selected === 3) {
        checkAnswer();
    }
  }, [selected]);

  useEffect(() => {
    console.log("lives", lives);
    if (lives === 0) {
        alert("Better luck next time!");
    }
  }, [lives]);

  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);

  function resetBoard() {
    generateNumbers();
    setSelected(0);
    for (let i = 0; i < 16; i++) {
        let updatedValue = {[i]: UNSELECTED_COLOR};
        setItemColor(items => ({
            ...items,
            ...updatedValue
        }));
    }
  }

  async function checkAnswer() {
    const gameLogic = GameLogic(numbers, operator);
    let selectedAnswerIndex = [];
    let selectedAnswer = [];
    for (const key in itemColor) {
        if (itemColor[key] === SELECTED_COLOR) {
            selectedAnswerIndex = [...selectedAnswerIndex, Number(key)];
            selectedAnswer = [...selectedAnswer, numbers[Number(key)]["newNumber"]];
        }
    }
    console.log(selectedAnswerIndex);
    console.log(selectedAnswer);
    if (gameLogic.correctAnswer(selectedAnswerIndex)) {
        setPoints(points + 100);
        await delay(400);
        resetBoard();
    } else {
        
        setLives(lives - 1);
    };
  }

  const delay = (delayInms) => {
    return new Promise(resolve => setTimeout(resolve, delayInms));
  };

  function closeModal() {
    const modal = document.querySelector("#instructionModal");
    setCounter(60);
    modal.close();
  }

  function openModal() {
    const modal = document.querySelector("#instructionModal");
    modal.showModal();
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
    const index = Number(event.currentTarget.getAttribute('index'));
    if (itemColor[index] === SELECTED_COLOR) {
        setItemColor({...itemColor, [index]: UNSELECTED_COLOR});
        setSelected(selected - 1);
    } else if (selected === 3) {
        alert("You can only pick 3 numbers at a time!");
    } else {
        setItemColor({...itemColor, [index]: SELECTED_COLOR});
        setSelected(selected + 1);
    }
  }

  return (
    <div>
        <h1>Welcome to {operator["operator"].charAt(0).toUpperCase() + operator["operator"].slice(1)}</h1>
        <dialog id="instructionModal" class="dialog">
            <h3>Instructions</h3>
            <p>
                This game is played by selecting three numbers that are all touching each other.
                The first two numbers selected must together equal the 3rd number when your selected
                operator is used <br/><br/>
                Collect as many points as you can within the 60 second timer <br/><br/>
                3 mistakes are allowed before your attempt is ended for you
            </p>
            <button id="closeModal" class="dialog-close-btn" onClick={closeModal}>Close</button>
        </dialog>
        <div className="displayBoard">
            <p className="pointsBlock">Countdown: {counter} seconds <br/> Points: {points}</p>
            <p className="livesBlock"> <br/> Lives: {lives}</p>
        </div>
        <div className="game-board" id="answerChoices">
        {numbers.map((number) => (
            <div className="cell" key={number["i"]} style={{backgroundColor: itemColor[number["i"]]}}>
                <button key={number["i"]} index={number["i"]} onClick={answerSelected} value={number["newNumber"]}>
                    {number["newNumber"]}
                </button>
            </div>
        ))}
        </div>
    </div>
  );
}

export default Game;
