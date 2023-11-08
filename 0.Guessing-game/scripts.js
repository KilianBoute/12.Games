const main = document.querySelector('main');
const form = document.querySelector('form');
const inputNumber = document.querySelector('#inputNumber');
const errorMessages = document.querySelector('.error-messages');

let targetNumber;
const minValue = 1;
const maxValue = 25;

const generateRandomNumber = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); 
}

targetNumber = generateRandomNumber(minValue, maxValue);

// Show number for testing:
// const randomNr = document.createElement('p');
// randomNr.innerText = targetNumber;
// main.appendChild(randomNr);

console.log(targetNumber);

form.addEventListener('submit', (event) => {
    let number = parseInt(inputNumber.value);
    if(number < minValue || number > maxValue){
        const rangeError = document.createElement('p');
        rangeError.textContent = "Number must be between 1 and 25.";
        rangeError.style.color = "red";
        errorMessages.appendChild(rangeError);
        inputNumber.value = "";
        event.preventDefault();
    } else if(number !== targetNumber){
        alert('NOPE');
        errorMessages.innerHTML = "";
        inputNumber.value = "";
        event.preventDefault();
    } else {
        errorMessages.innerHTML = "";
        inputNumber.disabled = true;
        alert('YAY IT WAS ' + targetNumber);
    }
})