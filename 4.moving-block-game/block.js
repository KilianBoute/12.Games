import { getInputDirection } from './input.js'
export const blockSpeed = 10;
const blockBody = [{ x: 11, y: 11 }, { x: 11, y: 11 }, { x: 11, y: 11 }];
export let lifeCount = 3;
export let score = 0;

export const update = () => {
    const inputDirection = getInputDirection();
    for (let i = blockBody.length - 2; i >= 0; i--) {
        blockBody[i + 1] = { ...blockBody[i] };
    }

    blockBody[0].x += inputDirection.x;
    blockBody[0].y += inputDirection.y;

    //prevent block from leaving board:
    if (blockBody[0].x > 21) blockBody[0].x -= 21;
    if (blockBody[0].y > 21) blockBody[0].y -= 21;
    if (blockBody[0].x < 1) blockBody[0].x += 21;
    if (blockBody[0].y < 1) blockBody[0].y += 21;

    score++;
}

export const draw = (board) => {
    let i = 0;
    blockBody.forEach(segment => {
        i++;
        const blockElement = document.createElement('div');
        blockElement.style.gridRowStart = segment.x;
        blockElement.style.gridColumnStart = segment.y;
        blockElement.classList.add('player-block');
        if (i === 2) {
            blockElement.classList.add('faded-one')
        }
        if (i === 3) {
            blockElement.classList.add('faded-two');
        }
        board.appendChild(blockElement);
    });
}

export const decreaseLifeCount = () => {
    lifeCount--;
}

export const gameOver = () => {
    return lifeCount === 0;
}

export const onBlock = (positions) => {
    return positions.some(element => {
        return equalPositions(element, blockBody[0]);
    });
}

const equalPositions = (pos1, pos2) => {
    return (pos1.x === pos2.x && pos1.y === pos2.y)
}

export const resetLifeCount = () => {
    lifeCount = 3;
}

export const updateStatus = () => {
    console.log('Not needed?');
}

export const drawStatus = (statusBar) => {
    statusBar.innerHTML = "";
    const scoreElement = document.createElement('p');
    scoreElement.textContent = "score: " + score;
    const lifeCountElement = document.createElement('div');
    for (let i = lifeCount; i > 0; i--) {
        console.log(i);
        const heart = document.createElement('i');
        heart.className = 'fa-solid fa-heart';
        heart.style.color = "#ff0000";
        lifeCountElement.appendChild(heart);
    }
    statusBar.appendChild(scoreElement);
    statusBar.appendChild(lifeCountElement);
}