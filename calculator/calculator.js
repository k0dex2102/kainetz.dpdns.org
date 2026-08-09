const display = document.getElementById("display");
const buttons = document.querySelectorAll(".buttons button");
let currentValue = "0";
let previousValue = null;
let operator = null;
let shouldResetDisplay = false;
function updateDisplay() {
  display.textContent = currentValue;
}
function inputNumber(number) {
  if (currentValue === "Error") {
    clearCalculator();
  }
  if (shouldResetDisplay) {
    currentValue = "0";
    shouldResetDisplay = false;
  }
  if (number === "." && currentValue.includes(".")) {
    return;
  }
  if (currentValue === "0" && number !== ".") {
    currentValue = number;
  } else {
    currentValue += number;
  }
  updateDisplay();
}
function chooseOperator(selectedOperator) {
  if (currentValue === "Error") {
    return;
  }
  if (operator !== null && !shouldResetDisplay) {
    calculate();
  }
  previousValue = currentValue;
  operator = selectedOperator;
  shouldResetDisplay = true;
}
function calculate() {
  if (operator === null || previousValue === null || currentValue === "Error") {
    return;
  }
  const a = Number(previousValue);
  const b = Number(currentValue);
  let result;
  switch (operator) {
    case "+":
      result = a + b;
      break;
    case "−":
      result = a - b;
      break;
    case "×":
      result = a * b;
      break;
    case "÷":
      if (b === 0) {
        currentValue = "Error";
        previousValue = null;
        operator = null;
        shouldResetDisplay = true;
        updateDisplay();
        return;
      }
      result = a / b;
      break;
  }
  result = Number(result.toPrecision(12));
  currentValue = String(result);
  previousValue = null;
  operator = null;
  shouldResetDisplay = true;
  updateDisplay();
}
function clearCalculator() {
  currentValue = "0";
  previousValue = null;
  operator = null;
  shouldResetDisplay = false;
  updateDisplay();
}
function toggleSign() {
  if (currentValue === "0" || currentValue === "Error") {
    return;
  }
  if (currentValue.startsWith("-")) {
    currentValue = currentValue.substring(1);
  } else {
    currentValue = "-" + currentValue;
  }
  updateDisplay();
}
function percentage() {
  if (currentValue === "Error") {
    return;
  }
  currentValue = String(Number(currentValue) / 100);
  updateDisplay();
}
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.dataset.value;
    const action = button.dataset.action;
    if (value !== undefined && !action) {
      inputNumber(value);
      return;
    }
    if (action === "decimal") {
      inputNumber(".");
      return;
    }
    if (action === "clear") {
      clearCalculator();
      return;
    }
    if (action === "sign") {
      toggleSign();
      return;
    }
    if (action === "percent") {
      percentage();
      return;
    }
    if (action === "operator") {
      chooseOperator(value);
      return;
    }
    if (action === "equals") {
      calculate();
    }
  });
});
document.addEventListener("keydown", (event) => {
  const key = event.key;
  if (key >= "0" && key <= "9") {
    inputNumber(key);
    return;
  }
  if (key === "." || key === ",") {
    inputNumber(".");
    return;
  }
  if (key === "+") {
    chooseOperator("+");
    return;
  }
  if (key === "-") {
    chooseOperator("−");
    return;
  }
  if (key === "*") {
    chooseOperator("×");
    return;
  }
  if (key === "/") {
    event.preventDefault();
    chooseOperator("÷");
    return;
  }
  if (key === "Enter" || key === "=") {
    calculate();
    return;
  }
  if (key === "Escape" || key === "Delete") {
    clearCalculator();
    return;
  }
  if (key === "Backspace") {
    if (currentValue.length > 1 && currentValue !== "Error") {
      currentValue = currentValue.slice(0, -1);
    } else {
      currentValue = "0";
    }
    updateDisplay();
  }
});
updateDisplay();
