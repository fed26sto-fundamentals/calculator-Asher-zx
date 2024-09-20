// get the necessary element first
const displayValue = document.getElementById('displayvalue');
const lastInput = document.getElementById('lastinput');
const equalsButton = document.getElementById('equals');
const numberButtons = document.querySelectorAll('.numbtn');
const mathButtons = document.querySelectorAll('.mathbtn');
const clearButton = document.querySelector('.mathbtn[value="ac"]');
const deleteButton = document.querySelector('.mathbtn[value="del"]');

let clearValue = '0';
let firstValue = null; //sencond modification to save the first value
let lastOperation = null;
let shouldResetDisplay = false;
let isResultDisplayed =false; //track if there display the result

//function to update the display
function updateDisplay() {
  displayValue.textContent = clearValue;
}

//function to handle numbtn clicks
function handleNumberClick(event) {
  const button = event.target;
  const value = button.value;

  if (shouldResetDisplay || isResultDisplayed) {
    clearValue = value; //revalue the num to clearValue
    shouldResetDisplay = false;
    isResultDisplayed = false;
  } else {
    if (clearValue === '0') {
    clearValue = value;
    } else {
    clearValue += value;
    }
  }

  updateDisplay();
}

//function to handle mathbtn
function handleMathClick(event) {
  const button = event.target;
  const value = button.value;
  
  if (value === '+' || value === '-' || value === '*' || value === '/') {
      if (lastOperation !== null) {
        performCalculation();
      }
      firstValue = parseFloat(clearValue);//save firstvalue
      lastOperation = value;//record current perform
      shouldResetDisplay = true;//reset to input secondvalue
  } else if(value === 'ac') {
    clearValue = '0';
    firstValue = null;
    lastOperation = null;
    updateDisplay();
  } else if(value === 'del') {
    clearValue = clearValue.slice(0, -1);
   if(clearValue === '') {
    clearValue = '0';
  } 
    updateDisplay();
  }   
}
    /*     case 'ac':
      clearValue = '0';
      lastOperation = null;
      updateDisplay();
      break;
    case 'del':
      clearValue = clearValue.slice(0, -1);
      if (clearValue === '') {
        clearValue = '0';
      } */
  

// functionto perform calculate
function performCalculation() {
  const secondValue = parseFloat(displayValue.textContent) || 0;
  let result;

  if(firstValue !== null) { //make sure there is an first value
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
        return;//if there is no operate then return back
    }

    clearValue = result.toString(); //show the result
    firstValue = null;//clear the first value
    lastOperation = null;//reset the math
    isResultDisplayed = true;//tag the result
    updateDisplay();
  }
  lastInput.textContent = `${result}`;
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

/* deleteButton.addEventListener('click', () => {
  handleMathClick({ target: deleteButton });
}); */