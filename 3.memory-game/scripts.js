const divBoard = document.querySelector('.board');
const divControls = document.querySelector('.controls');
const divInfo = document.querySelector('.info');

const cardList = [];

let activeCard = null;
let awaitingEndOfMove = false;

for(let i = 1; i < 10; i++){
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
}

shuffleCards(cardListDouble);

cardListDouble.forEach(card => {
    const divCard = document.createElement('div');
        divCard.classList.add("card");
        divCard.classList.add('flipped');
        divCard.style.backgroundImage = card.image;
        divCard.id = card.id;
        divCard.isLocked = false;
        divCard.addEventListener('click', (e) => {

            const card = e.target;

            if(card.isLocked === true){
                return;
            }

            if(awaitingEndOfMove){
                console.log("Not so fast.");
                return;
            }

         
            card.classList.toggle('flipped');

            if(!activeCard){ 
                activeCard = card; 
                return;
            }

            if(activeCard.id === card.id){
                console.log("match");
                activeCard.classList.remove('flipped');
                card.classList.remove('flipped');
                activeCard.isLocked = true;
                card.isLocked = true;
                activeCard = null;
            } else {

            awaitingEndOfMove = true;

            console.log(activeCard);

            setTimeout(() => {
            activeCard.classList.toggle('flipped');
            card.classList.toggle('flipped');
            console.log("no match");

            awaitingEndOfMove = false;
            activeCard = null;
            }, 1000);
            }
            console.log(activeCard);
           
        


        });

        divBoard.appendChild(divCard);
});








