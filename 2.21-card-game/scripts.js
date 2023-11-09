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

// let dealerWantsHit = false;
// let dealerWantsStand = false;
// let dealerHasWon = false;
// let dealerHasBust = false;

statusList = ["new", "hit", "stand", "won", "bust"];
dealerStatus = statusList[0];

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
    divMessages.innerHTML = "";
    divPlayerCards.innerHTML = "";
    divDealerCards.innerHTML = "";
    playerCards.length = 0;
    dealerCards.length = 0;
    btnDeal.disabled = false;
    btnHit.disabled = true;
    btnStand.disabled = true;
    userTotal = 0;
    dealerTotal = 0; 
    generateDeck();
    shuffleDeck(deckList);
}

const checkIfWon = () => {
    const newMsg = document.createElement('p');
    userTotal = 0;
    playerCards.forEach(card => {
        userTotal += card.value;
    });
    if (userTotal === 21) {
        console.log('BLACKJACK');
        newMsg.textContent = "BLACKJACK";
        divMessages.appendChild(newMsg);
    } else if (userTotal > 21) {
        console.log('bust');
        newMsg.textContent = 'BUST';
        divMessages.appendChild(newMsg);
        btnDeal.disabled = false;
        btnHit.disabled = true;
        btnStand.disabled = true;
    } else {
        console.log("keep playing " + userTotal);
    }
}

const stand = (player) => {
    const newMsg = document.createElement('p');
    newMsg.textContent = player + " stands."
    divMessages.appendChild(newMsg);
}

//Dealer logic:
const handleDealerTurn = () => {
    const newMsg = document.createElement('p');

    dealerCards.forEach(card => {
        dealerTotal += card.value;
    });
    console.log(dealerTotal);

    if(dealerTotal < 14 || dealerTotal < userTotal){
        dealerStatus = statusList[1];
    } else if(dealerTotal > 14 && dealerTotal < 21){
        dealerStatus = statusList[2];
    } else if(dealerTotal === 21){
        dealerStatus = statusList[3];
    } else if(dealerTotal > 21){
        dealerStatus = statusList[4];
    }
    console.log(dealerStatus);
} 

// const handleDealerTurn = () => {
//     const newMsg = document.createElement('p');

//     dealerCards.forEach(card => {
//         dealerTotal += card.value;
//     });
//     if(dealerTotal <= 14 || dealerTotal < userTotal){
//         dealerCards.push(deckList.pop());
//         handleDealerTurn();
//         newMsg.textContent = "Dealer hits";
//     } else if(dealerTotal < 21){
//         stand("Dealer");
//     } else if(dealerTotal === 21){
//         newMsg.textContent = "DEALER HAS BLACKJACK";
//         divMessages.appendChild(newMsg);
//     }
//     updateDealerCards();
// }
//


//start of game:
resetGame();


btnDeal.addEventListener("click", () => {
    resetGame();
    //Deal player cards
    playerCards.push(deckList.pop());
    playerCards.push(deckList.pop());
    updatePlayerCards();
    //Deal dealer cards
    dealerCards.push(deckList.pop());
    dealerCards.push(deckList.pop());
    updateDealerCards();
// Optional add delay to dealer turn:
//    setTimeout(() => {
        handleDealerTurn();
//    }, 3000);
   
    checkIfWon();
    btnDeal.disabled = true;
    btnHit.disabled = false;
    btnStand.disabled = false;
})

btnHit.addEventListener('click', () => {
    playerCards.push(deckList.pop());
    updatePlayerCards();
// Optional add delay to dealer turn:
//    setTimeout(() => {
        handleDealerTurn();
//    }, 3000);
    checkIfWon();
});

btnStand.addEventListener('click', () => {
    stand("Player");
    handleDealerTurn();
});


