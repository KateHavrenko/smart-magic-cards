const suits = ['hearts', 'spades', 'diamonds', 'clubs'];
const cardsWrapper = document.querySelector('.cards-wrapper');
const buttonsWrapper = document.querySelector('.btn-wrapper');
let cards = [];

function createCards(shuffleCards) {
  // Delete the cards if they are already on the page
  if (document.querySelector('.cards-wrapper-inner') !== null) {
    var element = document.querySelector('.cards-wrapper-inner');
    element.parentNode.removeChild(element);
  }

  // Create an array with objects containing the value and the suit of each card
  for (let i = 0; i < suits.length; i++) {
    for (let j = 1; j <= 13; j += 1) {
      const cardObject = {
        value: j,
        suit: suits[i],
      };
      cards.push(cardObject);
    }
  }

  // Shuffle cards
  if (shuffleCards) cards.sort(() => Math.random() - 0.5);

  // Create the container to store the cards 
  const cardsWrapperInner = document.createElement('div');
  cardsWrapperInner.classList.add('cards-wrapper-inner');

  // For each dataObject, create a new card and append it to the DOM
  cards.forEach((card, i) => {
    const positionFromLeft = i * 25;
    const cardElement = document.createElement('div');
    const cardSuit = document.createElement('div');
    const valueTop = document.createElement('div');
    const valueBottom = document.createElement('div');
    cardSuit.classList.add('suit');
    valueTop.classList.add('value-top');
    valueBottom.classList.add('value-bottom');
    cardElement.setAttribute('data-value', card.value);
    cardElement.classList.add('card', `${card.suit}-${card.value}`, `${card.suit}`);
    cardElement.style.left = `${positionFromLeft}px`;
    cardElement.append(valueTop);
    cardElement.append(valueBottom);
    cardElement.append(cardSuit);
    cardsWrapperInner.append(cardElement);
    setTimeout(function () { cardElement.style.left = "0px" }, 0);
    setTimeout(function () { cardElement.style.left = `${positionFromLeft}px`; }, 2000);
  });
  // Add inner container with cards to the main container
  cardsWrapper.append(cardsWrapperInner);

  let spades = document.querySelectorAll('.spades');
  let clubs = document.querySelectorAll('.clubs');
  addTail(spades);
  addTail(clubs);
}

function addTail(symbol) {
  if (symbol.length > 0) {
    for (let i = 0; i < symbol.length; i++) {
      const tail = document.createElement('div');
      tail.classList.add('tail');
      symbol[i].append(tail);
    }
  }
}

// Function to clear out the initial button and create new buttons to play the game.
function createButtons() {
  let game = document.querySelector('#start-game');
  game.parentNode.removeChild(game);
  const buttons = ['Shuffle', 'Show/Hide', 'Magic'];
  const ids = ['shuffle', 'show-hide', 'magic'];
  for (let btn in buttons) {
    let buttonElement = document.createElement('button');
    buttonElement.id = ids[btn];
    buttonElement.innerHTML = buttons[btn];
    buttonElement.classList.add('btn', 'btn-lg', 'btn-secondary', `${buttons[btn]}`);
    buttonsWrapper.append(buttonElement);
  }

  document.querySelector('#show-hide').addEventListener('click', hideCards);
  document.querySelector('#shuffle').addEventListener('click', shuffle);
  document.querySelector('#magic').addEventListener('click', magic);
}

let showCards = false;
function hideCards() {
  showCards = !showCards;
  showCards ? cardsWrapper.classList.add('hidden') :
    cardsWrapper.classList.remove('hidden');
  let suits = document.querySelectorAll('.card div')
  for (let i = 0; i < suits.length; i++) {
    if (showCards) {
      suits[i].style.display = 'none';
    } else {
      suits[i].style.display = 'block';
    }
  }
}

function shuffle() {
  cards = [];
  createCards(true);
}

function magic() {
  cards = [];
  createCards(false);
}

// Function to start the game by clearing the wrapper, creating
// and appending the buttons and all the cards to the DOM
function startGame() {
  createButtons();
  createCards();
}

document.getElementById('start-game').addEventListener('click', startGame);
