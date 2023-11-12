import { update as updateBlock, draw as drawBlock, 
    gameOver as checkGameOver, resetLifeCount as resetLifeCount, 
    updateStatus as updateStatus, drawStatus as drawStatus,
     blockSpeed, lifeCount, score } from './block.js';
import { update as updateEnemy, draw as drawEnemy } from './enemy.js'

let lastRenderTime = 0;
const board = document.querySelector('#board');
const statusBar = document.querySelector('#status-bar');
let gameOver = false;

const generateStartScreen = () => {
    board.innerHTML = "";
    const startContainer = document.createElement('div');
    startContainer.className = "container-start";
    const title = document.createElement('h1');
    title.textContent = 'BLOC';
    const startMsg = document.createElement('p');
    startMsg.textContent = 'press space to start game.';
    startMsg.className = 'blink'

    startContainer.appendChild(title);
    startContainer.appendChild(startMsg);
    board.appendChild(startContainer);

    gameOver = false;
    resetLifeCount();
}

generateStartScreen();

const main = (currentTime) => {
    if (gameOver) {
        alert('GAME OVER \n FINAL SCORE: ' + score);
        return window.location = "index.html";

        //Without alert; unable to stop updating:
        // setTimeout(() => {
        //     board.innerHTML = "";
        //     const endContainer = document.createElement('div');
        //     endContainer.className = "container-start";
        //     const title = document.createElement('h1');
        //     title.textContent = 'GAME OVER';
        //     const endMsg = document.createElement('p');
        //     endMsg.textContent = 'final score: ' + score;
    
        //     endContainer.appendChild(title);
        //     endContainer.appendChild(endMsg);
        //     board.appendChild(endContainer);
      
        // return window.location = "index.html";
        //   }, 100000);
    }

    window.requestAnimationFrame(main);
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
    if (secondsSinceLastRender < 1 / blockSpeed) { return; }
    lastRenderTime = currentTime;

    update();
    draw();
}

window.addEventListener('keydown', e => {
    if (e.key === " ") {
        board.innerHTML = "";
        console.log(e.key)
        window.requestAnimationFrame(main);
    }
})


const update = () => {
    updateBlock();
    updateEnemy();
    checkDeath();
}

const draw = () => {
    board.innerHTML = "";
    drawBlock(board);
    drawEnemy(board);
    drawStatus(statusBar);
}

const checkDeath = () => {
    console.log(lifeCount)
    gameOver = checkGameOver();
}