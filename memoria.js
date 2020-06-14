const cards = document.querySelectorAll('.memory-card');
const button = document.querySelector("button")
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let moves = 0;
let pairs = 0;
let pair = document.getElementById('jogo');


function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');
  
  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  secondCard = this;
  checkForMatch();
  button.disabled = (pairs !== 6);
  moves++;
  document.getElementById('score').innerHTML = moves

}

function checkForMatch() {
  let isMatch = firstCard.dataset.object === secondCard.dataset.object;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  pairs++;
  
  changeInfo();
  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1000);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function shuffle() {
    cards.forEach(card => {
      let randomPos = Math.floor(Math.random() * 12);
      card.style.order = randomPos;
    })
  
}
  
shuffle()

button.addEventListener('click', resetEverything)
cards.forEach(card => card.addEventListener('click', flipCard));

function resetEverything() {
  lockBoard = true;
  console.log(moves,pairs);
  
  cards.forEach(card => card.addEventListener('click', flipCard));
  cards.forEach(card => card.classList.remove('flip'));

  pair.classList.add('hide');
  pair = document.getElementById('jogo');
  pair.classList.remove('hide');
  
  setTimeout(() => {
    shuffle();
    resetBoard();
    moves = 0;
    pairs = 0;
    document.getElementById('score').innerHTML = moves
  }, 300)
  

}

function changeInfo() {
  pair.classList.add('hide');
  pair = document.getElementById(firstCard.dataset.object);
  pair.classList.remove('hide');

}