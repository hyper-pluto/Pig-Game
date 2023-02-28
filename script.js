"use strict";
/*global console*/
// eslint-disable-line no-console
/*jslint node: true*/

// SELECTING ELEMENTS //
const player1El = document.querySelector('.player-1');
const player2El = document.querySelector('.player-2');
const score1 = document.querySelector('#score-1');
const score2 = document.getElementById('score-2');
const current1El = document.getElementById('current-1');
const current2El = document.getElementById('current-2');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// STARTING CONDITIONS //
score1.textContent = 0;
score2.textContent = 0;
diceEl.classList.add('hidden');

const scores = [0, 0, 0];
let currentScore = 0;
let activePlayer = 1;
let playing = true;

const switchPlayer = function() {
  currentScore = 0;
  document.getElementById(`current-${activePlayer}`).textContent = currentScore;
  activePlayer = activePlayer === 1 ? 2 : 1;
  player1El.classList.toggle('player-active');
  player2El.classList.toggle('player-active');
}

// ROLLING DICE FUNCTIONALITY //
btnRoll.addEventListener('click', function() {
  // if we are still playing the game
  if (playing) {
    // generate random dice roll
    const dice = Math.trunc(Math.random() * 6 + 1);

    // display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // check for rolled 1: if true, switch to next player
    if (dice !== 1) {
      // add dice to current score
      currentScore += dice;
      document.getElementById(`current-${activePlayer}`).textContent = currentScore;
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function() {
  // if we are still playing the game
  if (playing) {
    //add current score to active player
    scores[activePlayer] += currentScore;
    document.getElementById(`score-${activePlayer}`).textContent = scores[activePlayer];

    // check if score is >=100
    if (scores[activePlayer] >= 100) {
      //finsish the game
      diceEl.classList.add('hidden');
      playing = false;
      document.querySelector(`.player-${activePlayer}`).classList.add('player--winner');
      document.querySelector(`.player-${activePlayer}`).classList.remove('player-active');

    } else {
      // switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', function() {
  location.reload();
});

///////////////////////	MODAL FOR THE RULES ////////////////////////////
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.closeModal');
const btnsRules = document.querySelectorAll('.btn--rules');

// FUNCTION TO OPEN MODAL //
const openModal = function() {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
}

// FUNCTION TO CLOSE MODAL //
const closeModal = function() {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
}

// OPEN THE MODAL //
for (let i = 0; i < btnsRules.length; i++)
  btnsRules[i].addEventListener('click', openModal);

///// CLOSE THE MODAL USING BUTTON ///////
btnCloseModal.addEventListener('click', closeModal);

///// CLICK BACKGROUND TO CLOSE MODAL ///////
overlay.addEventListener('click', closeModal);

/// CLOSE THE MODAL USING THE ESCAPE KEY ///
document.addEventListener('keydown', function(e) {
  //console.log(e.key);
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
})
