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

let playerTotal = 0;
let dealerTotal = 0;

const statusList = ["new", "hit", "stand", "won", "bust"];
let dealerStatus = statusList[0];
let playerStatus = statusList[0];
let gameIsDone = false;

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

const generateMessage = (message) => {

    const newMessage = document.createElement('p');
    newMessage.textContent = (message);
    divMessages.prepend(newMessage);  

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

const resetButtons = () => {
    btnDeal.disabled = false;
    btnHit.disabled = true;
    btnStand.disabled = true;
}

const resetGame = () => {
    gameIsDone = false;
    divMessages.innerHTML = "";
    divPlayerCards.innerHTML = "";
    divDealerCards.innerHTML = "";
    playerCards.length = 0;
    dealerCards.length = 0;
    resetButtons();
    playerTotal = 0;
    dealerTotal = 0;
    playerStatus = statusList[0];
    dealerStatus = statusList[0];
    generateDeck();
    shuffleDeck(deckList);
}

const stand = (player) => {
    const newMsg = document.createElement('p');
    newMsg.textContent = player + " stands."
    divMessages.appendChild(newMsg);
}

const setPlayerStatus = () => {
    //get total player card value:
    let newTotal = 0;
    playerCards.forEach(card => {
        if(card.rank === "Ace" && newTotal+11 > 21){
            newTotal += 1;
        } else {
        newTotal += card.value;
        }
    });
    playerTotal = newTotal;

    //Check if player has won or bust already:
    if (playerTotal === 21) {
        playerStatus = statusList[3];
    } else if (playerTotal > 21) {
        playerStatus = statusList[4];
    } else {
        console.log("keep playing " + playerTotal);
    }

    console.log("player: " + playerStatus)
}

const handlePlayerTurn = () => {
    switch (playerStatus) {
        case statusList[0]:
            console.log('All ok');
            generateMessage("You have " + playerTotal + ".");
            break;
        case statusList[3]:
            console.log('21');
            generateMessage("Blackjack!");
            generateMessage("You have won!");
            generateMessage("Select deal to play again.");
            resetButtons();
            gameIsDone = true;
            break;
        case statusList[4]:
            console.log('BUST');
            generateMessage("Bust!");
            generateMessage("You have lost.");
            generateMessage("Select deal to play again.");
            resetButtons();
            gameIsDone = true;
            break;
        default: return;
    }
}


//Dealer logic:
const setDealerStatus = () => {
    let newTotal = 0;
    dealerCards.forEach(card => {
        if(card.rank === "Ace" && newTotal+11>21){
            newTotal += 1;
        } else {
        newTotal += card.value;
        }
    });
    dealerTotal = newTotal;

    if (dealerTotal < 14 || dealerTotal < playerTotal) {
        dealerStatus = statusList[1];
    } else if (dealerTotal > 14 && dealerTotal < 21) {
        dealerStatus = statusList[2];
    } else if (dealerTotal === 21) {
        dealerStatus = statusList[3];
    } else if (dealerTotal > 21) {
        dealerStatus = statusList[4];
    }

    console.log("Dealer: " + dealerStatus);
}

const handleDealerTurn = () => {
    switch (dealerStatus) {
        case statusList[1]:
            generateMessage("Dealer has " + dealerTotal + ".");
            break;
        case statusList[2]:
            generateMessage("Dealer has " + dealerTotal + ".");
            generateMessage("Dealer stands.");
            break;
        case statusList[3]:
            generateMessage("Dealer has 21!");
            generateMessage("You have lost.");
            generateMessage("Select deal to play again.");
            resetButtons();
            gameIsDone = true;
            break;
        case statusList[4]:
            generateMessage("Dealer has bust!");
            generateMessage("You have won.");
            generateMessage("Select deal to play again.");
            resetButtons();
            gameIsDone = true;
            break;
        default: return;
    }
}

////////////////////////////////////////////////////////////////
//start of game: /////////////////////////////////////////////
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

    setPlayerStatus();
    setDealerStatus();

    handlePlayerTurn();
    if(!gameIsDone){
        handleDealerTurn();
    }

    setPlayerStatus();
    setDealerStatus();

    btnDeal.disabled = true;
    btnHit.disabled = false;
    btnStand.disabled = false;
    if(gameIsDone){
        resetButtons();
    }
})

btnHit.addEventListener('click', () => {
    playerCards.push(deckList.pop());
    updatePlayerCards();

    setPlayerStatus();
    handlePlayerTurn();
    if(!gameIsDone){ 
        if(dealerStatus === statusList[1]){
            dealerCards.push(deckList.pop());
            updateDealerCards();
        }
        setDealerStatus();
        handleDealerTurn();
        setDealerStatus();
    }
});

btnStand.addEventListener('click', () => {
    generateMessage("You stand.");
    if(dealerStatus === statusList[1]){
        dealerCards.push(deckList.pop());
        updateDealerCards();
    }
    setDealerStatus();
       
    if(dealerStatus === statusList[2]){
        if(playerTotal <= dealerTotal){
            generateMessage("You have lost!");
            generateMessage("Select deal to play again.");
            resetButtons();
            gameIsDone = true;
        }
    }

    handleDealerTurn();
    setDealerStatus();
});


