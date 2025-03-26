const numberButtons = document.querySelectorAll(".number");
const operationButtons = document.querySelectorAll(".operation");
const equalsButton = document.querySelector(".equals");
const deleteButton = document.querySelector(".delete");
const clearButton = document.querySelector(".clear");
const previousOperandDiv = document.querySelector(".previous-operand");
const currentOperandDiv = document.querySelector(".current-operand");

class Calculator {
    constructor(previousOperandDiv, currentOperandDiv) {
        this.previousOperandDiv = previousOperandDiv;
        this.currentOperandDiv = currentOperandDiv;
        this.clear();
    }

    clear() {
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        if (this.currentOperand.length < 11) {
            this.currentOperand = this.currentOperand.toString() + number.toString();
        } 
        if (number === "." && this.currentOperand.includes(".")) return;
    }

    chooseOperation(operation) {
        if (this.currentOperand === "") return;
        if (this.previousOperand !== "") {
            this.calculate();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    }

    calculate() {
        let calculation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;
        switch (this.operation) {
            case "+":
                calculation = prev + current;
                break;
            case "-":
                calculation = prev - current;
                break;
            case "*":
                calculation = prev * current;
                break;
            case "÷":
                calculation = prev / current;
                break;
            default:
                return;
        }
        this.currentOperand = calculation;
        this.operation = undefined;
        this.previousOperand = "";
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split(".")[0]);
        const decimalDigits = stringNumber.split(".")[1];
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = "";
        } else {
            integerDisplay = integerDigits.toLocaleString("en", { maximumFractionDigits: 0 });
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        this.currentOperandDiv.innerText = this.getDisplayNumber(this.currentOperand);
        if (this.operation != null) {
            this.previousOperandDiv.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } else {
            this.previousOperandDiv.innerText = "";
        }
    }
}

const calculator = new Calculator(previousOperandDiv, currentOperandDiv);

numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operationButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

equalsButton.addEventListener("click", button => {
    calculator.calculate();
    calculator.updateDisplay();
})

clearButton.addEventListener("click", button => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener("click", button => {
    calculator.delete();
    calculator.updateDisplay();
})