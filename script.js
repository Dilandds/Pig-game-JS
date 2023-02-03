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
//intially hide the dice
diceEl.classList.add('hidden');

//The total score of players
let total = [0, 0];
//points earned now
let count1 = 0;
//to identify the active player
let activePlayer = 0;
//adding the background color to the active player
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
    //when get 1
    count1 = 0;
    document.getElementById(`current--${activePlayer}`).textContent = count1;
    //remove the active color from current player
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
    //change the active player
    activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
    //give him the active player color
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--active');
  }
};

btnRoll.addEventListener('click', clickRoll);

//holding the value function
const clickHold = function () {
  total[activePlayer] += count1;
  count1 = 0;
  document.getElementById(`current--${activePlayer}`).textContent = count1;

  if (total[activePlayer] < 100) {
    //chnage the total score of the active player
    document.getElementById(`score--${activePlayer}`).textContent =
      total[activePlayer];
    //remove the active color from current player
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
    //change active player if he did not win
    activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
    //give  the new active player color
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--active');
  } else {
    console.log(activePlayer + 'Wins');
  }
};

btnHold.addEventListener('click', clickHold);

//new game functinality
const clickNewGame = function () {
  count1 = 0;
  total = [0, 0];
  document.getElementById(`current--0`).textContent = count1;
  document.getElementById(`current--1`).textContent = count1;
  diceEl.classList.add('hidden');

  document.getElementById(`score--0`).textContent = 0;
  document.getElementById(`score--1`).textContent = 0;
  if (
    document.querySelector('.player--1').classList.contains('player--active')
  ) {
    document.querySelector(`.player--1`).classList.remove('player--active');
    document.querySelector(`.player--0`).classList.add('player--active');
  }
};

btnNew.addEventListener('click', clickNewGame);