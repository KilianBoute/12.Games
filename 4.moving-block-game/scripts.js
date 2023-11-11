import { update as updateBlock, draw as drawBlock, blockSpeed } from './block.js';

let lastRenderTime = 0;
const board = document.querySelector('#board');

const main = (currentTime) => {
    window.requestAnimationFrame(main);
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
    if(secondsSinceLastRender < 1 / blockSpeed){return;}
    lastRenderTime = currentTime;
    console.log('render');

    update();
    draw();
}

window.requestAnimationFrame(main);

const update = () => {
    updateBlock();
} 

const draw = () => {
    drawBlock(board);
}