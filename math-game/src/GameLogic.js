import {
  ADDITION,
  SUBTRACTION,
  DIVISION,
  MULTIPLICATION,
} from "./constants.js";

export function GameLogic(numbers, operator) {
  function operate(number1, number2) {
    if (operator === ADDITION) {
      return number1 + number2;
    } else if (operator === SUBTRACTION) {
      return number1 - number2;
    } else if (operator === DIVISION) {
      return number1 / number2;
    } else if (operator === MULTIPLICATION) {
      return number1 * number2;
    }
  }

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
    if (index > 15 || index <= 0) return false;
    if (direction === "l" && index % 4 === 0) return false;
    if (direction === "r" && (index + 1) % 4 === 0) return false;
    return true;
  }

  function search(number, index, finalElement, direction) {
    let newIndex = getNewIndex(index, direction);

    if (!inBounds(newIndex, direction)) return false;

    if (finalElement && numbers[newIndex] === number) {
      return true;
    }

    let combo = operate(numbers[newIndex], number);
    return (
      search(combo, newIndex, true, "l") ||
      search(combo, newIndex, true, "r") ||
      search(combo, newIndex, true, "u") ||
      search(combo, newIndex, true, "d")
    );
  }

  return {
    possibilityOfSuccess() {
      console.log("HERE");
      console.log({ numbers });
      for (let i = 0; i < 16; i++) {
        let firstNumber = numbers[i];
        if (
          search(firstNumber, i, false, "l") ||
          search(firstNumber, i, false, "r") ||
          search(firstNumber, i, false, "u") ||
          search(firstNumber, i, false, "d")
        ) {
          return true;
        }
      }
      return false;
    },
  };
}
