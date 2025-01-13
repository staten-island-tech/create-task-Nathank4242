import { states } from "./products.js";

let currentState = null;
let score = 0;

function generateRandomNumber() {
  return Math.floor(Math.random() * states.length);
}

document
  .getElementById("card-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const input = document.getElementById("input").value.trim().toLowerCase();
    console.log("Input value:", input);

    if (currentState && currentState.state) {
      if (input === currentState.state.toLowerCase()) {
        console.log("Correct guess!");
        document.getElementById("word-list").innerHTML = `
          <p class="text-green-500">Awesome! You guessed it right! 🎉</p>
        `;
        score++;

        document.getElementById("score").textContent = score;

        setTimeout(() => {
          document.getElementById("word-list").innerHTML = `
            <p class="text-blue-500">Game started! Guess the state.</p>
          `;
          summonCard();
        }, 1500);
      } else {
        console.log("Incorrect guess!");
        document.getElementById("word-list").innerHTML = `
          <p class="text-red-500">Incorrect! Try again.</p>
        `;
      }

      document.getElementById("input").value = "";
    }
  });

function summonCard() {
  const randomNumber = generateRandomNumber();
  currentState = states[randomNumber];

  if (currentState) {
    createCards(currentState);
    document.getElementById("word-list").innerHTML = `
      <p class="text-blue-500">Game started! Guess the state.</p>
    `;
  } else {
    document.getElementById("word-list").innerHTML = `
      <p class="text-red-500">Oops, something went wrong! Please try again.</p>
    `;
  }
}

function createCards(state) {
  const container = document.querySelector(".container");
  container.innerHTML = "";

  const stateCardHTML = `
    <div class="state-card card bg-black text-white rounded-lg shadow-2xl p-6 text-center border-gray-300">
      <h2 class="card-name text-2xl font-semibold">State:</h2>
      <h3 class="card-name text-xl font-semibold">Year Established: ${state.yearEstablished}</h3>
      <p class="card-name">Population: ${state.population}</p>
    </div>
  `;
  container.insertAdjacentHTML("beforeend", stateCardHTML);
}

document.getElementById("playButton").addEventListener("click", () => {
  summonCard();
  document.getElementById("hintButton").disabled = false;
  document.getElementById("word-list").innerHTML = "";
});

function createHints(state) {
  const container = document.querySelector(".container");
  const hintCardHTML = `
    <div class="hint-card card bg-black text-white rounded-lg shadow-2xl p-6 text-center border-gray-300 mt-4">
      <h2 class="card-name text-2xl font-semibold">Hint 1:</h2>
      <p> Captial: ${state.capital}</p>
    </div>
  `;
  container.insertAdjacentHTML("beforeend", hintCardHTML);
}

document.getElementById("hintButton").addEventListener("click", () => {
  if (currentState) {
    createHints(currentState);
    document.getElementById("hintButton").disabled = true;
  }
});
