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
const currentOperation = document.querySelector('.currentOperation');
const numPanel = document.querySelectorAll('.numb');
const Delete = document.querySelector('#backspace');
const operators = document.querySelectorAll('.function');
const pastDisplay = document.querySelector('#past');
const rst = document.querySelector('.result');
const DeleteAll = document.querySelector('.delete');
const invert = document.querySelector('.invert');

let pastDisplayNumbers = '';
let currentDisplayNumbers = '';
let operationFunction;

window.addEventListener('keydown', displayNumber);
window.addEventListener('keydown', midWay);
window.addEventListener('keydown', (e) => e.key === 'Enter' ? result() : '');
window.addEventListener('keydown', clear);
numPanel.forEach( n => n.addEventListener('click', displayNumber));
Delete.addEventListener('click', displayNumber);
rst.addEventListener('click', result);
operators.forEach(op => op.addEventListener('click', midWay));
DeleteAll.addEventListener('click', clear);
invert.addEventListener('click', invertNumber)

function displayNumber(e) {

    if(!isNaN(e.key)) {
        if(currentDisplayNumbers.length === 16) return;
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

    if(!isNaN(this.textContent) || this.textContent == '.' || e.key === '.') {
        if(currentDisplayNumbers.includes('.') && (this.textContent === '.' || e.key === '.') ) return;
        if((this.textContent == '.' || e.key === '.') && currentDisplayNumbers === '') currentDisplayNumbers = 0;
        if(currentDisplayNumbers.length === 17) return;
        e.key === '.' ? currentDisplayNumbers += '.' : currentDisplayNumbers += this.textContent;
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
    
    switch(e.key || e.target.textContent){
        case '+':
        operationFunction = add;
        if(pastDisplayNumbers === '') pastDisplayNumbers = currentDisplayNumbers;
        pastDisplay.textContent = pastDisplayNumbers;
        currentDisplayNumbers = '';
        currentDisplay.textContent = '0';
        currentOperation.textContent = '+'
        break;

        case '-':
        operationFunction = subtract;
        if(pastDisplayNumbers === '') pastDisplayNumbers = currentDisplayNumbers;
        pastDisplay.textContent = pastDisplayNumbers;
        currentDisplayNumbers = '';
        currentDisplay.textContent = '0';
        currentOperation.textContent = '-'
        break;

        case '*':
        operationFunction = multiply;
        if(pastDisplayNumbers === '') pastDisplayNumbers = currentDisplayNumbers;
        pastDisplay.textContent = pastDisplayNumbers;
        currentDisplayNumbers = '';
        currentDisplay.textContent = '0';
        currentOperation.textContent = '*'
        break;

        case '/':
        operationFunction = divide;
        if(pastDisplayNumbers === '') pastDisplayNumbers = currentDisplayNumbers;
        pastDisplay.textContent = pastDisplayNumbers;
        currentDisplayNumbers = '';
        currentDisplay.textContent = '0';
        currentOperation.textContent = '/'
        break;
    };
};

function result() {
    if(pastDisplayNumbers === '') return;
    currentDisplay.textContent = '';
    pastDisplayNumbers = operate(operationFunction ,+pastDisplayNumbers, +currentDisplayNumbers);
    pastDisplay.textContent = pastDisplayNumbers;
    currentDisplayNumbers = '';
}

function clear(e) {

    if(!(e.key === 'Delete' || this.textContent === 'CE')) return;

    pastDisplayNumbers = '';
    currentDisplayNumbers = '';
    delete operationFunction;

    currentDisplay.textContent = '0';
    pastDisplay.textContent = '';
    currentOperation.textContent = '';
};

function invertNumber() {
    currentDisplayNumbers[0] === '-' ? currentDisplayNumbers = currentDisplayNumbers.substring(1) : currentDisplayNumbers = '-' + currentDisplayNumbers;
    currentDisplay.textContent = currentDisplayNumbers;
};
