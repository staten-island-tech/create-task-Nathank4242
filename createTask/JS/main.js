import { states } from "./list.js"; // Correct path
function getRndInteger() {
  const randNum = Math.floor(Math.random() * 50);
  return randNum;
}

const randomId = getRndInteger();
console.log(randomId);
const randomStates = states[randomId - 1];

console.log(randomStates);
