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
const dealerCards = [];

let userTotal = 0;
let dealerTotal = 0;

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

    divCard.style.border = "1px solid black";

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

const updateDealerCards = () => {
    divDealerCards.innerHTML = "";
    if (dealerCards.length > 0) {
        dealerCards.forEach(card => {
            divDealerCards.appendChild(generateCard(card.suit, card.rank, card.value));
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
    userTotal = 0;
    dealerTotal = 0; 
}

const checkIfWon = () => {
    const newMsg = document.createElement('p');
    playerCards.forEach(card => {
        userTotal += card.value;
    });
    if (userTotal === 21) {
        console.log('BLACKJACK');
        newMsg.textContent = "BLACKJACK";
        divMessages.appendChild(newMsg);
        resetGame();
    } else if (userTotal > 21) {
        console.log('bust');
        newMsg.textContent = 'BUST';
        divMessages.appendChild(newMsg);
        resetGame();
    } else {
        console.log("keep playing " + userTotal);
    }
}

const handleDealerTurn = () => {
    const newMsg = document.createElement('p');
    dealerCards.forEach(card => {
        dealerTotal += card.value;
    });
    if(dealerTotal <= 11){
        dealerCards.push(deckList.pop());
        newMsg.textContent = "Dealer hits";
    }
    updateDealerCards();
}

const stand = (player) => {
    const newMsg = document.createElement('p');
    newMsg.textContent = player + " is standing."
    divMessages.appendChild(newMsg);
}

//start of game:
resetGame();


btnDeal.addEventListener("click", () => {
    divMessages.innerHTML = "";

    //Deal player cards
    playerCards.push(deckList.pop());
    playerCards.push(deckList.pop());
    updatePlayerCards();
    //Deal dealer cards
    dealerCards.push(deckList.pop());
    dealerCards.push(deckList.pop());
    updateDealerCards();
   
    checkIfWon();
    btnDeal.disabled = true;
    btnHit.disabled = false;
})

btnHit.addEventListener('click', () => {
    playerCards.push(deckList.pop());
    updatePlayerCards();
    handleDealerTurn();
    checkIfWon();
});

btnStand.addEventListener('click', () => {
    handleDealerTurn();
    stand("Player");
});


