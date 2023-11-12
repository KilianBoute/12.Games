import { onBlock, decreaseLifeCount, gameOver } from "./block.js";

let enemies = [{ x: 2, y: 2 }, { x: 20, y: 2 }, { x: 20, y: 20 }, { x: 2, y: 20 }];

//let lastDirections = [{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }];
let lastDirections = [];
for (let i = 0; i < enemies.length; i++) {
    lastDirections.push({ x: 0, y: 0 });
}


export const update = () => {
    for (let i = 0; i < enemies.length; i++) {
        const newDirection = randomDirection(i);

        if(i === 0){
        console.log(i + ": ")
        console.log(newDirection)
        }

        enemies[i].x += newDirection.x;
        enemies[i].y += newDirection.y;

        //prevent block from leaving board:
        if (enemies[i].x > 21) enemies[i].x -= 21;
        if (enemies[i].y > 21) enemies[i].y -= 21;
        if (enemies[i].x < 1) enemies[i].x += 21;
        if (enemies[i].y < 1) enemies[i].y += 21;
    }

    if (onBlock(enemies)) {
        decreaseLifeCount();
        console.log("-1");
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

let testInt = 1;
const randomDirection = (i) => {
    let randomNumber = Math.floor(Math.random() * 4);
    let enemyDirection;

    switch (randomNumber) {
        case 0:
            if(lastDirections[i].x === 1){ enemyDirection = randomDirection(i); break};
            enemyDirection = { x: -1, y: 0 };
            break;
        case 1:
            if(lastDirections[i].x === -1){ enemyDirection = randomDirection(i); break};
            enemyDirection = { x: 1, y: 0 };
            break;
        case 2:
            if(lastDirections[i].y === 1){ enemyDirection = randomDirection(i); break};
            enemyDirection = { x: 0, y: -1 };
            break;
        case 3:
            if(lastDirections[i].y === -1){ enemyDirection = randomDirection(i); break};
            enemyDirection = { x: 0, y: 1 };
            break;
        default:  
            enemyDirection = { x: 0, y: 0 };
            return;
    }

    lastDirections[i] = enemyDirection;
    testInt++;
  
    return enemyDirection;
}