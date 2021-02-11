const string = '9*(45)-23%';



const getPercentage = (calcString) => {
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
console.log(removeAndReplacePercentage(string));