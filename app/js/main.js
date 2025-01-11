import { states } from "./products.js"; // Import the states list from products.js

let currentState = null;
let gameStarted = false; // Track if the game has started

// Function to generate a random number between 1 and 50
function generateRandomNumber() {
  return Math.floor(Math.random() * 50) + 1;
}

// Handle the guessing logic when the form is submitted
document
  .getElementById("card-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevents the form from submitting and reloading the page

    const input = document.getElementById("input").value.trim().toLowerCase();

    // Check if the game has started
    if (!gameStarted) {
      document.getElementById("word-list").innerHTML = `
        <p class="text-red-500">Please start a new game to guess.</p>
      `;
      return;
    }

    // Check if currentState is set and the name matches the user's guess
    if (currentState && currentState.name) {
      if (input === currentState.name.toLowerCase()) {
        document.getElementById("word-list").innerHTML = `
          <p class="text-green-500">Yes, you got it correct! You guessed ${currentState.name}!</p>
        `;
      } else {
        document.getElementById("word-list").innerHTML = `
          <p class="text-red-500">Incorrect. The correct answer was ${currentState.name}. Try again!</p>
        `;
      }

      gameStarted = false; // End the game after one guess
      resetGame(); // Reset the game for the next round
    }

    // Clear the input after each guess
    document.getElementById("input").value = "";
  });

// Function to generate and display the state card
function summonCard() {
  const randomNumber = generateRandomNumber();
  const stateSort = states.filter(
    (state) => state.stateNumber === randomNumber // Match by state number (adjust as needed)
  );

  if (stateSort.length > 0) {
    currentState = stateSort[0]; // Store the current state for guessing
    gameStarted = true; // Start the game

    createCards(stateSort); // Display the state card
    document.getElementById("word-list").innerHTML = `
      <p class="text-blue-500">Game started! You have one guess.</p>
    `;
  } else {
    document.getElementById("word-list").innerHTML = `
      <p class="text-red-500">No state found. Please try again.</p>
    `;
  }
}

// Function to display the state card
function createCards(states) {
  const container = document.querySelector(".container");
  container.innerHTML = ""; // Clear any previous state cards

  states.forEach((state) => {
    const stateCardHTML = `
      <div class="state-card card bg-black text-white rounded-lg shadow-2xl p-6 text-center border-gray-300">
        <h2 class="card-name text-2xl font-semibold">State:</h2>
        <h3 class="card-name text-xl font-semibold">Capital: ${state.capital}</h3>
        <p class="card-name">Population: ${state.population}</p>
      </div>
    `;
    container.insertAdjacentHTML("beforeend", stateCardHTML);
  });
}

// Function to reset the game state
function resetGame() {
  document.getElementById("input").value = ""; // Clear the input field
  document.getElementById("hintButton").disabled = false; // Enable the hint button again
}

// Start a new game when the "Play" button is clicked
document.getElementById("playButton").addEventListener("click", () => {
  summonCard();
  document.getElementById("hintButton").disabled = false;
  document.getElementById("word-list").innerHTML = ""; // Clear previous results message
});

// Handle the "Hint" button click (optional functionality)
function createHints(states) {
  states.forEach((state) => {
    const container = document.querySelector(".container");
    const hintCardHTML = `
      <div class="hint-card card bg-black text-white rounded-lg shadow-2xl p-6 text-center border-gray-300 mt-4">
        <h2 class="card-name text-2xl font-semibold">Hint 1:</h2>
        <p>Year Established: ${state.yearEstablished}</p>
      </div>
    `;
    container.insertAdjacentHTML("beforeend", hintCardHTML);
  });
}

document.getElementById("hintButton").addEventListener("click", () => {
  if (currentState) {
    createHints([currentState]);
    document.getElementById("hintButton").disabled = true; // Disable hint button after it is clicked
  }
});
