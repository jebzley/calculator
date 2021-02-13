const string = '88.32*(10-5)';

const number = '100000000000';




const parseStringAsCalculationArray = (calcString) => {
  calcArray = [];
  let currentNum = '';
  calcString.split('').forEach((char, index, arr) => {
    if( '()^*/+-'.indexOf(char) > -1 ) calcArray.push(char);

    else if(!isNaN(char) && arr[index+1] == '.'){
      currentNum += char;
    }

    else if(!isNaN(char) && isNaN(arr[index+1])){
      currentNum += char;
      calcArray.push(parseFloat(currentNum));
      currentNum = '';
    }

    else currentNum+= char;
  });

  return calcArray;
}

const calculate = (arrayToBeCalculated) => {
  const operators = [{'^': (a, b) => Math.pow(a, b)},
  {'*': (a, b) => a * b, '/': (a, b) => a / b},
  {'+': (a, b) => a + b, '-': (a, b) => a - b}];

  let calculationSoFar = [];

  let currentOperator;

  operators.forEach((operator) => {
    arrayToBeCalculated.forEach((value) => {
      if(operator[value]){
        currentOperator = operator[value];
      }
      else if(currentOperator){
        calculationSoFar[calculationSoFar.length-1] = currentOperator(calculationSoFar[calculationSoFar.length-1], value);
        currentOperator = null;
      }
      else{
        calculationSoFar.push(value);
      }
    });
    arrayToBeCalculated = calculationSoFar;
    calculationSoFar = [];
  });

  return arrayToBeCalculated[0];
}

const calculateBrackets = currentCalculation => {
  if(currentCalculation.includes(')')){
    let splitCalc = currentCalculation.split('(');
    splitCalc[1] = splitCalc[1].substring(0, splitCalc[1].length - 1);
    console.log(splitCalc);
    splitCalc[1] = calculate(parseStringAsCalculationArray(splitCalc[1]));
    return splitCalc.join(''); 
  }
  else return currentCalculation;
}


//expected = '88.32*5'
console.log(calculateBrackets(string))

/*
function calculateu(calc) {
  // --- Perform a calculation expressed as an array of operators and numbers

  // an array of OBJECTS with the operators as keys and the calculations as values
  var ops = [{'^': (a, b) => Math.pow(a, b)},
             {'*': (a, b) => a * b, '/': (a, b) => a / b},
             {'+': (a, b) => a + b, '-': (a, b) => a - b}],
      newCalc = [],
      currentOp;
  //FOR the length of the array of operators.....
  for (var i = 0; i < ops.length; i++) {
    //SO ops[i] now refers an OBJECT with the OPERATOR as the key and the CALCULATION as the value - MEANING IT GOES THROUGH IN BODMAS ORDER!

      //FOR the length of the calculation array....
      for (var j = 0; j < calc.length; j++) {
        // calc[j] now refers to the NUMBER OR OPERATOR at INDEX j of the CALCULATION ARRAY
          
          console.log("ops[i] = "+ ops[i]);
          console.log("calc[j] = " + calc[j])
          console.log("ops[i][calc[j]] = "+ ops[i][calc[j]]);
          // IF THE KEY OF ops[i] IS THE SAME AS calc[j] - THIS CHECKS IF ops[i][calc[j]] IS NOT UNDEFINED - SQUARE BRACKETS ARE COOL FOR OBJECTS
          if (ops[i][calc[j]]) {

              // set currentOp to be the METHOD for the CALCULATION stored at the KEY of calc[j]
              currentOp = ops[i][calc[j]];
              console.log("currentOp = " + currentOp);

            // if currentOp IS NOT UNDEFINED
          } else if (currentOp) {
              console.log("CALCULATION STARTING YO")
              console.log("newCalc[newCalc.length-1] = " + newCalc[newCalc.length - 1]);
              console.log("calc[j] = " + calc[j])
              // run the calculation on the NUMBER from the end of the newCalc ARRAY (the NUMBER before the operator) and calc[j] (the NUMBER after the operator)
              // and replace the NUMBER at the end of the array with the calculated output 
              newCalc[newCalc.length - 1] = 
                  currentOp(newCalc[newCalc.length - 1], calc[j]);
              // and make currentOp UNDEFINED again.
              currentOp = null;
          } else {
              // ADD THE VALUE AT THE CURRENT INDEX TO THE newCalc ARRAY
              newCalc.push(calc[j]);
          }
          console.log("newCalc = " + newCalc);
      }
      //store calculation so far so we can continue
      calc = newCalc;
      // reset newCalc array
      newCalc = [];
  }
  if (calc.length > 1) {
      console.log('Error: unable to resolve calculation');
      return calc;
  } else {
      return calc[0];
  }
}
 */


//console.log(calculate(parseCalculationString(string)))
/* console.log(Number(number).toLocaleString());

const processBrackets = (currentCalculation) => {
  // if previous was a bracket, add a * symbol
  let splitCalc = currentCalculation.split('');
  for(let i =0;i<splitCalc.length;i++){
    console.log(splitCalc[i]);
    if(splitCalc[i] == '(' && !isNaN(splitCalc[i-1])){
      console.log("yeah baby");
      splitCalc[i] = '*('
    }
  }
  console.log(splitCalc.join('')); */

/*   if(bracketClosed){
    currentNumber += '(';
    displayCalculation += '('
    bracketClosed = false;
  }
  else{
    currentNumber += ')';
    displayCalculation += ')'
    bracketClosed = true;
  } */


//console.log(processBrackets(string)); 
/* const getPercentage = (calcString) => {
  let output = '';
  let percentage = string.split('').map((char) => {
    if(char == '*' || char == '-') output = '';
    else if (char != '%') output += char;
    else return output; 
  })
  return output;
}

const removeAndReplacePercentage = (calcString) => {
  const filteredExpr = calcString.split(/%/).filter((el) => {return el != '';});
  console.log(filteredExpr);
  filteredExpr[filteredExpr.length-1] = (filteredExpr[filteredExpr.length-1] / 100);
  return filteredExpr.join('');
}
console.log(removeAndReplacePercentage(string)); */