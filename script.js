const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let fristCard, secondCard;
let lockBoard = false;

function flipCard() {
  if (lockBoard) return;
  if (this === fristCard) return;
  this.classList.add('flip');
  if(!hasFlippedCard) {
    hasFlippedCard = true;
    fristCard = this;
    return;
  }

  secondCard = this;
  hasFlippedCard = false; 
  checkForMatch(); 
}

function checkForMatch() {
  if(fristCard.dataset.card === secondCard.dataset.card) {
    disableCards();
    return;
  }

  unflipCard();
}

function disableCards() {
  fristCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCard() {
  lockBoard = true;

  setTimeout(() => {
    fristCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [fristCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach((card) => {
    let ramdomPosition = math.floor(Math.random() * 12)
    card.style.order = ramdomPosition;
  })
})();

cards.forEach((card) => {
  card.addEventListener('click', flipCard)
})