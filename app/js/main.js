import { states } from "./list.js"; // Correct path to subfolder

function getRndInteger() {
  const randNum = Math.floor(Math.random() * 50) + 1;
  return randNum;
}
const randomId = getRndInteger();
console.log(randomId);

const filtered = states.filter((state) => {
  return state.id === randomId;
});

console.log(filtered);

function createCard() {
  Domselectors.container.innerHTML = "";
  data.forEach((thing) => {
    Domselectors.container.insertAdjacentHTML(
      "beforeend",
      `
        <div class="card border-indigo-600 box-border min-h-max w-64 p-4 border-8 m-8">
          <h2 class="card-name text-blue-600 text-xl">Name: ${thing.name}</h2>
          <img class="card-img" src="${thing.image}" alt="unfound"/>
        </div>
      `
    );
  });
}

createCard();
