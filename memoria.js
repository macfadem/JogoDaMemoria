const cards = document.querySelectorAll('.memory-card');
const button = document.querySelector("button[name=button]")
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let moves = 0;
let pairs = 0;


function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');
  moves++;

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  secondCard = this;
  checkForMatch();
  button.disabled = (pairs !== 6);
}

function checkForMatch() {
  let isMatch = firstCard.dataset.object === secondCard.dataset.object;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  pairs++;

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


cards.forEach(card => card.addEventListener('click', flipCard));

function resetEverything() {
  lockBoard = true;
  console.log(moves,pairs);
  
  cards.forEach(card => card.addEventListener('click', flipCard));
  cards.forEach(card => card.classList.remove('flip'));
  
  setTimeout(() => {
    shuffle();
    resetBoard();
    moves = 0;
    pairs = 0;
  }, 500)
  

}
