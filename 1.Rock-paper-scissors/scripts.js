const main = document.querySelector('main');
const buttonRock = document.querySelector("#btnRock");
const buttonPaper = document.querySelector("#btnPaper");
const buttonScissors = document.querySelector("#btnScissors");
const gameMessage = document.querySelector('.game-message');
const results = document.querySelector('.results');
const computerWins = document.querySelector('#computerWins');
const playerWins = document.querySelector("#playerWins");
const drawAmount = document.querySelector("#playerWins");

const buttons = [buttonRock, buttonPaper, buttonScissors];
const gameValues = ["rock", "paper", "scissors"];

let computerGamesWon = 0;
let userGamesWon = 0;
let gamesDrawn = 0;

const getNewComputerValue = () => {
    return gameValues[Math.floor(Math.random() * 3)];
}
let computerValue = getNewComputerValue();

const checkValue = (event) => {
    const buttonValue = event.target.value;
    console.log(computerValue);
    if (computerValue === buttonValue) {
        gameMessage.textContent = "IT'S A DRAW";
        gamesDrawn++;
    } else {
        switch (buttonValue) {
            case 'rock':
                if (computerValue === "scissors") {
                    gameMessage.textContent = "YOU WON!";
                    userGamesWon++;
                } else if (computerValue === "paper") {
                    gameMessage.textContent = "YOU LOST!";
                    computerGamesWon++;
                }
                break;
            case 'paper':
                if (computerValue === "rock") {
                    gameMessage.textContent = "YOU WON!";
                    userGamesWon++;
                } else if (computerValue === "scissors") {
                    gameMessage.textContent = "YOU LOST!";
                    computerGamesWon++;
                }
                break;
            case 'scissors':
                if (computerValue === "paper") {
                    gameMessage.textContent = "YOU WON!";
                    userGamesWon++;
                } else if (computerValue === "rock") {
                    gameMessage.textContent = "YOU LOST!";
                    computerGamesWon++;
                }
                break;
            default:
                return;
        }
    }

}

const updateResults = () => {
    results.textContent = "SCORE: " + "Computer: " + computerGamesWon + " You: " + userGamesWon + " Draws: " + gamesDrawn 
    console.log(computerWins);
    computerWins.textContent = "Computer: " + computerGamesWon;
    playerWins.textContent = "You: " + userGamesWon;
    drawAmount.textContent = "Draws: " + gamesDrawn;
}

buttons.forEach(element => {
    element.addEventListener('click', (event) => {
        checkValue(event);
        computerValue = getNewComputerValue();
        updateResults();
    })
});
