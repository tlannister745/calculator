let display = document.querySelector(".operand");
let buttons = Array.from(document.querySelectorAll("#buttons button"));
let equals = document.getElementById("equals");
let backspace = document.querySelector(".back");
let dr = document.getElementById("result")
let currentInput = '';
let result = '';
buttons.forEach(button => {
    button.addEventListener('click', () => {
        handleButtonPress(button.value);
        updateDisplay();
    });
});

equals.addEventListener('click', () => {
    calculateResult();
    updateDisplay();
});

backspace.addEventListener('click', () => {
    removeCharFromInput();
    updateDisplay();
});

document.addEventListener('keydown', (event) => {
    const keyValue = event.key;

    if (/[\d+\-*/.=]|Enter|Backspace|Escape/.test(keyValue)) {
        event.preventDefault();
        if (keyValue === 'Backspace') {
            removeCharFromInput();
        } else if (keyValue === 'Enter') {
            calculateResult();
        } else {
            handleButtonPress(keyValue);
        }

        updateDisplay();
    }
});

function removeCharFromInput() {
    currentInput = currentInput.slice(0, -1);
}


function handleButtonPress(value) {
    switch (value) {
        case 'AC':
            clearAll();
            break;
        case '=':
            calculateResult();
            break;
        case '()':
            toggleBrackets();
            break;
        case '%':
            percent();
            break;
        default:
            currentInput += value;
    }
}
function applyPercentage() {
    if (currentInput && !/[+\-*/.%]/.test(currentInput.slice(-1))) {
        const lastNumber = currentInput.match(/(\d+(\.\d+)?)$/);
        if (lastNumber) {
            const percentageValue = parseFloat(lastNumber[0]) / 100;
            currentInput = currentInput.replace(/(\d+(\.\d+)?)$/, percentageValue);
        }
    }
}

function toggleBrackets() {
    const lastChar = currentInput.slice(-1);

    if (lastChar === '(' || /\d$/.test(lastChar) || lastChar === ')') {
        currentInput += ')';
    } else {
        currentInput += '(';
    }
}

function calculateResult() {
    try {
        result = eval(currentInput);
    } catch (error) {
        result = 'Error';
    }
}

function clearAll() {
    currentInput = '';
    result=''
}

function updateDisplay() {
    display.textContent = currentInput;
    dr.textContent = result;
}
