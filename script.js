let display = document.getElementById('display');
let history = document.getElementById('history');
let historyList = document.getElementById('historyList');
let currentInput = '';
let calculationHistory = [];

// פונקציה להוספת מספר לתצוגה
function appendNumber(number) {
    currentInput += number;
    updateDisplay();
}

// פונקציה להוספת אופרטור לתצוגה
function appendOperator(op) {
    if (currentInput === '' || /[+\-*/]$/.test(currentInput)) return;
    currentInput += op;
    updateDisplay();
}

// פונקציה לניקוי התצוגה
function clearDisplay() {
    currentInput = '';
    updateDisplay();
}

// פונקציה למחיקת התו האחרון בתצוגה
function deleteLast() {
    currentInput = currentInput.toString().slice(0, -1);
    updateDisplay();
}

// פונקציה לחישוב הביטוי בתצוגה
function calculate() {
    try {
        const result = eval(currentInput.replace('÷', '/').replace('×', '*')).toString();
        calculationHistory.push(currentInput + ' = ' + result);
        updateHistory();
        currentInput = result;
    } catch (e) {
        currentInput = 'Error';
    }
    updateDisplay();
}

// פונקציה לעדכון התצוגה
function updateDisplay() {
    display.innerText = currentInput;
    if (currentInput === '') {
        display.innerText = '0';
    }
}

// פונקציה לעדכון ההיסטוריה
function updateHistory() {
    historyList.innerHTML = '';
    for (let entry of calculationHistory) {
        let listItem = document.createElement('li');
        listItem.textContent = entry;
        historyList.appendChild(listItem);
    }
}

// פונקציה להפעלת או הסתרת ההיסטוריה
function toggleHistory() {
    if (history.style.display === 'none' || history.style.display === '') {
        history.style.display = 'block';
    } else {
        history.style.display = 'none';
    }
}

// פונקציה לטעינת ההיסטוריה מהאחסון המקומי
function loadHistory() {
    const savedHistory = localStorage.getItem('calculatorHistory');
    if (savedHistory) {
        calculationHistory = JSON.parse(savedHistory);
        updateHistory();
    }
}

// פונקציה לשמירת ההיסטוריה באחסון המקומי
function saveHistory() {
    localStorage.setItem('calculatorHistory', JSON.stringify(calculationHistory));
}

// קריאה לפונקציה לטעינת ההיסטוריה בעת טעינת הדף
window.onload = loadHistory;

// קריאה לפונקציה לשמירת ההיסטוריה כל פעם שהיא מתעדכנת
window.addEventListener('beforeunload', saveHistory);
