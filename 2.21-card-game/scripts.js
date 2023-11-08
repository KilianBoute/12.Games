const main = document.querySelector('main');
const dealerCards = document.querySelector(`.dealerCardsClass`);
const deck = document.querySelector(`.deckClass`);
const playerCards = document.querySelector(`.playerCardsClass`);

const deckList = [];

const suits = ["clubs", "diamonds", "hearts", "spades"];
const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King", "Ace"];

const generateDeck = () => {
    suits.forEach(suit => {
        ranks.forEach(rank => {
            let value;
            if(rank === "Ace"){
                value = 11;
            } else if (rank.length > 2){
                value = 10;
            } else {
                value = parseInt(rank);
            }
            let card = {suit: suit, rank: rank, value: value};
            deckList.push(card);
        });
    });
}

const shuffleDeck = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

generateDeck();
shuffleDeck(deckList);
console.log(deckList);



