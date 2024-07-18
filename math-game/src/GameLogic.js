import { Arithmetic } from "./Arithmetic.js";

export function GameLogic(numbers, operator) {
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

  function checkAnswer(
    index,
    workingNumber,
    selectedAnswerIndeces,
    finalElement,
    direction
  ) {
    let newIndex = getNewIndex(index, direction);
    if (!selectedAnswerIndeces.includes(newIndex)) return false;

    if (finalElement && numbers[newIndex]["value"] === workingNumber) {
      console.log("ANSWER", workingNumber);
      return true;
    } else if (finalElement) {
      return false;
    }

    const combiner = Arithmetic(operator);
    let combo = combiner.operate(
      numbers[index]["value"],
      numbers[newIndex]["value"]
    );

    for (const [currentDir, futureDir] of Object.entries(directions)) {
      if (currentDir !== direction) {
        if (
          checkAnswer(newIndex, combo, selectedAnswerIndeces, true, futureDir)
        )
          return true;
      }
    }
    return false;
  }

  return {
   correctAnswer(selectedAnswerIndeces) {
      if (selectedAnswerIndeces.length === 0) return false;
      for (let i = 0; i < 3; i++) {
        let selectedIndex = selectedAnswerIndeces[i];
        let number = numbers[Number(selectedIndex)]["value"];
        if (
          checkAnswer(selectedIndex,number,selectedAnswerIndeces,false,"l") ||
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
