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

// function to listen for key strokes/letters pressed
document.addEventListener("keyup", (e) => {
  // check the number of guesses a player has left
  if (guessesRemaining === 0) {
    return
  }

  let pressedKey = String(e.key)
  // functionality to delete a letter from a word
  // allow for deleting a letter only if there is a letter to delete
  if(pressedKey === "Backspace" && nextLetter !== 0) {
    deleteLetter()
    return
  }

  if(pressedKey === "Enter") {
    checkGuess()
    return
  }

  // check for appropriate input (no numbers or special characters allowed)
  let found = pressedKey.match(/[a-z]/gi)
  if(!found || found.length > 1) {
    return
  } else {
    insertLetter(pressedKey);
  }
})

// function to put a letter to the screen
function insertLetter(pressedKey) {
  if(nextLetter === 5) {
    return
  }
  pressedKey = pressedKey.toLowerCase()

  let row = document.getElementsByClassName("letter-row")[6-guessesRemaining]
  let box = row.children[nextLetter]
  box.textContent = pressedKey
  box.classList.add("filled-box")
  currentGuess.push(pressedKey)
  nextLetter += 1
}

// function to delete letters from current guess
function deleteLetter() {
  let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining]
  let box = row.children[nextLetter - 1]
  box.textContent = ""
  box.classList.remove("filled-box")
  currentGuess.pop()
  nextLetter -= 1
}

// function to check users guess
function checkGuess() {
  let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining]
  let guessString = ''
  let rightGuess = Array.from(rightGuessString)

  for(const val of currentGuess) {
    guessString += val
  }

  if(guessString.length != 5) {
    alert("Not enough letters!")
    return
  }

  if (!WORDS.includes(guessString)) {
    alert("Word not in this list!")
    return
  }

  for(let i = 0; i < 5; i++) {
    let letterColor = ''
    let box = row.children[i]
    let letter = currentGuess[i]

    let letterPosition = rightGuess.indexOf(currentGuess[i])
    // is letter in correct guess
    if(letterPosition === -1) {
      letterColor = 'grey'
    } else {
      // letter is in word
      // if letter index and right guess index are the same
      // letter is in the right position
      if(currentGuess[i] === rightGuess[i]) {
        // shade green
        letterColor = 'green'
      } else {
        letterColor = 'yellow'
      }

      rightGuess[letterPosition] = "#"
    }

    let delay = 250 * i
    setTimeout(() => {
      // shade box
      box.style.backgroundColor = letterColor
      shadeKeyBoard(letter, letterColor)
    }, delay)
  }

  if(guessString === rightGuessString) {
    alert("Correct!")
    guessesRemaining = 0
    return;
  } else {
    guessesRemaining -= 1;
    currentGuess = [];
    nextLetter = 0;

    if(guessesRemaining === 0) {
      alert("You're out of guesses. Game over");
      alert(`The correct word was: "${rightGuessString}"`)
    }
  }
}

function shadeKeyBoard(letter, color) {
  for(const elem of document.getElementsByClassName("keyboard-button")) {
    if(elem.textContent === letter) {
      let oldColor = elem.style.backgroundColor
      if(oldColor === 'green') {
        return
      }
      if(oldColor === 'yellow' && color !== 'green') {
        return
      }
      elem.style.backgroundColor = color
      break;
    }
  }
}

initBoard();