const randomIndex = Math.floor(Math.random() * states.length);

const selectedState = states[randomIndex].state.toUpperCase();
let guessedState = Array(selectedState.length).fill("_").join(" "); // To display blanks
let incorrectGuesses = [];
let attemptsLeft = 6;

function guessLetter(letter) {
  letter = letter.toUpperCase();
  if (attemptsLeft === 0 || guessedState.indexOf("_") === -1) {
    console.log("Game Over or State Guessed!");
    return;
  }

  if (selectedState.indexOf(letter) !== -1) {
    console.log(`Correct! The letter "${letter}" is in the state.`);
    let newGuessedState = "";
    for (let i = 0; i < selectedState.length; i++) {
      newGuessedState +=
        selectedState[i] === letter || guessedState[i] !== "_"
          ? selectedState[i]
          : "_";
    }
    guessedState = newGuessedState.split("").join(" ");
    console.log(guessedState);
  } else {
    // Incorrect guess
    console.log(`Incorrect guess: "${letter}" is not in the state.`);
    incorrectGuesses.push(letter);
    attemptsLeft--;
    console.log(`Attempts left: ${attemptsLeft}`);
    console.log("Incorrect guesses: " + incorrectGuesses.join(", "));
  }
}

// Function to guess the full state
function guessState(stateName) {
  stateName = stateName.toUpperCase();
  if (stateName === selectedState) {
    console.log(
      `Congratulations! You guessed the state correctly: ${stateName}`
    );
  } else {
    console.log(`Incorrect. The state was not ${stateName}.`);
    attemptsLeft--;
    console.log(`Attempts left: ${attemptsLeft}`);
  }
}

function submitGuess() {
  const inputField = document.getElementById("inputField");
}
