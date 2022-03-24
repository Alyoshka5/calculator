const display = document.querySelector('.display');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const clear = document.querySelector('.clear');
const equal = document.querySelector('.equal');
const backspace = document.querySelector('.backspace');
const negation = document.querySelector('.negation');
const decimal = document.querySelector('.decimal');

function add(x, y) {
    return Number(x) + Number(y);
}
function substract(x, y) {
    return x - y;
}
function multiply(x, y) {
    return x * y;
}
function divide(x, y) {
    console.log(`zero: ${y}`);
    if (y == '0') {
        reset();
        return "ERROR";
    }
    return x / y;
}
function operate(num1, num2, operator) {
    console.log(num1, num2, operator);
    operatorFunctions = {'+':add, '-':substract, '*':multiply, '/':divide};
    return operatorFunctions[operator](num1, num2);
}


let num1 = [];
let num2 = [];
let operator;
let firstNum = true;  // is the user displaying the first or second number for the operation
let shownResult = false;  // was the result already shown or is the user currently putting in an operation
let answer;

function enterNumber() {
    console.log(this.name);

    if (shownResult) reset();

    if (firstNum) {  // check if program is on first or second number for operation
        if (num1.length >= 18) return;  // more values will cause an overflow
        num1.push(this.name);
        display.textContent = num1.join('');
    } else {
        if (num2.length >= 18) return;  // more values will cause an overflow
        num2.push(this.name);
        display.textContent = num2.join('');
    }
    operators.forEach(operator => operator.classList.remove('operator-active'));
}

function addOperation() {
    if (num1.length < 1) return;  // only add operation if first number was already entered
    firstNum = false;

    if (shownResult) {
        num1 = [answer];  // place into array so that result() can use join('') on it
        console.log("num1/answer = " + num1);
        num2 = [];
        shownResult = false;
    } else if (num1.length > 0 && num2.length > 0 && operator.length == 1) {  // if user adds second operation without firt pressing equal
        result();
        num1 = [answer];
        num2 = [];
        shownResult = false;
    }
    operator = this.name;  // set operator after previous operations have been displayed (if there were any)
    operators.forEach(operator => operator.classList.remove('operator-active'));
    this.classList.add('operator-active');
    console.log(operator)
}

function result() {
    if (num1.length < 1 || num2.length < 1 || operator.length < 1) return;
    console.log(num1, num2, operator);
    answer = operate(num1.join(''), num2.join(''), operator);
    display.textContent = answer;
    shownResult = true;
    console.log(answer);
}

function reset() {
    num1 = [];
    num2 = [];
    operator = null;
    firstNum = true;
    shownResult = false;
    display.textContent = "";
    operators.forEach(operator => operator.classList.remove('operator-active'));
}

function remove() {
    if (shownResult) return;
    if (firstNum) {
        num1.pop();
        display.textContent = num1.join('');
    } else {
        num2.pop();
        display.textContent = num2.join('');
    }
}

function negate() {
    if (shownResult) return;
    if (firstNum) {
        if (num1[0] == "-") num1.shift();
        else num1.unshift("-");
        display.textContent = num1.join('');
    } else {
        if (num2[0] == "-") num2.shift();
        else num2.unshift("-");
        display.textContent = num2.join('');
    }
}

function addDecimal() {
    if (shownResult) return;
    if (firstNum && !num1.includes(".")) {
        num1.push(".")
        display.textContent = num1.join('');
    } else if (!firstNum && !num2.includes(".")) {  // make sure to check if it isn't first num
        num2.push(".");
        display.textContent = num2.join('');
    }
    console.log("num1: " + num1);
    console.log("num2: " + num2);
    return;
}

numbers.forEach(number => number.addEventListener('click', enterNumber));
operators.forEach(operator => operator.addEventListener('click', addOperation));
equal.addEventListener('click', result);
clear.addEventListener('click', reset);
backspace.addEventListener('click', remove);
negation.addEventListener('click', negate);
decimal.addEventListener('click', addDecimal);
