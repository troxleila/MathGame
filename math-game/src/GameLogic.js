import { Arithmetic } from "./Arithmetic.js";

export function GameLogic(numbers, operator) {
  const searched = {};
  const directions = { l: "r", r: "l", u: "d", d: "u" };

  function getNewIndex(index, direction) {
    let newIndex = 0;
    if (direction === "d") {
      newIndex = index + 4;
    } else if (direction === "u") {
      newIndex = index - 4;
    } else if (direction === "l") {
      newIndex = index - 1;
    } else if (direction === "r") {
      newIndex = index + 1;
    }
    return newIndex;
  }

  function inBounds(index, direction) {
    if (index > 15 || index < 0) return false; // checks if you went above or below the board
    if (direction === "l" && index % 4 === 0) return false; // checks if you went off the left side of the board
    if (direction === "r" && (index + 1) % 4 === 0) return false; // checks if you went off the right side of the board
    return true;
  }

  function search(workingNumber, index, finalElement, direction) {
    let newIndex = getNewIndex(index, direction);
    if (newIndex in searched) return searched[newIndex];
    if (!inBounds(newIndex, direction)) {
      searched[newIndex] = false;
      return false;
    }
    
    if (finalElement && numbers[newIndex]["newNumber"] === workingNumber) {
      searched[newIndex] = true;
      console.log("ANSWER",workingNumber);
      return true;
    } else if (finalElement) {
        return false;
    }
    
    const combiner = Arithmetic(operator);
    let combo = combiner.operate(
      numbers[index]["newNumber"],
      numbers[newIndex]["newNumber"]
    );
    
    for (const [currentDir, futureDir] of Object.entries(directions)) {
      if (currentDir !== direction) {
        if (search(combo, newIndex, true, futureDir)) return true;
      }
    }
    return false;
  }

  function checkAnswer(index, workingNumber, selectedAnswerIndeces, finalElement, direction) {
    let newIndex = getNewIndex(index, direction);
    if (!selectedAnswerIndeces.includes(newIndex)) return false;
    
    if (finalElement && numbers[newIndex]["newNumber"] === workingNumber) {
        console.log("ANSWER",workingNumber);
      return true;
    } else if (finalElement) {
        return false;
    }
    
    const combiner = Arithmetic(operator);
    let combo = combiner.operate(
      numbers[index]["newNumber"],
      numbers[newIndex]["newNumber"]
    );
    
    for (const [currentDir, futureDir] of Object.entries(directions)) {
      if (currentDir !== direction) {
        if (checkAnswer(newIndex, combo, selectedAnswerIndeces, true, futureDir)) return true;
      }
    }
    return false;
  }

  return {
    possibilityOfSuccess() {
      for (let index = 0; index < 16; index++) {
        
        let number = numbers[index];
        let firstNumber = number["newNumber"];
        if (
          search(firstNumber, index, false, "l") ||
          search(firstNumber, index, false, "r") ||
          search(firstNumber, index, false, "u") ||
          search(firstNumber, index, false, "d")
        ) {
          return true;
        }
      }
      return false;
    },
    correctAnswer(selectedAnswerIndeces) {
        if (selectedAnswerIndeces.length === 0) return false;
        for (let i = 0; i < 3; i++) {
            let selectedIndex = selectedAnswerIndeces[i];
            let number = numbers[Number(selectedIndex)]["newNumber"];
            if (
                checkAnswer(selectedIndex, number, selectedAnswerIndeces, false, "l") ||
                checkAnswer(selectedIndex, number, selectedAnswerIndeces, false, "r") ||
                checkAnswer(selectedIndex, number, selectedAnswerIndeces, false, "u") ||
                checkAnswer(selectedIndex, number, selectedAnswerIndeces, false, "d")
            ) {
            return true;
        }
      }
      return false;
    },
  };
}
