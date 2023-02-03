'use strict';
//selct elements
const score1El = document.getElementById('score--0');
const score2El = document.getElementById('score--1');
const curscore1El = document.getElementById('current--0');
const curscore2El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player1 = document.querySelector(`.player--0`);
const player2 = document.querySelector(`.player--1`);

//update elements to initial values
score1El.textContent = 0;
score2El.textContent = 0;
//intially hide the dice
diceEl.classList.add('hidden');

//playing or not
let playing, total, count1, activePlayer;

//new game functinality
const init = function () {
  activePlayer = 0;
  //play
  playing = true;
  //set current count to 0
  count1 = 0;
  // set total counts to zero
  total = [0, 0];
  //reset total counts
  curscore1El.textContent = count1;
  curscore2El.textContent = count1;
  //make the dice hide
  diceEl.classList.add('hidden');

  score1El.textContent = 0;
  score2El.textContent = 0;
  //reset the active player color to player 1
  activePlayer = 0;
  //no need of if conditions js will only remove if exists
  player2.classList.remove('player--active');
  player2.classList.remove('player--winner');
  player1.classList.remove('player--winner');

  player1.classList.add('player--active');
};

init();
//switching the active player
const switchActive = function () {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  player1.classList.toggle('player--active');
  player2.classList.toggle('player--active');
};

//rolling the dice functinality
const clickRoll = function () {
  if (playing) {
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
      // document
      //   .querySelector(`.player--${activePlayer}`)
      //   .classList.remove('player--active');
      // //change the active player
      // activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
      // //give him the active player color
      // document
      //   .querySelector(`.player--${activePlayer}`)
      //   .classList.add('player--active');

      switchActive();
    }
  }
};

btnRoll.addEventListener('click', clickRoll);

//holding the value function
const clickHold = function () {
  if (playing) {
    total[activePlayer] += count1;
    count1 = 0;
    document.getElementById(`current--${activePlayer}`).textContent = count1;

    if (total[activePlayer] < 20) {
      //chnage the total score of the active player
      document.getElementById(`score--${activePlayer}`).textContent =
        total[activePlayer];
      //this palyer swiching parts repeats twice so make a function
      //remove the active color from current player
      // document
      //   .querySelector(`.player--${activePlayer}`)
      //   .classList.remove('player--active');
      // //change active player if he did not win
      // activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
      // //give  the new active player color
      // document
      //   .querySelector(`.player--${activePlayer}`)
      //   .classList.add('player--active');
      switchActive();
    } else {
      //console.log(activePlayer + 'Wins');
      //add the wining style to the wining player
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document.getElementById(`score--${activePlayer}`).textContent = 'Won!';
      diceEl.classList.add('hidden');

      playing = false;
    }
  }
};

btnHold.addEventListener('click', clickHold);

btnNew.addEventListener('click', init);
