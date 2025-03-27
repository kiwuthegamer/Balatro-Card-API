function getUrlParameter(name) {
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    return urlParams.get(name)
}

function randomOption(list) { return list[Math.floor(Math.random() * list.length)] }

// Global decks for Cards and Jokers
var deckCards = [];
var deckJokers = [];

// Function to initialize deck for cards
function initDeckCards() {
    deckCards = [];
    for (let i = 1; i <= 52; i++) {
        deckCards.push(i);
    }
}

// Function to initialize deck for jokers
function initDeckJokers(excludes) {
    deckJokers = [];
    for (let i = 1; i <= 155; i++) {
        if (!excludes.includes(i)) {
            deckJokers.push(i);
        }
    }
}

// Function to get a random element from a deck and remove it
function getCardFromDeck(deck) {
    let idx = Math.floor(Math.random() * deck.length);
    return deck.splice(idx, 1)[0];
}

var jokers = parseInt(getUrlParameter("jokers"));
var cards = parseInt(getUrlParameter("cards"));
var specialCases = parseInt(getUrlParameter("specialCases"));
var basicOnly = parseInt(getUrlParameter("basicOnly"));

var imgSRC = "Card Art/"

var options = []
if (jokers) { options.push("Jokers/") }
if (cards) { options.push("Cards/") }

var option = randomOption(options);
imgSRC += option

if (option == "Cards/") {
    // Choose the card type.
    var cardTypes = ["BASIC", "BONUS", "GLASS", "GOLD", "LUCKY", "MULT", "STEEL", "WILD"];
    var cardType = "BASIC";
    if (!basicOnly) {
        cardType = randomOption(cardTypes);
    }
    imgSRC += cardType;
    
    // Initialize deckCards if empty.
    if (deckCards.length === 0) {
        initDeckCards();
    }
    
    // Get a random card from deckCards.
    var randomIndex = getCardFromDeck(deckCards);
    imgSRC += `/${randomIndex}.png`;
}

if (option == "Jokers/") {
    let excludes;
    if (specialCases) {
        excludes = [84, 85, 86, 87, 88, 91, 92, 93, 94, 95];
    } else {
        excludes = [8, 25, 28, 32, 36, 42, 70, 72, 74, 78, 84, 85, 86, 87, 88, 91, 92, 93, 94, 95, 110, 121, 128];
    }
    
    // Initialize deckJokers if empty.
    if (deckJokers.length === 0) {
        initDeckJokers(excludes);
    }
    
    // Get a random joker from deckJokers.
    var randomIndex = getCardFromDeck(deckJokers);
    imgSRC += `${randomIndex}.png`;
}

// Create an image element, set its src, and append it to the document body.
var img = document.createElement('img');
img.src = imgSRC;
document.body.appendChild(img);
