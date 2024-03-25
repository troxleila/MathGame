import React from "react";

class Game extends React.Component {
  constructor(props) {
    super(props);
    // Initialize state if needed
    this.state = {
      operator: this.props.name,
      lives: 3,
      win: false,
      // Initial state values
    };
  }

  // Component lifecycle methods
  componentDidMount() {
    // Code to run after the component has mounted
  }

  componentDidUpdate(prevProps, prevState) {
    // Code to run after the component updates
  }

  componentWillUnmount() {
    // Code to run before the component unmounts
  }

  // Event handlers or other methods
  handleClick = () => {
    // Handle button click or any other event
  };

  answerSelected = (e) => {
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
  };

  render() {
    return (
      <div class="container" id="answerChoices">
        <div class="cell" id="box1">
          <button onClick={this.answerSelected}>Button 1</button>
        </div>
        <div class="cell" id="box2">
          <button onClick={this.answerSelected}>Button 2</button>
        </div>
        <div class="cell" id="box3">
          <button onClick={this.answerSelected}>Button 3</button>
        </div>
        <div class="cell" id="box4">
          <button onClick={this.answerSelected}>Button 4</button>
        </div>
        <div class="cell" id="box5">
          <button onClick={this.answerSelected}>Button 5</button>
        </div>
        <div class="cell" id="box6">
          <button onClick={this.answerSelected}>Button 6</button>
        </div>
        <div class="cell" id="box7">
          <button onClick={this.answerSelected}>Button 7</button>
        </div>
        <div class="cell" id="box8">
          <button onClick={this.answerSelected}>Button 8</button>
        </div>
        <div class="cell" id="box9">
          <button onClick={this.answerSelected}>Button 9</button>
        </div>
        <div class="cell" id="box10">
          <button onClick={this.answerSelected}>Button 10</button>
        </div>
        <div class="cell" id="box11">
          <button onClick={this.answerSelected}>Button 11</button>
        </div>
        <div class="cell" id="box12">
          <button onClick={this.answerSelected}>Button 12</button>
        </div>
        <div class="cell" id="box13">
          <button onClick={this.answerSelected}>Button 13</button>
        </div>
        <div class="cell" id="box14">
          <button onClick={this.answerSelected}>Button 14</button>
        </div>
        <div class="cell" id="box15">
          <button onClick={this.answerSelected}>Button 15</button>
        </div>
        <div class="cell" id="box16">
          <button onClick={this.answerSelected}>Button 16</button>
        </div>
      </div>
    );
  }
}

export default MyComponent;
