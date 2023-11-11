const divBoard = document.querySelector('.board');
const divControls = document.querySelector('.controls');
const divInfo = document.querySelector('.info');
const btnReset = document.querySelector('#resetButton');

const cardList = [];

let activeCard = null;
let awaitingEndOfMove = false;
let totalRevealed = 0;
let moveCount = 1;

for (let i = 1; i < 10; i++) {
    const card = {
        id: i,
        image: "url('images/" + i + ".png')"
    }
    cardList.push(card);
}

cardListDouble = [...cardList, ...cardList];

const shuffleCards = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    return array;
}

cardListDouble = shuffleCards(cardListDouble);


const generateBoard = () => {
    cardListDouble.forEach(card => {
        const divCard = document.createElement('div');
        divCard.classList.add("card");
        divCard.classList.add('flipped');
        divCard.style.backgroundImage = card.image;
        divCard.id = card.id;
        divCard.isLocked = false;
        divCard.addEventListener('click', (e) => {

            const card = e.target;

            if (card.isLocked === true || awaitingEndOfMove || card === activeCard) {
                return;
            }

            card.classList.toggle('flipped');

            if (!activeCard) {
                activeCard = card;
                return;
            }

            if (activeCard.id === card.id) {
                activeCard.classList.remove('flipped');
                card.classList.remove('flipped');
                activeCard.isLocked = true;
                card.isLocked = true;
                activeCard = null;
                totalRevealed += 2;
                moveCount += 1;
            } else {
                awaitingEndOfMove = true;
                setTimeout(() => {
                    activeCard.classList.toggle('flipped');
                    card.classList.toggle('flipped');
                    awaitingEndOfMove = false;
                    activeCard = null;
                    moveCount += 1;
                }, 1000);
            }

            console.log(moveCount);
            if (totalRevealed === cardListDouble.length) {
                alert('Congatulations! Select reset to play again. \n Score: ' + moveCount);
            }

        });

        divBoard.appendChild(divCard);
    });
}

generateBoard();

btnReset.addEventListener('click', () => {
    activeCard = null;
    awaitingEndOfMove = false;
    totalRevealed = 0;
    moveCount = 0;
    divBoard.innerHTML = "";
    cardListDouble = shuffleCards(cardListDouble);
    generateBoard();
});







