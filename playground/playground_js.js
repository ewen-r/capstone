
function roll() {
  // Roll dice.
  const dice1 = Math.floor(Math.random() * 6) +1;
  const dice2 = Math.floor(Math.random() * 6) +1;

  // Get dice image elements.
  const dice1Element = document.getElementById("dice1");
  const dice2Element = document.getElementById("dice2");

  // Set images.
  dice1Element.setAttribute("src", './assets/images/dice' + dice1 + '.png');
  dice2Element.setAttribute("src", './assets/images/dice' + dice2 + '.png');

  // Calculate and display result message.
  let result = '😀 The result is a draw 😀';

  if (dice1 > dice2) {
    result = '😀 Player 1 wins';
  } else if ( dice2 > dice1) {
    result = 'Player 2 wins 😀';
  }
  document.getElementById("resultMsg").innerText = result;
}


console.log("playground_js.js");

// Execute js on button click.
const buttonElement = document.querySelector("#rollDiceButton");
buttonElement.addEventListener("click", roll);
