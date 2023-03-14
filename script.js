function add() {
    const numbers = Array.from(arguments);
    return numbers.reduce((acumulator, CurrentValue) => acumulator += CurrentValue);
};

function subtract(){
    const numbers = Array.from(arguments);
    return numbers.reduce((acumulator, CurrentValue) => acumulator -= CurrentValue);
};

function multiply(){
    const numbers = Array.from(arguments);
    return numbers.reduce((acumulator, CurrentValue) => acumulator *= CurrentValue);
};

function divide(){
    const numbers = Array.from(arguments);
    return numbers.reduce((acumulator, CurrentValue) => acumulator /= CurrentValue);
};

function operate(operator, x, y){
    return operator(x,y);
};

const currentDisplay = document.querySelector('#current');
const numPanel = document.querySelectorAll('.numb');
const Delete = document.querySelector('#backspace');
const operators = document.querySelector('.function');
const pastDisplay = document.querySelector('#past');
const rst = document.querySelector('.result');

let pastDisplayNumbers = '';
let currentDisplayNumbers = '';
let operationFunction;

window.addEventListener('keydown', displayNumber);
window.addEventListener('keydown', midWay);
numPanel.forEach( n => n.addEventListener('click', displayNumber));
Delete.addEventListener('click', displayNumber);
rst.addEventListener('click', result);

function displayNumber(e) {

    console.log(e)

    if(!isNaN(e.key)) {
        if(currentDisplayNumbers.length === 17) return;
        currentDisplayNumbers += e.key;
        currentDisplay.textContent = currentDisplayNumbers;
    };

    if(e.key === 'Backspace') {
        currentDisplayNumbers = currentDisplayNumbers.slice(0 , -1);
        if(currentDisplayNumbers.length == 0) {
            return currentDisplay.textContent = '0';
        };
        currentDisplay.textContent = currentDisplayNumbers;
    };

    if(!isNaN(this.textContent) || this.textContent == '.') {
        if(currentDisplayNumbers.includes('.') && this.textContent === '.') return;
        if(this.textContent == '.' && currentDisplayNumbers === '') currentDisplayNumbers = 0;
        if(currentDisplayNumbers.length === 17) return;
        currentDisplayNumbers += this.textContent;
        currentDisplay.textContent = currentDisplayNumbers;
    };

    if(this.textContent === 'C'){
        currentDisplayNumbers = currentDisplayNumbers.slice(0 , -1);
        if(currentDisplayNumbers.length == 0) {
            return currentDisplay.textContent = '0';
        };
        currentDisplay.textContent = currentDisplayNumbers;
    };

};

function midWay(e) {
    
    switch(e.key){
        case '+':
        operationFunction = add;
        pastDisplayNumbers = currentDisplayNumbers;
        pastDisplay.textContent = pastDisplayNumbers;
        currentDisplayNumbers = '';
        currentDisplay.textContent = '0';
        break;

        case '-':
        operationFunction = subtract;
        pastDisplayNumbers = currentDisplayNumbers;
        pastDisplay.textContent = pastDisplayNumbers;
        currentDisplayNumbers = '';
        currentDisplay.textContent = '0';
        break;

        case '*':
        operationFunction = multiply;
        pastDisplayNumbers = currentDisplayNumbers;
        pastDisplay.textContent = pastDisplayNumbers;
        currentDisplayNumbers = '';
        currentDisplay.textContent = '0';
        break;

        case '/':
        operationFunction = divide;
        pastDisplayNumbers = currentDisplayNumbers;
        pastDisplay.textContent = pastDisplayNumbers;
        currentDisplayNumbers = '';
        currentDisplay.textContent = '0';
        break;
    };
};

function result() {
    pastDisplay.textContent = '';
    currentDisplayNumbers = operate(operationFunction ,+pastDisplayNumbers, +currentDisplayNumbers);
    currentDisplay.textContent = currentDisplayNumbers;
}

