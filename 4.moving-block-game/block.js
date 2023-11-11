import {getInputDirection} from './input.js'
export const blockSpeed = 2;
const blockBody = [{x: 11, y: 11}, {x: 11, y: 11}];


export const update = () => {
    const inputDirection = getInputDirection();
    console.log('update block');
    for (let i = blockBody.length - 2; i >= 0; i--){
        blockBody[i + 1] = {...blockBody[i]};
    }

    blockBody[0].x += inputDirection.x;
    blockBody[0].y += inputDirection.y;
} 

export const draw = () => {
    console.log('draw block');
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
        console.log(blockElement.classList)
        board.appendChild(blockElement);
    });
    
      
}