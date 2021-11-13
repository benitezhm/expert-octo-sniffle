'use strict';

// selecting elements
const totalScoreElement_0 = document.getElementById('score--0');
const totalScoreElement_1 = document.getElementById('score--1');
const diceElement = document.querySelector('.dice');
const newGameButton = document.querySelector('.btn--new');
const rollDiceButton = document.querySelector('.btn--roll');
const holdScoreButton = document.querySelector('.btn--hold');
const currentScoreElement_0 = document.getElementById(`current--0`);
const currentScoreElement_1 = document.getElementById(`current--1`);
const playerElement_0 = document.querySelector(`.player--0`);
const playerElement_1 = document.querySelector(`.player--1`);

totalScoreElement_0.textContent = 0;
totalScoreElement_1.textContent = 0;

let activePlayer, currentScore, scores, playing;

// helper functions
const init = () => {
    activePlayer = 0;
    currentScore = 0;
    playing = true;
    scores = [0, 0];
    totalScoreElement_0.textContent = 0;
    totalScoreElement_1.textContent = 0;
    diceElement.classList.add('hidden');
    currentScoreElement_0.textContent = currentScore;
    currentScoreElement_0.textContent = currentScore;
    playerElement_0.classList.remove('player--winner');
    playerElement_1.classList.remove('player--winner');
    playerElement_0.classList.add('player--active');
    playerElement_1.classList.remove('player--active');
    diceElement.classList.add('hidden');
};
init();

const switchPlayer = () => {
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    document.querySelector(`.player--${activePlayer}`).classList.toggle('player--active');
    activePlayer = activePlayer === 0 ? 1 : 0;
    document.querySelector(`.player--${activePlayer}`).classList.toggle('player--active');

}

// Rolling dice functionality
rollDiceButton.addEventListener('click', () => {
    if (playing) {
        // generate a random dice roll
        const diceNumber = Math.trunc(Math.random() * 6) + 1;

        // display dice
        diceElement.src = `dice-${diceNumber}.png`;
        diceElement.classList.remove('hidden');

        // check for rolled 1
        if (diceNumber === 1) {
            // switch player
            switchPlayer();
        } else {
            // add dice to current score
            currentScore += diceNumber;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        }
    }
});

// hold the current score
holdScoreButton.addEventListener('click', () => {
    if (playing) {
        // add current score to total score
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        if (scores[activePlayer] >= 20) {
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            diceElement.classList.add('hidden');
        } else {
            switchPlayer();
        }
    }
});

newGameButton.addEventListener('click', init);