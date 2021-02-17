// ** TODO **
// IMPORTANT: make (x)y work
// IMPORTANT: allow calculations to start with negative numbers
// frontend niceness: fix screen overflow for large numbers
// frontend niceness: make fullscreen on tablet/mobile
// make README file
// have separate file for mathematical functions that imports into display file
// make = perform the same calculation again on the result
// Refactor handleButtonPress() as switch/case.

//--------------------- MATHEMATICAL FUNCTIONS ---------------------

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
  if (
    splitCalc[splitCalc.length - 1] == "*" ||
    splitCalc[splitCalc.length - 1] == "/"
  )
    return currentNumber / 100;
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

const processBrackets = (bracketOpen) => (bracketOpen ? "(" : ")");

const openAndCloseBrackets = (bracketOpen) => (bracketOpen ? false : true);

const allowBracketAsMultiplier = (currentCalculation) => {
  let splitCalc = currentCalculation.split("");
  for (let i = 0; i < splitCalc.length; i++) {
    if (splitCalc[i] == "(" && !isNaN(splitCalc[i - 1])) splitCalc[i] = "*(";
    if (splitCalc[i] == ")" && !isNaN(splitCalc[i + 1])) splitCalc[i] = ")*";
    else splitCalc[i] = splitCalc[i];
  }
  return splitCalc.join("");
};

const calculateBrackets = (currentCalculation) => {
  if (currentCalculation.includes(")")) {
    if (currentCalculation[1] == "(") {
      let splitCalc = currentCalculation.split(/[()]/g);
      splitCalc[0] = calculate(parseStringAsCalculationArray(splitCalc[1]));
      return splitCalc.join("");
    } else {
      let splitCalc = currentCalculation.split(/[()]/g);
      splitCalc[1] = calculate(parseStringAsCalculationArray(splitCalc[1]));
      return splitCalc.join("");
    }
  } else return currentCalculation;
};

//--------------------- DISPLAY/RENDERING FUNCTIONS ---------------------

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

const clearDisplay = (
  outputCalcArea,
  outputEqualsArea,
  outputTotalArea
) => {
  outputCalcArea.innerHTML = null;
  outputEqualsArea.innerHTML = null;
  outputTotalArea.innerHTML = null;
  return  "";
};

const handleButtonPress = (
  buttonElements,
  outputCalcArea,
  outputEqualsArea,
  outputTotalArea,
  previousCalcArea
) => {
  let currentCalculation = "";
  let currentNumber = "";
  let currentTotal = "";
  let previousTotal = "";
  let displayCalculation = "";
  let bracketOpen = false;

  buttonElements.forEach((button) => {
    button.addEventListener("click", (event) => {
      const clickedButtonValue = event.target.value;

      // if there is already a total value stored, save it
      if (currentTotal != "") {
        previousCalculation = currentCalculation;
        previousTotal = currentTotal;
        currentTotal = "";
        previousCalcArea.innerHTML = `${formatDisplayCalculation(
          displayCalculation
        )} = ${previousTotal}`;
        clearDisplay(
          outputCalcArea,
          outputEqualsArea,
          outputTotalArea
        );
        bracketOpen = false;

        // if there is already a total value AND the user hits an operator
        if (event.target.className == "calc__button calc__operator") {
          currentNumber = previousTotal;
          currentTotal = "";
          displayCalculation = clearDisplay(
            outputCalcArea,
            outputEqualsArea,
            outputTotalArea
          );
          displayCalculation = previousTotal;
          outputCalcArea.innerHTML = displayCalculation;
        } else {
          currentNumber = "";
          currentTotal = "";
          displayCalculation = clearDisplay(
            outputCalcArea,
            outputEqualsArea,
            outputTotalArea
          );
        }
      }

      //if user clicks AC button, clear all data
      if (clickedButtonValue == "delete") {
        currentNumber = "";
        currentCalculation = "";
        currentTotal = "";
        displayCalculation = clearDisplay(
          outputCalcArea,
          outputEqualsArea,
          outputTotalArea
        );
        bracketOpen = false;
      }

      //if user hits equals button
      else if (clickedButtonValue == "=") {
        //  add the NUMBER to the CALCULATION
        currentCalculation += currentNumber;

        //  run the expression of CALCULATION and store it in TOTAL
        let calculationAfterBrackets = calculateBrackets(currentCalculation);
        currentTotal = calculate(
          parseStringAsCalculationArray(calculationAfterBrackets)
        );

        outputTotalArea.innerHTML = Number(currentTotal).toLocaleString();
        outputEqualsArea.innerHTML = "=";
        // and clear the current calculation
        currentCalculation = "";
        bracketOpen = false;
      }

      // if user presses brackets
      else if (clickedButtonValue == "brackets") {
        bracketOpen = openAndCloseBrackets(bracketOpen);
        currentNumber, (displayCalculation += processBrackets(bracketOpen));
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
};

handleButtonPress(
  document.querySelectorAll(".calc__button"),
  document.getElementById("output-display-calculation"),
  document.getElementById("output-display-equals"),
  document.getElementById("output-display-total"),
  document.getElementById("output-prev-total")
);
