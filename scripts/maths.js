// DOM elements
const buttonElements = document.querySelectorAll(".calc__button");
const outputDisplay = document.getElementById("output-display");
const outputCalcArea = document.getElementById("output-display-calculation");
const outputEqualsArea = document.getElementById("output-display-equals");
const outputTotalArea = document.getElementById("output-display-total");

// maths variables
let currentCalculation = "";
let currentNumber = "";
let currentTotal = "";
let previousCalculation = "";
let previousTotal = "";
let displayCalculation = "";

// TODO
// add % button
// add +- button
// add scientific operators
// fix screen overflow for large numbers
// make calculations display '965 x 4' rather than '965*4'
// make = perform the same calculation again on the result
// make a list of previous calculations and append every time it's updated

//SANITISE eval() OUTPUT (make sure string gets evaluated if it only contains arithmetic values)
//    ADD ANOTHER CLASS TO NUMBER AND OPERATOR BUTTONS AND ONLY ALLOW ADDITION TO CALC STRING IF THEY ARE FROM BUTTONS TAGGED WITH THOSE CLASSES

//BONUS - remake using a shunting algorithm as laid out in https://en.wikipedia.org/wiki/Shunting-yard_algorithm

// listen for button clicks
buttonElements.forEach((button) => {
  button.addEventListener("click", (event) => {

    // get the value of the button just clicked
    const clickedButtonValue = event.target.value;
    console.log("clicked = " + clickedButtonValue);

    // if there is already a total value stored, save it in case user wants to use it in next calculation
    if (currentTotal != '') {
      previousCalculation = currentCalculation;
      previousTotal = currentTotal;

      // if there is already a total value AND the user hits an operator, put previous total at the start of current calc
      if (event.target.className == "calc__button calc__operator") currentNumber = previousTotal;
      else currentNumber = '';

      // clear current total and wipe HTML elements
      currentTotal = '';
      displayCalculation = '';
      outputCalcArea.innerHTML = null;
      outputEqualsArea.innerHTML = null;
      outputTotalArea.innerHTML = null;
    }



    //if user clicks AC button, clear all data
    if (clickedButtonValue == "delete") {
      currentNumber = '';
      currentCalculation = '';
      currentTotal = '';
      outputCalcArea.innerHTML = null;
      outputEqualsArea.innerHTML = null;
      outputTotalArea.innerHTML = null;
    }

    //if it's =
    else if (clickedButtonValue == "=") {
      //  add the NUMBER to the CALCULATION
      currentCalculation += currentNumber;
      console.log(currentCalculation);

      //  run the expression of CALCULATION and store it in TOTAL
      currentTotal = eval(currentCalculation);
      console.log("Total = " + currentTotal);
      // store the total
      
      // and print it to the display
      outputTotalArea.innerHTML = currentTotal;
      // with a nice equals symbol
      outputEqualsArea.innerHTML = "=";
      // and clear the current calculation
      currentCalculation = "";
    }

    //if it's percent
    else if (clickedButtonValue == "%"){
      //print it on screen
      displayCalculation += event.target.value;
      outputCalcArea.innerHTML = displayCalculation;

      // split the string into an array
      let splitCalc = currentCalculation.split('');
      // if the last element is a times or divide symbol, return as a fraction
      if(splitCalc[splitCalc.length-1] == '*' || splitCalc[splitCalc.length-1] == '/' ){
        currentNumber = currentNumber / 100;
      }

      // if the last element is plus or minus, return the calculation so far as a fraction
      else if(splitCalc[splitCalc.length-1] == '+' || splitCalc[splitCalc.length-1] == '-' ){
        let throwawayOperator = splitCalc.pop();
        currentNumber = eval(splitCalc.join('')) * currentNumber/ 100;
      }

      console.log(currentNumber);
    }
    
    //if it's an operator 
    else if (event.target.className == "calc__button calc__operator"){
      
      //  add NUMBER to CALCULATION
      currentCalculation += currentNumber;
      //  add operator to CALCULATION
      currentCalculation += clickedButtonValue;
      console.log('currentCalculation = ' + currentCalculation);
      //  clear NUMBER string
      currentNumber = '';
      console.log("currentNumber cleared.");

      displayCalculation += event.target.value;
      outputCalcArea.innerHTML = displayCalculation;
    }
    
    
    else {
      //if it's a number, add it to NUMBER string
      currentNumber += clickedButtonValue;
      console.log('currentNumber = ' + currentNumber);

      displayCalculation += event.target.value;
      outputCalcArea.innerHTML = displayCalculation;
    }
  });
});



















//PERCENTAGE CALCULATOR
// split string by operators
// detect whether element containing

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
