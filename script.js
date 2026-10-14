const display = document.getElementById('display');

let previousInput = '';
let operator = null;
let shouldResetDisplay = false;

// Display
function appendNumber(number) {
    if (display.value === '0' || shouldResetDisplay) {
        display.value = number;
        shouldResetDisplay = false;
    } else {
        display.value += number;
    }
    currentInput = display.value;
}

// Operaciones
function appendOperator(op) {
    if (operator !== null && !shouldResetDisplay) {
        calculateResult();
    }
    previousInput = display.value;
    operator = op;
    shouldResetDisplay = true;
}

// Decimales
function appendDecimal(dot) {
    if (shouldResetDisplay) {
        display.value = '0.';
        shouldResetDisplay = false;
        return;
    }
    if (!display.value.includes('.')) {
        display.value += dot;
    }
}

// Calcular
function calculateResult() {
    if (operator === null || shouldResetDisplay) return;

    let result = 0;
    const prev = parseFloat(previousInput);
    const current = parseFloat(display.value);

    if (isNaN(prev) || isNaN(current)) return;

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                alert("Error: No se puede dividir entre cero");
                clearDisplay();
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }

    // Redondeo
    result = Math.round(result * 100000000) / 100000000;

    display.value = result;
    currentInput = result.toString();
    operator = null;
    shouldResetDisplay = true;
}

// Borrar último número
function deleteLast() {
    if (display.value.length > 1) {
        display.value = display.value.slice(0, -1);
    } else {
        display.value = '0';
    }
}

// Limpiar display
function clearDisplay() {
    display.value = '0';
    currentInput = '0';
    previousInput = '';
    operator = null;
    shouldResetDisplay = false;
}

