// DOM elements
const buttonElements = document.querySelectorAll('.calc__button');
const outputDisplay = document.getElementById("output-display");
const outputCalcArea = document.getElementById('output-display-calculation');
const outputEqualsArea = document.getElementById('output-display-equals');
const outputTotalArea = document.getElementById('output-display-total');

// maths variables
let currentNumber = '';
let previousCalculation = '';
let previousTotal = '';

// TODO
// add clear button
// add % button
// add +- button
// add scientific operators
// make calculations display '965 x 4' rather than '965*4'
// make a list of previous calculations and append every time it's updated

// listen for button clicks
buttonElements.forEach((button) => {
  button.addEventListener('click', (event) => {
    // get the value of the button just clicked
    const clickedButtonValue = event.target.value;
    //if clear button was pressed,
    //if something is already in the total display, save previous calculation for later use

    if(outputTotalArea.innerHTML.length > 0){

      document.getElementById('output-prev-calculation').innerHTML = outputCalcArea.innerHTML;
      document.getElementById('output-prev-equals').innerHTML = outputEqualsArea.innerHTML;
      document.getElementById('output-prev-total').innerHTML = outputTotalArea.innerHTML;
      
      //if something is already in the total display AND the user hits an operator, put previous total at the start of current calc
      if(event.target.className == "calc__button calc__operator"){
        currentNumber = document.getElementById('output-prev-total').innerHTML;
      }

      outputCalcArea.innerHTML = null;
      outputEqualsArea.innerHTML = null;
      outputTotalArea.innerHTML = null;
    }

    
    if(clickedButtonValue == 'delete'){
      outputCalcArea.innerHTML = null;
      outputEqualsArea.innerHTML = null;
      outputTotalArea.innerHTML = null;
      currentNumber = '';
    }
    
    // is it equals?
    else if(clickedButtonValue == '=') {
      // return the total
      outputTotalArea.innerHTML = eval(currentNumber);
      // with an equals sign 
      outputEqualsArea.innerHTML = '=';
      // and clear the current number
      currentNumber = '';
    }
    //is it a number or an operator?
    else {
      //add it to a string
    currentNumber += clickedButtonValue;
    outputCalcArea.innerHTML = currentNumber;
    }
  });
})

/* const numButtons = {
  '1' : 1,
  '2' : 2,
  '3': 3,
  '4' : 4,
  '5' : 5,
  '6' : 6,
  '7': 7,
  '8' : 8,
  '9' : 9,
  '0' : 0
} */

