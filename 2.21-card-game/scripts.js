const main = document.querySelector('main');
const divDealerCards = document.querySelector(`.dealer-cards`);
const divDeck = document.querySelector(`.deck`);
const divPlayerCards = document.querySelector(`.player-cards`);
const divMessages = document.querySelector('.messages');

const btnDeal = document.querySelector('#btnDeal');
const btnHit = document.querySelector('#btnHit');
const btnStand = document.querySelector('#btnStand');

const deckList = [];

const suits = ["clubs", "diamonds", "hearts", "spades"];
const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King", "Ace"];

const playerCards = [];

const generateCard = (suit, rank, value) => {
    const divCard = document.createElement('div');
    divCard.className = 'card';
    const cardSuit = document.createElement('p');
    cardSuit.className = 'card-suit';
    cardSuit.textContent = suit;
    const cardRank = document.createElement('p');
    cardRank.className = 'card-rank';
    cardRank.textContent = rank;

    divCard.appendChild(cardRank);
    divCard.appendChild(cardSuit);

    return divCard;
}

const generateDeck = () => {
    deckList.length = 0;
    suits.forEach(suit => {
        ranks.forEach(rank => {
            let value;
            if (rank === "Ace") {
                value = 11;
            } else if (rank.length > 2) {
                value = 10;
            } else {
                value = parseInt(rank);
            }
            let card = { suit: suit, rank: rank, value: value };
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

const updatePlayerCards = () => {
    divPlayerCards.innerHTML = "";
    if (playerCards.length > 0) {
        playerCards.forEach(card => {
            divPlayerCards.appendChild(generateCard(card.suit, card.rank, card.value));
        });
    }
}

const resetGame = () => {
    generateDeck();
    shuffleDeck(deckList);
    playerCards.length = 0;
    divPlayerCards.innerHTML = "";
    document.querySelectorAll('button').forEach(btn => {
        btn.disabled = false;
    });
    btnHit.disabled = true;
}

const checkIfWon = () => {
    let total = 0;
    const newMsg = document.createElement('p');
    playerCards.forEach(card => {
        total += card.value;
    });
    if (total === 21) {
        console.log('BLACKJACK');
        newMsg.textContent = "BLACKJACK";
        divMessages.appendChild(newMsg);
        resetGame();
    } else if (total > 21) {
        console.log('bust');
        newMsg.textContent = 'BUST';
        divMessages.appendChild(newMsg);
        resetGame();
    } else {
        console.log("keep playing " + total);
    }
}

//start of game:
resetGame();


btnDeal.addEventListener("click", () => {
    divMessages.innerHTML = "";
    playerCards.push(deckList.pop());
    playerCards.push(deckList.pop());
    updatePlayerCards();
    checkIfWon();
    btnDeal.disabled = true;
    btnHit.disabled = false;
})

btnHit.addEventListener('click', () => {
    playerCards.push(deckList.pop());
    updatePlayerCards();
    checkIfWon();
});


