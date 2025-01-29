// Functions for basic maths

function add(a, b) {
    return a + b
}
function subtract(a, b) {
    return a - b
}
function multiply(a, b) {
    return a * b
}
function divide(a, b) {
    if (b === 0) {
        return "Error: Cannot divide by zero!";
    }
    return a / b;
}
function exponent(a,b) {
    return a ** b;
}



let display = document.getElementById("display");
let currentNumber = "0";
let firstNumber = null;
let operator = null;
let waitingForSecondNumber = false;

function updateDisplay() {
  display.innerText = currentNumber;
}

function inputNumber(number) {
    if (waitingForSecondNumber) {
        currentNumber = number;
        waitingForSecondNumber = false;
    } else {
         currentNumber = currentNumber === '0' ? number : currentNumber + number;
    }
    updateDisplay();
}

function inputOperator(op) {
    if (firstNumber === null) {
        firstNumber = parseFloat(currentNumber);
    } else if (operator) {
        firstNumber = operate(firstNumber, parseFloat(currentNumber), operator);
    updateDisplay();
    }

    operator = op;
    waitingForSecondNumber = true;
}

function operate(a, b, operator) {
    switch (operator) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "*":
            return multiply(a, b);
        case "/":
            if (b === 0) {
                alert("Cannot divide by zero!");
                return 0;
            }
            return a / b;
        default:
            return b;
    }
}

function handleEqual() {
  if (firstNumber !== null && operator && !waitingForSecondNumber) {
    const result = operate(firstNumber, parseFloat(currentNumber), operator);
    currentNumber = result.toString();
    firstNumber = null; // Reset after calculation
    operator = null; // Reset operator
    waitingForSecondNumber = false;
    updateDisplay();
  }
}

function handleClear() {
  currentNumber = '0';
  firstNumber = null;
  operator = null;
  waitingForSecondNumber = false;
  updateDisplay();
}

const digitButtons = document.querySelectorAll(".calculator button");
digitButtons.forEach(button => {
    button.addEventListener("click", function (e) {
        const clickedButton = e.target.innerText;
        if (clickedButton >= "0" && clickedButton <= "9") {
            inputNumber(clickedButton);
        }

        if (["+", "-", "*", "/"].includes(clickedButton)) {
            inputOperator(clickedButton);
        }

        if (clickedButton === "=") {
            handleEqual();
        }

        if (clickedButton === "C") {
            handleClear();
        }
    })
})



