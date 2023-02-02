'use strict';
//selct elements
const score1El = document.getElementById('score--0');
const score2El = document.getElementById('score--1');
// const curscore1El = document.getElementById('current--0');
// const curscore2El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//update elements to initial values
score1El.textContent = 0;
score2El.textContent = 0;
diceEl.classList.add('hidden');

let count1 = 0;
let activePlayer = 0;
document
  .querySelector(`.player--${activePlayer}`)
  .classList.add('player--active');
//rolling the dice functinality
const clickRoll = function () {
  //random number
  const random = Math.trunc(Math.random() * 6) + 1;
  //display the relevant image
  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${random}.png`;
  //update score
  if (random !== 1) {
    count1 += random;
    document.getElementById(`current--${activePlayer}`).textContent = count1;
  } else {
    count1 = 0;
    document.getElementById(`current--${activePlayer}`).textContent = count1;
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
    activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--active');
  }
};

btnRoll.addEventListener('click', clickRoll);
