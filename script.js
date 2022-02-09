'use strict';
//player
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
//display score
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
//btn
const btnReset = document.querySelector('.btn--new');
const btnPlay = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
//dice img
const diceImg = document.querySelector('.dice');

//current score
const currentScore0 = document.getElementById('current--0');
const currentScore1 = document.getElementById('current--1');

//Score
let currentScore = 0;
let totalScore = [0, 0];
//playerActive Now
let playerActive = 0;
//finish or not using boolean cant use button
let playingGame = true;

//switch player and current score will be 0
const rollDice = function () {
  document.getElementById(`current--${playerActive}`).textContent = 0;
  //swithc player
  playerActive = playerActive === 0 ? 1 : 0;
  currentScore = 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};
//reset game button
const resetGame = function () {
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScore = 0;
  playerActive = 0;
  totalScore = [0, 0];
  playingGame = true;
  diceImg.classList.remove('hide');
  player1.classList.remove('player--active');
  player0.classList.add('player--active');
  if (
    player0.classList.contains('player--winner') ||
    player1.classList.contains('player--winner')
  ) {
    player0.classList.remove('player--winner');
    player1.classList.remove('player--winner');
  }
};

const rollDice_1 = function () {
  if (playingGame) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceImg.classList.remove('hide');
    diceImg.src = `dice-${dice}.png`;
    // score0El.textContent = dice;
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${playerActive}`).textContent =
        currentScore;
    } else {
      rollDice();
    }
  }
};

const holdButton = function () {
  if (playingGame) {
    totalScore[playerActive] += currentScore;
    document.getElementById(`score--${playerActive}`).textContent =
      totalScore[playerActive];

    if (totalScore[playerActive] >= 20) {
      document.getElementById(`score--${playerActive}`).textContent = 'Winner';
      playingGame = false;
      document
        .querySelector(`.player--${playerActive}`)
        .classList.add('player--winner');
      diceImg.classList.add('hide');
    } else {
      //if less than 20 will switch player
      rollDice();
    }
  }
};

btnReset.addEventListener('click', resetGame);
btnPlay.addEventListener('click', rollDice_1);
btnHold.addEventListener('click', holdButton);
