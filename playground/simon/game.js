/*
  © Copyright 2023-2023 E Reynolds, Inc. All rights reserved.

  This program is confidential and proprietary to E Reynolds, and
    may not be copied, reproduced, modified, disclosed to others, published or used,
    in whole or in part, without the express prior written permission.
*/


console.log("game.js is running");

const buttonColors = [
  "green",
  "yellow",
  "red",
  "blue"
];

const congratsMsgs = [
  "Here we go!",
  "Keep going!",
  "Wow! You're doing great.",
  "Fantastic",
  "Awesome"
];

let gameSequence = [];
let startedGame = false;
let playingSequence = false;
let level = 0;
let playIndex = 0;
let checkIndex = 0;
let timer = null;


/** Update the game sequence..
  * - Increment game level.
  * - Reset sequence check index.
  * - Push another color onto the gameSequence array.
  * - Play the sequence.
*/
function UpdateGameSequence() {

  /* Use a timer to give the user a little breathing space before
   the game actually starts. */
  timer = setTimeout(() => {
    // Increment game level.
    level++;

    // Reset sequence check index.
    checkIndex = 0;

    // Push another color onto the gameSequence array.
    const num = Math.floor(Math.random() * 4);
    // $("#level-title").text("Level " + level);
    $("#msgBottom").text("Level " + level);
    const newColor = buttonColors[num];
    gameSequence.push(newColor);

    // Show a congratulations message every few levels.
    congratsLevel = Math.floor(level / 2);
    if (congratsLevel > congratsMsgs.length) {
      congratsLevel = 0;
    }
    $("#msgTop").text(congratsMsgs[congratsLevel]);

    // Play the sequence.
    playSequence();
  }, 1000);

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
  timer = setInterval(timerHandler, 700);
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
  * - Flash screen background.
  * - Reset the games started flag.
  * @param {string} c user clicked color e.g "red".
*/
function gameOver(c) {
  console.log("WRONG.. expected" + c);

  // Show consolation messages
  $("#msgTop").text("Doh! You should have clicked " + c);
  $("#msgBottom").text("Press A Key or Click Here To Try Again");

  // Play a sad sound.
  const audio = new Audio('./sounds/wrong.mp3');
  audio.play();

  // Flash screen background.
  $("body").addClass("fail");
  setTimeout(
    () => {
      $("body").removeClass("fail");

    }, 300);

  startedGame = false;
}


/** Reset the game
  * - Reset game level to 0.
  * - Reset game started flag.
  * - Reset game sequence.
  * - Reset game messages.
*/
function resetGame() {
  level = 0;
  startedGame = false;
  gameSequence = [];
  $("#msgTop").text("How far can you go?");
  $("#msgBottom").text("Ready...");
}

/** Start the game.
*/
function startGame() {
  resetGame();
  startedGame = true;
  UpdateGameSequence();
}


//////////////////////////////////////////////////////////////////////////////
// BEGIN

console.log("game.js is running");



/* Register an event handler for key presses.
 * - Ignore events when game is started...
 * - Otherwise... Start the game.
*/
$("body").keypress(
  (e) => {
    // Ignore if game is already started.
    if (startedGame) {
      return;
    }
    startGame();
  }
);


/* Register an event handler for click on bottom msg.
 * - Ignore events when game is started...
 * - Otherwise... Start the game.
*/
$("#msgBottom").click(
  (e) => {
    // Ignore events when game is started.
    if (startedGame) {
      return;
    }
    // Start the game.
    startGame();
  }
)


/* Register an event handler for button presses.
 * - Ignore events when game is not started or when the sequence is playing...
 * - Otherwise... Check user button against sequence.
*/
$(".btn").click(
  (e) => {
    // Ignore events when game is not started or if sequence is playing.
    if (!startedGame || playingSequence) {
      return;
    }
    const buttonColor = e.target.id;
    checkUserButtonAgainstSequence(buttonColor);
  }


)

