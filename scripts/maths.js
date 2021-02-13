// TODO
// make (x)y work
// fix screen overflow for large numbers
// make fullscreen on tablet/mobile
// make = perform the same calculation again on the result

// put it all in switch/case rather than clunky if?

// BONUS CHALLENGES
// add scientific operators

// DOM elements
const buttonElements = document.querySelectorAll(".calc__button");
const outputDisplay = document.getElementById("output-display");
const outputCalcArea = document.getElementById("output-display-calculation");
const outputEqualsArea = document.getElementById("output-display-equals");
const outputTotalArea = document.getElementById("output-display-total");
const previousCalcArea = document.getElementById("output-prev-total");

// maths variables
let currentCalculation = "";
let currentNumber = "";
let currentTotal = "";
let previousCalculation = "";
let previousTotal = "";
let displayCalculation = "";
let bracketClosed = true;

buttonElements.forEach((button) => {
  button.addEventListener("click", (event) => {
    const clickedButtonValue = event.target.value;

    // if there is already a total value stored, save it in case user wants to use it in next calculation
    if (currentTotal != "") {
      previousCalculation = currentCalculation;
      previousTotal = currentTotal;
      currentTotal = "";
      previousCalcArea.innerHTML = `${formatDisplayCalculation(
        displayCalculation
      )} = ${previousTotal}`;
      clearDisplay();
      bracketClosed = true;

      // if there is already a total value AND the user hits an operator, put previous total at the start of current calc
      if (event.target.className == "calc__button calc__operator") {
        currentNumber = previousTotal;
        currentTotal = "";
        clearDisplay();
        displayCalculation = previousTotal;
        outputCalcArea.innerHTML = displayCalculation;
      } else {
        currentNumber = "";
        currentTotal = "";
        clearDisplay();
      }

      // clear current total and wipe HTML elements
    }

    //if user clicks AC button, clear all data
    if (clickedButtonValue == "delete") {
      currentNumber = "";
      currentCalculation = "";
      currentTotal = "";
      clearDisplay();
    }

    //if user hits equals button
    else if (clickedButtonValue == "=") {
      //  add the NUMBER to the CALCULATION
      currentCalculation += currentNumber;

      //  run the expression of CALCULATION and store it in TOTAL
      console.log("to be calculated = " + currentCalculation);
      let calculationAfterBrackets = calculateBrackets(currentCalculation);
      console.log("after brackets = " + calculationAfterBrackets);
      currentTotal = calculate(
        parseStringAsCalculationArray(calculationAfterBrackets)
      );

      outputTotalArea.innerHTML = Number(currentTotal).toLocaleString();
      outputEqualsArea.innerHTML = "=";
      // and clear the current calculation
      currentCalculation = "";
      bracketClosed = true;
    }

    // if user presses brackets
    else if (clickedButtonValue == "brackets") {
      processBrackets();
      console.log("number that's about to be processed =" + currentNumber);
      currentNumber = allowBracketAsMultiplier(currentNumber);
      outputCalcArea.innerHTML = formatDisplayCalculation(displayCalculation);
    }

    //if it's percent
    else if (clickedButtonValue == "%") {
      //print it on screen
      displayCalculation += clickedButtonValue;
      outputCalcArea.innerHTML = formatDisplayCalculation(displayCalculation);
      currentNumber = calculatePercentage(currentCalculation, currentNumber);
    }

    //if it's an operator
    else if (event.target.className == "calc__button calc__operator") {
      currentCalculation += currentNumber;
      currentCalculation += clickedButtonValue;
      currentNumber = "";
      displayCalculation += clickedButtonValue;
      outputCalcArea.innerHTML = formatDisplayCalculation(displayCalculation);
    } else {
      //if it's a number, add it to NUMBER string
      currentNumber += clickedButtonValue;
      displayCalculation += clickedButtonValue;
      outputCalcArea.innerHTML = formatDisplayCalculation(displayCalculation);
    }
  });
});

const formatDisplayCalculation = (stringForScreen) => {
  return stringForScreen
    .split("")
    .map((digit) => {
      if (digit == "*")
        return (digit = ' <span class="display__operator">&times;</span> ');
      else if (digit == "/")
        return (digit = ' <span class="display__operator">&divide;</span> ');
      else if (digit == "-" || digit == "+" || digit == "^" || digit == "%")
        return ` <span class="display__operator">${digit}</span> `;
      else return digit;
    })
    .join("");
};

