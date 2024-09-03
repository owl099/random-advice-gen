let displayElement = document.getElementById('display');
let expression = '';
let isResultDisplayed = false; // Flag to check if the result is displayed
let memory = 0; // Memory for M+ and M- functions

// Function to append characters (numbers, operators) to the current input
function appendCharacter(char) {
    // If the result is currently displayed and a number is pressed, start a new expression
    if (isResultDisplayed && !isNaN(char)) {
        expression = ''; // Reset expression if a new number is entered after result
        isResultDisplayed = false;
    } else if (isResultDisplayed && isNaN(char)) {
        isResultDisplayed = false; // Allow to continue the expression if an operator is entered after result
    }

    // Prevent multiple decimal points in the same number
    if (char === '.' && (expression.endsWith('.') || expression.split(/[\+\-\*\/]/).pop().includes('.'))) {
        return;
    }

    expression += char;
    updateDisplay(expression);
}

// Function to clear the display and reset the expression
function clearDisplay() {
    expression = '';
    updateDisplay('');
    isResultDisplayed = false; // Reset the flag when cleared
}

// Function to update the display
function updateDisplay(content) {
    displayElement.textContent = content;
}

// Function to calculate the result of the expression
function calculateResult() {
    try {
        // Use eval to calculate the expression while respecting operator precedence
        let result = eval(expression);
        
        if (result === Infinity || result === -Infinity) {
            alert('Error: Division by zero');
            clearDisplay();
            return;
        }

        expression = result.toString();
        updateDisplay(expression);
        isResultDisplayed = true; // Set the flag to indicate that the result is displayed
    } catch (error) {
        alert('Error: Invalid expression');
        clearDisplay();
    }
}

// Function to handle keyboard input
function handleKeyboardInput(event) {
    const key = event.key;

    if (key >= '0' && key <= '9') { // If key is a number
        appendCharacter(key);
    } else if (key === '.') { // If key is a decimal point
        appendCharacter(key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/') { // If key is an operator
        if (isResultDisplayed) {
            isResultDisplayed = false; // Allow to continue the expression if an operator is entered after result
        }
        appendCharacter(key);
    } else if (key === 'Enter' || key === '=') { // If key is Enter or =
        calculateResult();
    } else if (key === 'Backspace') { // If key is Backspace
        backClear(); // Call backClear function
    } else if (key.toLowerCase() === 'c') { // If key is 'C' or 'c'
        clearDisplay();
    }
}

// Add event listener for keyboard input
document.addEventListener('keydown', handleKeyboardInput);

// Function to delete the last character (Back-Clear functionality)
function backClear() {
    if (isResultDisplayed) {
        clearDisplay(); // Clear the display if the result is shown
    } else {
        expression = expression.slice(0, -1); // Remove last character
        updateDisplay(expression);
    }
}

// Function to calculate square root
function calculateSquareRoot() {
    try {
        let currentNumber = eval(expression); // Evaluate the current expression
        if (currentNumber < 0) {
            alert('Error: Negative value cannot have a square root');
            return;
        }
        let result = Math.sqrt(currentNumber);
        expression = result.toString();
        updateDisplay(expression);
        isResultDisplayed = true;
    } catch (error) {
        alert('Error: Invalid expression for square root');
        clearDisplay();
    }
}

// Function to calculate percentage
function calculatePercentage() {
    try {
        let result;
        if (expression.includes('/')) {
            // Multiply by 100 if it's a fraction
            result = eval(expression) * 100;
        } else {
            // Divide by 100 if it's a whole number or a decimal
            result = eval(expression) / 100;
        }
        
        expression = result.toString();
        updateDisplay(expression);
        isResultDisplayed = true;
    } catch (error) {
        alert('Error: Invalid expression for percentage');
        clearDisplay();
    }
}

// Memory Functions
function memoryClear() {
    memory = 0;
    alert('Memory Cleared');
}

function memoryRecall() {
    expression += memory.toString();
    updateDisplay(expression);
}

function memoryAdd() {
    try {
        memory += eval(expression);
        alert('Added to Memory');
    } catch (error) {
        alert('Error: Invalid expression for memory add');
    }
}

function memorySubtract() {
    try {
        memory -= eval(expression);
        alert('Subtracted from Memory');
    } catch (error) {
        alert('Error: Invalid expression for memory subtract');
    }
}
