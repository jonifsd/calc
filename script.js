let display = document.getElementById('display');
let currentInput = '';

function appendNumber(number) {
    currentInput += number;
    updateDisplay();
}

function appendOperator(op) {
    if (currentInput === '' || /[+\-*/]$/.test(currentInput)) return;
    currentInput += op;
    updateDisplay();
}

function clearDisplay() {
    currentInput = '';
    updateDisplay();
}

function deleteLast() {
    currentInput = currentInput.toString().slice(0, -1);
    updateDisplay();
}

function calculate() {
    try {
        currentInput = eval(currentInput.replace('÷', '/').replace('×', '*')).toString();
    } catch (e) {
        currentInput = 'Error';
    }
    updateDisplay();
}

function updateDisplay() {
    display.innerText = currentInput;
    if (currentInput === '') {
        display.innerText = '0';
    }
}
