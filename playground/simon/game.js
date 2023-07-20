
console.log("game.js is running");

buttonColors = [
  "green",
  "yellow",
  "red",
  "blue"
];
gameSequence = [];
startedGame = false;
playingSequence = false;
level = 0;
playIndex = 0;
checkIndex = 0;
timer = null;


/** Update the game sequence..
  * - Increment game level.
  * - Reset sequence check index.
  * - Push another color onto the gameSequence array.
  * - Play the sequence.
*/
function UpdateGameSequence() {
  // Increment game level.
  level++;

  // Reset sequence check index.
  checkIndex = 0;

  // Push another color onto the gameSequence array.
  const num = Math.floor(Math.random() * 4);
  $("#level-title").text("Level " + level);
  $("#msgBottom").text("");
  const newColor = buttonColors[num];
  gameSequence.push(newColor);

  // Play the sequence.
  playSequence();
};


/** Play the game sequence.
  * Uses a recurring timer that plays the next button in the sequence and will 
  * cancel itself when the sequence ends.
*/
function playSequence() {
  console.log("gameSequence = ", gameSequence);
  playingSequence = true;
  // Call timer to handle a new event every 1 second.
  playIndex = 0;
  timer = setInterval(timerHandler, 1000);
}


/** Handle timer actions...
  * - If end of play sequence...
  * - - Unset flag and cancel timer.
  * - Animate button and play appropriate sound file.
*/
function timerHandler() {
  // If end of play sequence...
  if (playIndex >= gameSequence.length) {
    // Unset flag and cancel timer.
    playingSequence = false;
    clearInterval(timer);
    return;
  }

  const c = gameSequence[playIndex++];
  // Animate button and play appropriate sound file.
  this.activateButton(c);
}


/** Animate button and play appropriate sound file.
  * - Animate button.
  * - Play correct sound.
  * @param {string} c button color.
*/
function activateButton(c) {
  // Animate button.
  const btn = $("#" + c);
  btn.fadeOut(300).fadeIn(300);

  // Play correct sound.
  const audio = new Audio("./sounds/" + c + '.mp3');
  audio.play();
}


/** Check user's button click against the game sequence.
  * If button matches sequence...
  * - - Activate the button.
  * - - Increment to checked index.
  * - - If all game values have been checked...
  * - - - Add another color to the game sequence.
  * Else..
  * - Handle game over.
  * @input {string} b button color.
*/
function checkUserButtonAgainstSequence(b) {
  console.log("checkUserButtonAgainstSequence()", b);

  // If button matches sequence...
  if (gameSequence[checkIndex] === b) {
    activateButton(b);
    checkIndex++;

    // If all game values have been checked...
    if (checkIndex >= level) {
      // Add another color to the game sequence.
      UpdateGameSequence();
    }

  } else {
    // Handle game over.
    gameOver(gameSequence[checkIndex]);
  }
};


/** Game Over.
  * - Show consolation messages.
  * - Play a sad sound.
  * - Reset the game.
  * @param {string} c user clicked color e.g "red".
*/
function gameOver(c) {
  console.log("WRONG.. expected" + c);

  // Show consolation messages
  $("#level-title").text("Hard luck.. ");
  $("#msgTop").text("You got to level " + level + ", but you should have clicked " + c);
  $("#msgBottom").text("Press A Key To Try Again");

  // Play a sad sound.
  const audio = new Audio('./sounds/wrong.mp3');
  audio.play();

  // Reset the game.
  resetGame();
}


/** Reset the game
  * - Reset game level to 0.
  * - Reset game started flag.
  * - Reset game sequence.
*/
function resetGame() {
  level = 0;
  startedGame = false;
  gameSequence = [];
}


//////////////////////////////////////////////////////////////////////////////
// BEGIN

console.log("game.js is running");


// Register an event handler for key presses.
$("body").keypress(
  (e) => {
    // Ignore if game is already started.
    if (startedGame) {
      return;
    }

    $("#msgBottom").text("");

    // Start game
    startedGame = true;
    UpdateGameSequence();
  }
);


// Register an event handler for button presses..  */
$(".btn").click(
  (e) => {
    // Ignore clicks when game is not started or if sequence is playing.
    if (!startedGame || playingSequence) {
      return;
    }
    const buttonColor = e.target.id;
    checkUserButtonAgainstSequence(buttonColor);
  }


)

