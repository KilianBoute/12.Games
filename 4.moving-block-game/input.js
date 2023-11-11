let inputDirection = { x: 0, y: 0 };

window.addEventListener('keydown', e => {
    switch (e.key) {
        case 'ArrowUp':
            inputDirection = {x: -1, y: 0};
            console.log(inputDirection);
            break;
        case 'ArrowRight':
            inputDirection = {x: 0, y: 1};
            console.log(inputDirection);
            break;
        case 'ArrowDown':
            inputDirection = {x: 1, y: 0};
            console.log(inputDirection);
            break;
        case 'ArrowLeft':
            inputDirection = {x: 0, y: -1};
            console.log(inputDirection);
            break;
        default: return;
    }
})

export const getInputDirection = () => {
    return inputDirection;
}