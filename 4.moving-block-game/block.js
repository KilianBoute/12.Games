import {getInputDirection} from './input.js'
export const blockSpeed = 10;
const blockBody = [{x: 11, y: 11}, {x: 11, y: 11}];
let lifeCount = 3;

export const update = () => {
    const inputDirection = getInputDirection();
    for (let i = blockBody.length - 2; i >= 0; i--){
        blockBody[i + 1] = {...blockBody[i]};
    }

    blockBody[0].x += inputDirection.x;
    blockBody[0].y += inputDirection.y;

    if(blockBody[0].x > 21) blockBody[0].x -= 21;
    if(blockBody[0].y > 21) blockBody[0].y -= 21;
    if(blockBody[0].x < 1) blockBody[0].x += 21;
    if(blockBody[0].y < 1) blockBody[0].y += 21;
} 

export const draw = (board) => {
    let i = 1;
    blockBody.forEach(segment => {
        i++;
        const blockElement = document.createElement('div');
        blockElement.style.gridRowStart = segment.x;
        blockElement.style.gridColumnStart = segment.y;
        blockElement.classList.add('player-block');
        if(i%2 === 1){
            blockElement.classList.add('faded');
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
        console.log(equalPositions(element, blockBody[0]));
        return equalPositions(element, blockBody[0]);
    });
}

const equalPositions = (pos1, pos2) => {
    return (pos1.x === pos2.x && pos1.y === pos2.y)
}