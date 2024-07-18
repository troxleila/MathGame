import React from "react";
import { useState, useEffect } from "react";
import { GameLogic } from "./GameLogic";
import { generateBoard } from "./BoardGeneration";
import Modal from "./Components/Modal";
import CountdownTimer from "./Components/CountdownTimer";
import Header from "./Components/Header";

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
  const UNSELECTED_COLOR = "#D3D3D3";
  const SELECTED_COLOR = "#85A1EF";
  const WRONG_COLOR = "#e02b2b";
  const CORRECT_COLOR = "#36de15";

  useEffect(() => {
    resetBoard();
    setLives(3);
    setPoints(0);
  }, []);

  useEffect(() => {
    if (selected === 3) {
      checkAnswer();
      unselectColors();
    }
  }, [selected]);

  useEffect(() => {
    if (lives === 0) {
      setGameOver(true);
    }
  }, [lives]);

  useEffect(() => {
    console.log("Time out!");
    if (timeOut === true) {
      setGameOver(true);
      setShowInstructions(false);
    }
  }, [timeOut]);

  const hideModal = () => {
    if (showInstructions === true) {
      setShowInstructions(false);
      setStartTimer(true);
    } else if (gameOver === true) {
      console.log("in game over");
      setGameOver(false);
      resetBoard();
      setLives(3);
      setPoints(0);
      setRestart(!restart);
      setStartTimer(false);
      setTimeOut(false);
    }
  };

  async function unselectColors() {
    await delay(300);
    setSelected(0);
    for (let i = 0; i < 16; i++) {
      let updatedValue = { [i]: UNSELECTED_COLOR };
      setItemColor((items) => ({
        ...items,
        ...updatedValue,
      }));
    }
  }

  function resetBoard() {
    unselectColors();
    setNumbers(generateBoard(operator));
  }

  async function checkAnswer() {
    const gameLogic = GameLogic(numbers, operator);
    let selectedAnswerIndex = [];
    let selectedAnswer = [];
    for (const key in itemColor) {
      if (itemColor[key] === SELECTED_COLOR) {
        selectedAnswerIndex = [...selectedAnswerIndex, Number(key)];
        selectedAnswer = [...selectedAnswer, numbers[Number(key)]["value"]];
      }
    }
    console.log(selectedAnswerIndex);
    console.log(selectedAnswer);
    if (gameLogic.correctAnswer(selectedAnswerIndex)) {
      setPoints(points + 100);
      flashColor(true);
      await delay(400);
      resetBoard();
    } else {
      flashColor(false);
      setLives(lives - 1);
    }
  }

  function flashColor(answerType) {
    const flashColor = answerType ? CORRECT_COLOR : WRONG_COLOR;
    for (let i = 0; i < 16; i++) {
      let updatedValue = { [i]: UNSELECTED_COLOR };
      if (itemColor[i] === SELECTED_COLOR) {
        updatedValue = { [i]: flashColor };
      }
      setItemColor((items) => ({
        ...items,
        ...updatedValue,
      }));
    }
  }

  const delay = (delayInms) => {
    return new Promise((resolve) => setTimeout(resolve, delayInms));
  };

  function answerSelected(event) {
    const index = Number(event.currentTarget.getAttribute("index"));
    if (itemColor[index] === SELECTED_COLOR) {
      setItemColor({ ...itemColor, [index]: UNSELECTED_COLOR });
      setSelected(selected - 1);
    } else if (selected !== 3) {
      setItemColor({ ...itemColor, [index]: SELECTED_COLOR });
      setSelected(selected + 1);
    }
  }

  return (
    <div>
      <Modal
        show={showInstructions}
        handleClose={hideModal}
        homeOptionHidden={true}
      >
        <p>
          This game is played by selecting three numbers that are all touching
          each other. The first two numbers selected must together equal the 3rd
          number when your selected operator is used <br />
          <br />
          Collect as many points as you can within the 60 second timer <br />
          <br />3 mistakes are allowed before your attempt is ended for you
        </p>
      </Modal>
      <Modal show={gameOver} handleClose={hideModal} homeOptionHidden={false}>
        <h2>
          Game Over! <br />
          <br /> You scored {points} points!
        </h2>
      </Modal>
      <div class={`page-width ${showInstructions || gameOver ? "dimmed" : ""}`}>
        <Header />
      </div>

      <h1 style={{ marginTop: "30px", marginBottom: "20px" }}>
        Welcome to{" "}
        {operator["operator"].charAt(0).toUpperCase() +
          operator["operator"].slice(1)}
      </h1>
      {console.log("Game over status:")}
      {console.log(gameOver)}
      {console.log("Time out status:")}
      {console.log(timeOut)}
      {console.log("Timer going?")}
      {console.log(startTimer)}
      <div className="displayBoard">
        <div className="pointsBlock">
          <CountdownTimer
            initialSeconds={60}
            setTimeOut={setTimeOut}
            restart={restart}
            start={startTimer}
          />
          <p>Points: {points}</p>
        </div>
        <p className="livesBlock">
          {" "}
          <br /> Lives: {lives}
        </p>
      </div>
      <div className="game-board" id="answerChoices">
        {numbers.map((number) => (
          <div
            className="cell"
            key={number["i"]}
            style={{ backgroundColor: itemColor[number["i"]] }}
          >
            <button
              key={number["i"]}
              index={number["i"]}
              onClick={answerSelected}
              value={number["value"]}
            >
              {number["value"]}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Game;
