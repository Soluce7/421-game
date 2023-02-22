const dice1 = document.getElementById('dice1');
const dice2 = document.getElementById('dice2');
const dice3 = document.getElementById('dice3');
const rollDiceBtn = document.querySelector('.roll-button');
const standBtn = document.querySelector('.stand-button');
const throwsCounter = document.getElementById('throws-counter');
const scoresList = document.getElementById('scores-list');

let diceValues = [0, 0, 0];
let frozenDices = [false, false, false];
let throwsCount = 0;

function rollDice() {
  // Roll the unfrozen dices
  for (let i = 0; i < 3; i++) {
    if (!frozenDices[i]) {
      const randomValue = Math.floor(Math.random() * 6) + 1;
      diceValues[i] = randomValue;
    }
  }

  // Update the dice display
  dice1.textContent = diceValues[0];
  dice2.textContent = diceValues[1];
  dice3.textContent = diceValues[2];

  throwsCount++;
  throwsCounter.textContent = `Throws: ${throwsCount}`;

  if (throwsCount === 3) {
    endGame();
  }
}

function endGame() {
  // Save the score and reset the game
  const score = Math.max(...diceValues) * 100 + 10 * (diceValues[0] + diceValues[1] + diceValues[2] - Math.max(...diceValues));
  const scoreItem = document.createElement('li');
  scoreItem.textContent = `Score: ${score}`;
  scoresList.appendChild(scoreItem);

  resetGame();
}

function resetGame() {
  // Reset the game state
  diceValues = [0, 0, 0];
  frozenDices = [false, false, false];
  throwsCount = 0;

  // Update the dice display
  dice1.textContent = '-';
  dice2.textContent = '-';
  dice3.textContent = '-';

  throwsCounter.textContent = `Throws: ${throwsCount}`;
}

function toggleFrozenDice(diceIndex) {
  frozenDices[diceIndex] = !frozenDices[diceIndex];
  const diceElement = document.getElementById(`dice${diceIndex + 1}`);
  diceElement.classList.toggle('frozen', frozenDices[diceIndex]);
}

rollDiceBtn.addEventListener('click', rollDice);
standBtn.addEventListener('click', endGame);

dice1.addEventListener('click', () => toggleFrozenDice(0));
dice2.addEventListener('click', () => toggleFrozenDice(1));
dice3.addEventListener('click', () => toggleFrozenDice(2));
