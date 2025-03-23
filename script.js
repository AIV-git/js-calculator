function add(a,b) {
    return (a+b);
}

function subtract(a,b) {
    return (a-b);
}

function multiply(a,b) {
    return (a*b);
}

function divide(a,b) {
    return (a/b);
}

let firstNumber = 0;
let secondNumber = 0;
let operation = 0;

function operate(a, b, operator) {
    switch (operator) {
        case '+':
            return add(a,b);
        case '-':
            return subtract(a,b);
        case '*':
            return multiply(a,b);
        case '/':
            return divide(a,b);
    }
} 