const parseStringAsCalculationArray = (calcString) => {
  calcArray = [];
  let currentNum = "";
  calcString.split("").forEach((char, index, arr) => {
    if ("()^*/+-".indexOf(char) > -1) calcArray.push(char);
    else if (!isNaN(char) && arr[index + 1] == ".") {
      currentNum += char;
    } else if (!isNaN(char) && isNaN(arr[index + 1])) {
      currentNum += char;
      calcArray.push(parseFloat(currentNum));
      currentNum = "";
    } else currentNum += char;
  });

  return calcArray;
};

const calculate = (arrayToBeCalculated) => {
  const operators = [
    { "^": (a, b) => Math.pow(a, b) },
    { "*": (a, b) => a * b, "/": (a, b) => a / b },
    { "+": (a, b) => a + b, "-": (a, b) => a - b },
  ];
  let calculationSoFar = [];
  let currentOperator;

  operators.forEach((operator) => {
    arrayToBeCalculated.forEach((value) => {
      if (operator[value]) {
        currentOperator = operator[value];
      } else if (currentOperator) {
        calculationSoFar[calculationSoFar.length - 1] = currentOperator(
          calculationSoFar[calculationSoFar.length - 1],
          value
        );
        currentOperator = null;
      } else {
        calculationSoFar.push(value);
      }
    });
    arrayToBeCalculated = calculationSoFar;
    calculationSoFar = [];
  });

  return arrayToBeCalculated[0];
};

const calculatePercentage = (currentCalculation, currentNumber) => {
  let splitCalc = currentCalculation.split("");
  // if the last element is a times or divide symbol, return as a fraction
  if (
    splitCalc[splitCalc.length - 1] == "*" ||
    splitCalc[splitCalc.length - 1] == "/"
  )
    return currentNumber / 100;
  // if the last element is plus or minus, return the calculation so far as a fraction
  else if (
    splitCalc[splitCalc.length - 1] == "+" ||
    splitCalc[splitCalc.length - 1] == "-"
  ) {
    let throwawayOperator = splitCalc.pop();
    return `${
      (calculate(parseStringAsCalculationArray(splitCalc.join(""))) *
        currentNumber) /
      100
    }`;
  }
};

const processBrackets = () => {
  // if previous was a bracket, add a * symbol
  if (bracketClosed) {
    currentNumber += "(";
    displayCalculation += "(";
    bracketClosed = false;
  } else {
    currentNumber += ")";
    displayCalculation += ")";
    bracketClosed = true;
  }
};

const allowBracketAsMultiplier = (currentCalculation) => {
  let splitCalc = currentCalculation.split("");
  for (let i = 0; i < splitCalc.length; i++) {
    if (splitCalc[i] == "(" && !isNaN(splitCalc[i - 1])) splitCalc[i] = "*(";
    if (splitCalc[i] == ")" && !isNaN(splitCalc[i + 1])) splitCalc[i] = ")*";
    else splitCalc[i] = splitCalc[i];
  }
  console.log(splitCalc);
  return splitCalc.join("");
};

const calculateBrackets = (currentCalculation) => {
  if (currentCalculation.includes(")")) {
    if (currentCalculation[1] == "(") {
      console.log("opening bracket found at index 0");
      let splitCalc = currentCalculation.split(/[()]/g);
      console.log("splitcalc = " + splitCalc);
      //splitCalc[0] = splitCalc[0].substring(1);
      console.log("splitcalc[0] = " + splitCalc[1]);
      splitCalc[0] = calculate(parseStringAsCalculationArray(splitCalc[1]));
      return splitCalc.join("");
    } else {
      console.log("opening bracket found");
      let splitCalc = currentCalculation.split(/[()]/g);
      console.log("calculation split into: " + splitCalc);
      //splitCalc[1] = splitCalc[1].substring(0, splitCalc[1].length - 1);
      console.log(splitCalc);
      splitCalc[1] = calculate(parseStringAsCalculationArray(splitCalc[1]));
      return splitCalc.join("");
    }
  } else return currentCalculation;
};

const clearDisplay = () => {
  displayCalculation = "";
  outputCalcArea.innerHTML = null;
  outputEqualsArea.innerHTML = null;
  outputTotalArea.innerHTML = null;
};
