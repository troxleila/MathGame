import {
  ADDITION,
  SUBTRACTION,
  DIVISION,
  MULTIPLICATION,
} from "./constants.js";

export function GameLogic(numbers, operator) {
  const searched = {};
  const directions = { l: "r", r: "l", u: "d", d: "u" };
  const accessedOperator = operator["operator"];

  function operate(number1, number2) {
    let result = 0;
    if (accessedOperator === ADDITION) {
      result = number1 + number2;
    } else if (accessedOperator === SUBTRACTION) {
      result = number1 - number2;
    } else if (accessedOperator === DIVISION) {
      result = number1 / number2;
    } else if (accessedOperator === MULTIPLICATION) {
      result = number1 * number2;
    }
    return result;
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
    console.log(
      "from " + index + " we went " + direction + " and got to " + newIndex
    );
    return newIndex;
  }

  function inBounds(index, direction) {
    console.log("checking " + index + " " + direction);
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
    console.log("is this the last one? "+finalElement);
    console.log("we are looking for: "+workingNumber +" and we have "+numbers[newIndex]["newNumber"]);
    console.log("do we have what we want? ");
    console.log(numbers[newIndex]["newNumber"] === workingNumber);
    if (finalElement && numbers[newIndex]["newNumber"] === workingNumber) {
      searched[newIndex] = true;
      return true;
    }
    console.log("the current dictionary: ");
    console.log(searched);
    let combo = operate(
      numbers[index]["newNumber"],
      numbers[newIndex]["newNumber"]
    );
    console.log("WHAT WE ARE WORKING WITH:")
    console.log(numbers);
    for (const [currentDir, futureDir] of Object.entries(directions)) {
        console.log("future direction: "+futureDir+" from current dir: "+direction);
      if (currentDir !== direction) {
        if (search(combo, newIndex, true, futureDir)) return true;
      }
    }
    return false;
  }

  return {
    possibilityOfSuccess() {
      console.log("HERE");
      for (let index = 0; index < 16; index++) {
        
        let number = numbers[index];
        let firstNumber = number["newNumber"];
        console.log("first number " + { firstNumber });
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
  };
}
