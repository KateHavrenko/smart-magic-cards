const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
const cardsWrapper = document.querySelector('.cards-wrapper');
const buttonsWrapper = document.querySelector('.btn-wrapper');
const cardsWrapperInner = document.createElement('div');
cardsWrapperInner.classList.add('cards-wrapper-inner');
let cards = [];

function createCards() {
  // Create an array with objects containing the value and the suit of each card
  for (let i = 0; i < suits.length; i++) {
    // let suit = suits[length];
    for (let j = 1; j <= 13; j += 1) {
      const cardObject = {
        value: j,
        suit: suits[i],
      };
      cards.push(cardObject);
    }
  }
  if (snuffleCards) cards.sort(() => Math.random() - 0.5);


  // For each dataObject, create a new card and append it to the DOM
  cards.forEach((card, i) => {
    const positionFromLeft = i * 25;
    const cardElement = document.createElement('div');
    cardElement.setAttribute('data-value', card.value);
    cardElement.classList.add('card', `${card.suit}-${card.value}`);
    cardElement.style.left = `${positionFromLeft}px`;
    cardsWrapperInner.append(cardElement);
  });
  cardsWrapper.append(cardsWrapperInner);
}

// Function to clear out the initial button and create new buttons to play the game.
function createButtons() {
  document.querySelector('#start-game').style.display = 'none';
  const buttons = ['snuffle', 'show-hide', 'magic'];
  for (let btn in buttons) {
    let buttonElement = document.createElement('button');
    buttonElement.id = buttons[btn];
    buttonElement.innerHTML = buttons[btn];
    buttonElement.classList.add('btn', 'btn-lg', 'btn-secondary', `${buttons[btn]}`);
    buttonsWrapper.append(buttonElement);
  }

    document.querySelector('#show-hide').addEventListener('click', hideCards);
    document.querySelector('#snuffle').addEventListener('click', function(){
      cardsWrapperInner.parentNode.removeChild(cardsWrapperInner);
      shuffle();
      createCards();
    });

    document.querySelector('#magic').addEventListener('click', function(){
      cardsWrapperInner.parentNode.removeChild(cardsWrapperInner);
      magic();
      createCards();
    });
}

let showCards = false;
function hideCards() {
  showCards = !showCards;
  showCards ? cardsWrapper.classList.add('hidden') :
  cardsWrapper.classList.remove('hidden');
}

let snuffleCards = false;
function shuffle() {
  snuffleCards = true;
  cards = [];
  console.log('kooo');
}

// let magicCards = false;
function magic() {
  snuffleCards = false;
  cards = [];
  // magicCards = true;
}

// if (snuffleCards) createCards();

// hideCardsBtn ? hideCardsBtn.addEventListener('click', hideCards)



// Function to start the game by clearing the wrapper, creating
// and appending the buttons and all the cards to the DOM
function startGame() {
  createButtons();
  createCards();
}

document.getElementById('start-game').addEventListener('click', startGame);
