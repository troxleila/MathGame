import {
  ADDITION,
  SUBTRACTION,
  DIVISION,
  MULTIPLICATION,
} from "./constants.js";

export function Arithmetic(operator) {

    const accessedOperator = operator["operator"];

    return {
        operate(number1, number2) {
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
    }
}