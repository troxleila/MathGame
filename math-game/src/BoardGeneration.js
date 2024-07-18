import { Arithmetic } from "./Arithmetic.js";
import { DIVISION } from "./constants.js";

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getAnswer(operator) {
    const combiner = Arithmetic(operator);
    let a = getRandomInt(11);
    let b = getRandomInt(11);
    let ans = combiner.operate(a, b);
    if (operator["operator"] === DIVISION) {
        ans = getRandomInt(20) + 1;
        b = getRandomInt(10) + 1;
        a = ans * b;
    }
    return [a, b, ans]
}

export function generateBoard(operator) {
    // Create an empty 4x4 board
    let board = Array.from({ length: 16 }, (_, i) => ({ i, value: getRandomInt(21) }));
    let solutions = [];

    // Determine the number of solutions (1 to 3)
    let numSolutions = getRandomInt(3) + 1;
    for (let i = 0; i < numSolutions; i++) {
        let direction = ["horizontal", "vertical", "L-shape"][getRandomInt(3)];
        let row = getRandomInt(4);
        let col = getRandomInt(4);

      if (direction === "horizontal" && col <= 1) {
        let [a, b, ans] = getAnswer(operator);
        board[row * 4 + col].value = a;
        board[row * 4 + col + 1].value = b;
        board[row * 4 + col + 2].value = ans;
        solutions.push(`${a} + ${b} = ${ans} (horizontal at row ${row + 1})`);
      } else if (direction === "vertical" && row <= 1) {
        let [a, b, ans] = getAnswer(operator);
        board[row * 4 + col].value = a;
        board[(row + 1) * 4 + col].value = b;
        board[(row + 2) * 4 + col].value = ans;
        solutions.push(`${a} + ${b} = ${ans} (vertical at column ${col + 1})`);
      } else if (direction === "L-shape" && row <= 2 && col <= 2) {
        let L_shapes = [
            [[0, 0],[0, 1],[1, 1],], // Original L
            [[0, 0],[1, 0],[1, 1],], // 90-degree rotated L
            [[0, 1],[1, 0],[1, 1],], // 180-degree rotated L
            [[0, 0],[1, 0],[1, -1],], // 270-degree rotated L
        ];
        let L_shape = L_shapes[getRandomInt(4)];
        let [a, b, ans] = getAnswer(operator);
        let valid = true;
        for (let [dr, dc] of L_shape) {
            if (0 <= row + dr && row + dr < 4 && 0 <= col + dc && col + dc < 4) {
                board[(row + dr) * 4 + (col + dc)].value = (dr === 0 && dc === 0) ? a : (dr === L_shape[1][0] && dc === L_shape[1][1]) ? b : ans;
            } else {
                valid = false;
                break;
            }
        }
        if (valid) {
            solutions.push(`${a} + ${b} = ${ans} (L-shape at row ${row + 1}, column ${col + 1})`);
        }
      }
    }
    console.log("\nSolutions:");
    solutions.forEach((solution) => console.log(solution));
    if (solutions.length === 0) {
        console.log("Regenerating board");
        board = generateBoard(operator)
    } 
    return board
  }