import React from "react";
import { useState, useEffect, useRef } from "react";
import { GameLogic } from "./GameLogic";
import { Arithmetic } from "./Arithmetic";
import Modal from './Modal';
import HomeButton from "./HomeButton";
import CountdownTimer from "./CountdownTimer";

function Game(operator) {
  const [lives, setLives] = useState(3);
  const [points, setPoints] = useState(0);
  const [numbers, setNumbers] = useState([]);
  const [itemColor, setItemColor] = useState({});
  const [selected, setSelected] = useState(0);
  const [timeOut, setTimeOut] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [restart, setRestart] = useState(false);
  const [startTimer, setStartTimer] = useState(false);
  const MULTIPLIER = 10;
  const UNSELECTED_COLOR = '#D3D3D3';
  const SELECTED_COLOR = '#85A1EF';

  useEffect(() => {
    resetBoard();
    setLives(3);
    setPoints(0);
  }, []);

  useEffect(() => {
    if (selected === 3) {
        checkAnswer();
        // UNSELECT ANSWERS
    }
  }, [selected]);

  useEffect(() => {
    if (lives === 0) {
        setGameOver(true);
    }
  }, [lives]);

  useEffect(() => {
    console.log("Time out!")
    if (timeOut === true) {
        setGameOver(true);
    }
  }, [timeOut]);

  const hideModal = () => {
    if (showInstructions === true) {
        setShowInstructions(false);
        setStartTimer(true);
    } else if (gameOver === true) {
        setGameOver(false);
        resetBoard();
        setLives(3);
        setPoints(0);
        setRestart(!restart);
        setStartTimer(false);
    }
    
  };

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
        <Modal show={showInstructions} handleClose={hideModal} homeOption={false}>
            <p>
                This game is played by selecting three numbers that are all touching each other.
                The first two numbers selected must together equal the 3rd number when your selected
                operator is used <br/><br/>
                Collect as many points as you can within the 60 second timer <br/><br/>
                3 mistakes are allowed before your attempt is ended for you
            </p>
        </Modal>
        <Modal show={gameOver} handleClose={hideModal} homeOption={true}>
            <h2>
                Game Over! <br/><br/> You scored {points} points!
            </h2>
        </Modal>
        {console.log("Game over status:")}
        {console.log(startTimer)}
        <HomeButton hidden={startTimer}/>
        <div className="displayBoard">
            <div className="pointsBlock">
                <CountdownTimer initialSeconds={10} setTimeOut={setTimeOut} restart={restart} start={startTimer}/>
                <p>Points: {points}</p>
            </div>
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
