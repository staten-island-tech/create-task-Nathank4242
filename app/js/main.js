import { states } from "./products.js";

// const randomIndex = Math.floor(Math.random() * states.length);

// const selectedState = states[randomIndex].state.toUpperCase();
// let guessedState = Array(selectedState.length).fill("_").join(" ");
// let incorrectGuesses = [];
// let attemptsLeft = 6;

// function guessLetter(letter) {
//   letter = letter.toUpperCase();
//   if (attemptsLeft === 0 || guessedState.indexOf("_") === -1) {
//     console.log("Game Over or State Guessed!");
//     return;
//   }

//   if (selectedState.indexOf(letter) !== -1) {
//     console.log(`Correct! The letter "${letter}" is in the state.`);
//     let newGuessedState = "";
//     for (let i = 0; i < selectedState.length; i++) {
//       newGuessedState +=
//         selectedState[i] === letter || guessedState[i] !== "_"
//           ? selectedState[i]
//           : "_";
//     }
//     guessedState = newGuessedState.split("").join(" ");
//     console.log(guessedState);
//   } else {
//     // Incorrect guess
//     console.log(`Incorrect guess: "${letter}" is not in the state.`);
//     incorrectGuesses.push(letter);
//     attemptsLeft--;
//     console.log(`Attempts left: ${attemptsLeft}`);
//     console.log("Incorrect guesses: " + incorrectGuesses.join(", "));
//   }
// }

// function guessState(stateName) {
//   stateName = stateName.toUpperCase();
//   if (stateName === selectedState) {
//     console.log(
//       `Congratulations! You guessed the state correctly: ${stateName}`
//     );
//   } else {
//     console.log(`Incorrect. The state was not ${stateName}.`);
//     attemptsLeft--;
//     console.log(`Attempts left: ${attemptsLeft}`);
//   }
// }

document
  .getElementById("card-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const input = document.getElementById("input").value;
    const card = document.createElement("div");
    card.className = "bg-white p-6 rounded-lg shadow-lg w-80 mx-auto my-4";
    function createCard(card) {
      card.innerHTML = `
      <p class="text-gray-600">Your Guess</p>
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">${input}</h2>
    `;
      document.getElementById("word-list").appendChild(card);
    }
    createCard(card);

    document.getElementById("card-form").reset();
  });
// Function to create cards from the filtered states
function createCards(states) {
  const container = document.querySelector(".container");
  container.innerHTML = "";

  states.forEach((state) => {
    const cardHTML = `
        <div class="card bg-black text-white rounded-lg shadow-2xl p-6 text-center transform transition-transform duration-300 hover:scale-110 hover:shadow-2xl border-4 border-gray-300">
          <h2 class="card-name text-2xl font-semibold">${state.capital}</h2>
        </div>
      `;
    container.insertAdjacentHTML("beforeend", cardHTML);
  });
}

function summonCard() {
  const stateSort = states.filter(
    (state) => state.stateNumber === randomNumber
  );
  createCards(stateSort);
}

document.getElementById("playButton").addEventListener("click", () => {
  randomNumber = Math.floor(Math.random() * 50) + 1;
  summonCard();
});
