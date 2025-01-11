import { states } from "./products.js"; // Import the states list from products.js

let currentState = null; // Store the current state object
let score = 0; // Initialize the score

// Function to generate a random number between 0 and the number of states
function generateRandomNumber() {
  return Math.floor(Math.random() * states.length); // Generates a random index to pick a state
}

// Handle the guessing logic when the form is submitted
document
  .getElementById("card-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevents the form from submitting and reloading the page

    const input = document.getElementById("input").value.trim().toLowerCase();
    console.log("Input value:", input); // Log the input to see what is being entered

    // Check if currentState is set and the state matches the user's guess
    if (currentState && currentState.state) {
      // Compare the user's guess with the correct state name
      if (input === currentState.state.toLowerCase()) {
        console.log("Correct guess!"); // Debugging message
        document.getElementById("word-list").innerHTML = `
          <p class="text-green-500">Awesome! You guessed it right! 🎉</p>
        `;

        // Increment the score
        score++;

        // Update the score display
        document.getElementById("score").textContent = score;

        // Show "You got it right!" message for 1.5 seconds
        setTimeout(() => {
          document.getElementById("word-list").innerHTML = `
            <p class="text-blue-500">Game started! Guess the state.</p>
          `;

          // Immediately pick a new random state without delay
          summonCard(); // Call this to get the next random state
        }, 1500); // Delay of 1.5 seconds
      } else {
        console.log("Incorrect guess!"); // Debugging message
        document.getElementById("word-list").innerHTML = `
          <p class="text-red-500">Incorrect! Try again.</p>
        `;
      }

      // Clear the input after each guess
      document.getElementById("input").value = "";
    }
  });

// Function to generate and display the state card
function summonCard() {
  const randomNumber = generateRandomNumber();
  currentState = states[randomNumber]; // Select a random state based on the random number

  if (currentState) {
    createCards(currentState); // Display the state card
    document.getElementById("word-list").innerHTML = `
      <p class="text-blue-500">Game started! Guess the state.</p>
    `;
  } else {
    document.getElementById("word-list").innerHTML = `
      <p class="text-red-500">Oops, something went wrong! Please try again.</p>
    `;
  }
}

// Function to display the state card
function createCards(state) {
  const container = document.querySelector(".container");
  container.innerHTML = ""; // Clear any previous state cards

  const stateCardHTML = `
    <div class="state-card card bg-black text-white rounded-lg shadow-2xl p-6 text-center border-gray-300">
      <h2 class="card-name text-2xl font-semibold">State: ${state.state}</h2>
      <h3 class="card-name text-xl font-semibold">Capital: ${state.capital}</h3>
      <p class="card-name">Population: ${state.population}</p>
    </div>
  `;
  container.insertAdjacentHTML("beforeend", stateCardHTML);
}

// Start a new game when the "Play" button is clicked
document.getElementById("playButton").addEventListener("click", () => {
  summonCard(); // Start the game by picking a random state
  document.getElementById("hintButton").disabled = false;
  document.getElementById("word-list").innerHTML = ""; // Clear previous results message
});

// Handle the "Hint" button click (optional functionality)
function createHints(state) {
  const container = document.querySelector(".container");
  const hintCardHTML = `
    <div class="hint-card card bg-black text-white rounded-lg shadow-2xl p-6 text-center border-gray-300 mt-4">
      <h2 class="card-name text-2xl font-semibold">Hint 1:</h2>
      <p>Year Established: ${state.yearEstablished}</p>
    </div>
  `;
  container.insertAdjacentHTML("beforeend", hintCardHTML);
}

document.getElementById("hintButton").addEventListener("click", () => {
  if (currentState) {
    createHints(currentState);
    document.getElementById("hintButton").disabled = true; // Disable hint button after it is clicked
  }
});
