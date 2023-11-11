export const blockSpeed = 2;
const blockBody = [{x: 11, y: 11}];

export const update = () => {
    console.log('update block');
} 

export const draw = () => {
    console.log('draw block');
    blockBody.forEach(segment => {
        const blockElement = document.createElement('div');
        blockElement.style.gridRowStart = segment.x;
        blockElement.style.gridColumnStart = segment.y;
        blockElement.classList.add('player-block');
        board.appendChild(blockElement);
        console.log(board.children);
    });
     
      
}