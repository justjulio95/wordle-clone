import {WORDS} from "./words.js";

// initializes global variables that will be used throughout the game and picks a random word from WORDS to be the correct answer.
const NUMBER_OF_GUESSES = 6;
let guessesRemaining = NUMBER_OF_GUESSES;
let currentGuess = [];
let nextLetter = 0;
let rightGuessString = WORDS[Math.floor(Math.random() * WORDS.length)];
console.log(rightGuessString);

// creating the game board
function initBoard() {
  let board = document.getElementById("game-board");

  // create one row for each guess that the user is allowed to have.
  for(let i = 0; i < NUMBER_OF_GUESSES; i++) {
    let row = document.createElement('div')
    row.className = "letter-row"

    // create 5 boxes for each word (only 5 letter words are at play)
    for(let j = 0; j < 5; j++) {
      let box = document.createElement("div")
      box.className = "letter-box"
      // append each box to each row
      row.appendChild(box)
    }
    // append each row to the gameboard
    board.appendChild(row)
  }
}

initBoard();