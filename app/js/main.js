import { states } from "./products.js";

// Store the current state for guessing
let currentState = null;

function generateRandomNumber() {
  return Math.floor(Math.random() * 50) + 1;
}

// Handle the guessing logic when the form is submitted
document
  .getElementById("card-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission behavior

    const input = document.getElementById("input").value.trim().toLowerCase();

    // Check if the input guess is correct
    if (currentState && input === currentState.name.toLowerCase()) {
      document.getElementById("word-list").innerHTML = `
        <p class="text-green-500">Correct! You guessed ${currentState.name}!</p>
      `;
    } else {
      document.getElementById("word-list").innerHTML = `
        <p class="text-red-500">Incorrect. Try again!</p>
      `;
    }

    // Clear the input after each guess
    document.getElementById("input").value = "";
  });

// Function to generate and display the state card
function summonCard() {
  const randomNumber = generateRandomNumber();
  const stateSort = states.filter(
    (state) => state.stateNumber === randomNumber
  );
  currentState = stateSort[0]; // Store the current state for guessing

  createCards(stateSort);
  enableGuessingForm(); // Enable the guessing form
}

// Display the state card
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

// Enable the guessing form after clicking "Play"
function enableGuessingForm() {
  document.getElementById("input").disabled = false; // Enable input field
  document.querySelector('input[type="submit"]').disabled = false; // Enable submit button
}

// Disable the guessing form if necessary (e.g., reset between rounds)
function disableGuessingForm() {
  document.getElementById("input").disabled = true; // Disable input field
  document.querySelector('input[type="submit"]').disabled = true; // Disable submit button
}

// Start a new game when the "Play" button is clicked
document.getElementById("playButton").addEventListener("click", () => {
  summonCard();
  disableGuessingForm(); // Disable form until state is revealed

  // Re-enable the Hint button when starting a new round
  document.getElementById("hintButton").disabled = false;
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
    // Disable the hint button after it is clicked
    document.getElementById("hintButton").disabled = true;
  }
});
