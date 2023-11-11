import { onBlock, decreaseLifeCount, gameOver } from "./block.js";

let enemies = [{ x: 2, y: 2 }, { x: 20, y: 2 }, { x: 20, y: 20 }, { x: 2, y: 20 }];

export const update = () => {
    for(let i = 0; i < enemies.length; i++){
        enemies[i].x += randomDirection().x;
        enemies[i].y += randomDirection().y;

        if(enemies[i].x > 21) enemies[i].x -= 21;
        if(enemies[i].y > 21) enemies[i].y -= 21;
        if(enemies[i].x < 1) enemies[i].x += 21;
        if(enemies[i].y < 1) enemies[i].y += 21;
    }

    if (onBlock(enemies)) {
        decreaseLifeCount();
    }

    if (gameOver()) {
        alert('BOEM')
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

const randomDirection = () => {
    let randomNumber = Math.floor(Math.random() * 3);
    let enemyDirection;

    switch (randomNumber) {
        case 0:
            enemyDirection = { x: -1, y: 0 };
            break;
        case 1:
            enemyDirection = { x: 1, y: 0 };
            break;
        case 2:
            enemyDirection = { x: 0, y: -1 };
            break;
        case 3:
            enemyDirection = { x: 0, y: 1 };
            break;
        default:  
            enemyDirection = { x: 0, y: 0 };
            return;
    }

    return enemyDirection;
}