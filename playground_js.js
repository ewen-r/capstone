
function roll() {
  // Roll dice.
  dice1 = Math.floor(Math.random() * 6) +1;
  dice2 = Math.floor(Math.random() * 6) +1;

  // Get dice image elements.
  const dice1Element = document.getElementById("dice1");
  const dice2Element = document.getElementById("dice2");

  // Set images.
  dice1Element.setAttribute("src", './playground_assets/dice' + dice1 + '.png');
  dice2Element.setAttribute("src", './playground_assets/dice' + dice2 + '.png');

  // Calculate and display result message.
  if (dice1 > dice2) {
    result = '😀 Player 1 wins';
  } else if ( dice2 > dice1) {
    result = 'Player 2 wins 😀';
  } else {
    result = '😀 The result is a draw 😀';
  }
  document.getElementById("resultMsg").innerText = result;
}

console.log("dicee.js");

// Execute js on button click.
const buttonElement = document.querySelector("#rollDiceButton");
buttonElement.addEventListener("click", roll);
