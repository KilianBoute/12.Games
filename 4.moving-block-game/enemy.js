import { onBlock, decreaseLifeCount, gameOver } from "./block.js";

let enemies = [{ x: 2, y: 2 }, { x: 20, y: 2 }, { x: 20, y: 20 }, { x: 2, y: 20 }];

let lastDirections = [];
for (let i = 0; i < enemies.length; i++) {
    lastDirections.push({ x: 0, y: 0 });
}

export const update = () => {
    for (let i = 0; i < enemies.length; i++) {
        enemies[i].x += randomDirection(i).x;
        enemies[i].y += randomDirection(i).y;

        if (enemies[i].x > 21) enemies[i].x -= 21;
        if (enemies[i].y > 21) enemies[i].y -= 21;
        if (enemies[i].x < 1) enemies[i].x += 21;
        if (enemies[i].y < 1) enemies[i].y += 21;
    }

    if (onBlock(enemies)) {
        decreaseLifeCount();
        console.log("-1");
    }

    if (gameOver()) {
        //    alert('BOEM')
        console.log('GAME OVER');
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

// const isOpposite = (direction1, direction2) => {
//     return direction1.x === -direction2.x && direction1.y === -direction2.y;
// };

// let testIndex = 1;
// const randomDirection = (i) => {
//     let randomValue = Math.floor(Math.random() * 2); // 0 or 1

//     let enemyDirection;

//     if (randomValue === 0) {
//         enemyDirection = { x: 0, y: Math.random() > 0.5 ? 1 : -1 }; // x is 0, y is 1 or -1
//     } else {
//         enemyDirection = { x: Math.random() > 0.5 ? 1 : -1, y: 0 }; // x is 1 or -1, y is 0
//     }

//     testIndex++;
//     if(testIndex%4 === 0) console.log(enemyDirection.x  + " and " + lastDirections[i].x);

//     if (lastDirections[i] && isOpposite(lastDirections[i], enemyDirection)) {
//         return randomDirection(i); // Increment i to avoid an infinite loop
//     } else {
//         lastDirections[i] = enemyDirection;
//         return enemyDirection;
//     }
// };


// const isOpposite = (direction) => {

//     switch (direction) {
//         case { x: 0, y: 1 }:
//             return { x: 0, y: -1 };
//         case { x: 0, y: -1 }:
//             return { x: 0, y: 1 };
//         case { x: 1, y: 0 }:
//             return { x: -1, y: 0 };
//         case { x: -1, y: 0 }:
//             return { x: 1, y: 0 };
//     }
// }



const randomDirection = () => {
    let randomNumber = Math.floor(Math.random() * 4);
    let enemyDirection;

    console.log(randomNumber)

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