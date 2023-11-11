import { onBlock, decreaseLifeCount } from "./block.js";

let enemies = [{ x: 2, y: 2}, {x: 20, y: 2}, {x: 20, y: 20}, {x: 2, y: 20}];

export const update = () => {
    /*
    const inputDirection = getInputDirection();
    console.log('update block');
    for (let i = blockBody.length - 2; i >= 0; i--){
        blockBody[i + 1] = {...blockBody[i]};
    }

    blockBody[0].x += inputDirection.x;
    blockBody[0].y += inputDirection.y;
    */

    if(onBlock(enemies)){
        alert('BOEM');
        decreaseLifeCount();
    }

}  

export const draw = (board) => {
    enemies.forEach(enemy => {
        const enemyElement = document.createElement('div');
        enemyElement.style.gridRowStart = enemy.x;
        enemyElement.style.gridColumnStart = enemy.y;
        enemyElement.classList.add('enemy-block');
        board.appendChild(enemyElement);
    });
}