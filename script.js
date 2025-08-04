// Global variables - accessible throughout all functions
let display = document.getElementById("display"); // Find and store the display element from HTML
let currentInput = ""; // Currently displayed number on screen
let operator = ""; // Selected operation (+, -, *, /)
let previousInput = ""; // Previous number (for calculation)
let shouldResetDisplay = false; // Flag to determine if display should be cleared

// Function that runs when number buttons are clicked
function appendNumber(number) {
  // If display needs to be reset
  if (shouldResetDisplay) {
    currentInput = ""; // Clear current input
    shouldResetDisplay = false; // Turn off reset flag
  }

  // Prevent multiple decimal points in same number
  if (number === "." && currentInput.includes(".")) return;

  currentInput += number; // Add the pressed number to current input
  updateDisplay(); // Update the screen
}

// Function that runs when operation buttons (+, -, *, /) are clicked
function setOperator(op) {
  if (currentInput === "") return; // Do nothing if no number is entered

  // If there's a previous number and display hasn't been reset, calculate first
  if (previousInput !== "" && !shouldResetDisplay) {
    calculate(); // Calculate the previous operation
  }

  operator = op; // Store the new operation
  previousInput = currentInput; // Save current number as previous
  shouldResetDisplay = true; // Mark that display should be reset
}

// Function that runs when equals button (=) is clicked
function calculate() {
  // Do nothing if required data is missing
  if (previousInput === "" || currentInput === "" || operator === "") return;

  let result; // Variable to store result
  const prev = parseFloat(previousInput); // Convert previous number to decimal
  const current = parseFloat(currentInput); // Convert current number to decimal

  // Perform calculation based on selected operation
  switch (operator) {
    case "+":
      result = prev + current; // Addition
      break;
    case "-":
      result = prev - current; // Subtraction
      break;
    case "*":
      result = prev * current; // Multiplication
      break;
    case "/":
      if (current === 0) {
        // Check for division by zero
        alert("Cannot divide by zero!"); // Show error message
        return; // Exit function
      }
      result = prev / current; // Division
      break;
    default:
      return; // Exit if unknown operation
  }

  currentInput = result.toString(); // Convert result to string and assign to current input
  operator = ""; // Clear operation
  previousInput = ""; // Clear previous number
  shouldResetDisplay = true; // Mark that display should be reset
  updateDisplay(); // Update the screen
}

// Function that runs when clear (C) button is clicked
function clearDisplay() {
  currentInput = ""; // Clear current input
  previousInput = ""; // Clear previous number
  operator = ""; // Clear operation
  shouldResetDisplay = false; // Turn off reset flag
  updateDisplay(); // Update the screen
}

// Function that runs when delete (⌫) button is clicked
function deleteLast() {
  currentInput = currentInput.slice(0, -1); // Remove last character (slice: cutting operation)
  updateDisplay(); // Update the screen
}

// Function that updates the display screen
function updateDisplay() {
  display.value = currentInput || "0"; // Show current input, or '0' if empty
}

// Keyboard support - runs when keys are pressed
document.addEventListener("keydown", function (event) {
  // If number keys (0-9) or decimal point (.) are pressed
  if ((event.key >= "0" && event.key <= "9") || event.key === ".") {
    appendNumber(event.key); // Add the number
  }
  // If operation keys are pressed
  else if (
    event.key === "+" ||
    event.key === "-" ||
    event.key === "*" ||
    event.key === "/"
  ) {
    setOperator(event.key); // Set the operation
  }
  // If Enter or equals key is pressed
  else if (event.key === "Enter" || event.key === "=") {
    calculate(); // Perform calculation
  }
  // If Escape, C, c key is pressed
  else if (event.key === "Escape" || event.key === "c" || event.key === "C") {
    clearDisplay(); // Clear the display
  }
  // If Backspace key is pressed
  else if (event.key === "Backspace") {
    deleteLast(); // Delete last character
  }
});
