// get the necessary element first
const displayValue = document.getElementById('displayvalue');
const lastInput = document.getElementById('lastinput');
const equalsButton = document.getElementById('equals');
const numberButtons = document.querySelectorAll('.numbtn');
const mathButtons = document.querySelectorAll('.mathbtn');
const clearButton = document.querySelector('.mathbtn[value="ac"]');
const deleteButton = document.querySelector('.mathbtn[value="del"]');

let clearValue = 0;
let lastOperation = null;
let shouldResetDisplay = false;

//function to update the display
function updateDisplay() {
  displayValue.textContent = clearValue;
}

//function to handle numbtn clicks
function handleNumberClick(event) {
  const button = event.target;
  const value = button.value;

  if (shouldResetDisplay) {
    clearValue = '0';
    shouldResetDisplay = false;
  }

  if (clearValue === '0') {
    clearValue = value;
  } else {
    clearValue += value;
  }

  updateDisplay();
}

//function to handle mathbtn
function handleMathClick(event) {
  const button = event.target;
  const value = button.value;
  
  switch(value) {
    case '+':
    case '-':
    case '/':
    case '*':
      if (lastOperation !== null) {
        performCalculation();
      }
      lastOperation = value;
      break;
    case 'ac':
      clearValue = '0';
      lastOperation = null;
      updateDisplay();
      break;
    case 'del':
      clearValue = clearValue.slice(0, -1);
      if (clearValue === '') {
        clearValue = '0';
      }
      updateDisplay();
      break;
  }

  lastInput.textContent = `${value}`;
}

// functionto perform calculate
function performCalculation() {
  const firstValue = parseFloat(clearValue) || 0;
  const secondValue = parseFloat(displayValue.textContent) || 0;
  let result;

  switch (lastOperation) {
    case '+':
      result = firstValue + secondValue;
      break;
    case '-':
      result = firstValue - secondValue;
      break;
    case '/':
      result = secondValue === 0 ? 'Error' : firstValue / secondValue;
      break;
    case '*':
      result = firstValue * secondValue;
      break;
    default:
      result = secondValue;
      break;
  }

  clearValue = result.toString();
  lastOperation = null;
  updateDisplay();
}

// add event listeners to the buttons
numberButtons.forEach(button => {
  button.addEventListener('click', handleNumberClick);
});

mathButtons.forEach(button => {
  button.addEventListener('click', handleMathClick);
})

equalsButton.addEventListener('click', performCalculation);

clearButton.addEventListener('click', () => {
  handleMathClick({ target: clearButton});
});

deleteButton.addEventListener('click', () => {
  handleMathClick({ target: deleteButton });
});