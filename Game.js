const MAX_SIZE = 10;

function goHome() {
  window.location.href = "Home.html";
}

document.getElementById("button1").addEventListener("click", answerChoice(1));
document.getElementById("button2").addEventListener("click", answerChoice(2));
document.getElementById("button3").addEventListener("click", answerChoice(3));
document.getElementById("button4").addEventListener("click", answerChoice(4));
document.getElementById("button5").addEventListener("click", answerChoice(5));
document.getElementById("button6").addEventListener("click", answerChoice(6));
document.getElementById("button7").addEventListener("click", answerChoice(7));
document.getElementById("button8").addEventListener("click", answerChoice(8));
document.getElementById("button9").addEventListener("click", answerChoice(9));
document.getElementById("button10").addEventListener("click", answerChoice(10));
document.getElementById("button11").addEventListener("click", answerChoice(11));
document.getElementById("button12").addEventListener("click", answerChoice(12));
document.getElementById("button13").addEventListener("click", answerChoice(13));
document.getElementById("button14").addEventListener("click", answerChoice(14));
document.getElementById("button15").addEventListener("click", answerChoice(15));
document.getElementById("button16").addEventListener("click", answerChoice(16));

function answerChoice(buttonSelected) {
  // add to a queue or list
  // if 3rd value to be added, check if equation works, clear queue, and set result
  // if 2nd or 1st value, do nothing
}

function generateTable() {
  // generate 16 values
  // insert them into boxes
  for (let i = 0; i < 16; i++) {
    const buttons = document.querySelectorAll("#answerChoices button");
    buttons.forEach((button) => {
      let val = Math.random() * MAX_SIZE;
    });
  }
}

function checkPossibility() {
  // run through all possible directions
  // ensure there's at least one possible answer
  // else: regenerate values
}

document.addEventListener("click", (e) => {
  const buttons = document.querySelectorAll("#answerChoices button");

  buttons.forEach((button) => {
    if (e.target.value === button.innerHTML && win === null) {
      let clickedBtn = e.target;
      clickedBtn.disabled = true; // Disable the button
      clickedBtn.className = checkLetter(button.innerHTML)
        ? "correct"
        : "wrong";
      checkWinState(); // Call checkWinState function
    }
  });
});
