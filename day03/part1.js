let input = require("./input.cjs");

input = input.split("\n");
// console.log(input.length);
// 140 x 140

const validValues = [];
for (let i = 0; i < input.length; i++) {
  let j = 0;
  while (j < input[i].length) {
    while (input[i].charAt(j).search(/[\.*/&--+=@$%#]/) === 0) {
      j++;
    }
    let number = "";
    let valid = false;

    function checkSymbolAdjacent(lineIndex, charIndex) {
      if (input[lineIndex].charAt(charIndex).search(/[*/&--+=@$%#]/) === 0) valid = true;
    }

    while (input[i].charAt(j) >= "0" && input[i].charAt(j) <= "9") {
      number += input[i].charAt(j);
      // previous line
      if (input[i - 1]) {
        // in case such line exists (it will exist unless we are iterating through the first line)
        if (input[i - 1].charAt(j - 1)) {
          // in case such character exists (it will exist unless we are looking at the first character of the line)
          checkSymbolAdjacent(i-1, j-1);
        }
        if (input[i - 1].charAt(j + 1)) {
          // in case such character exists (it will exist unless we are looking at the last character of the line)
          checkSymbolAdjacent(i-1, j+1);
        }
        checkSymbolAdjacent(i-1, j);
      }
      // current line
      if (input[i].charAt(j - 1)) {
        checkSymbolAdjacent(i, j-1);
      }
      if (input[i].charAt(j + 1)) {
        checkSymbolAdjacent(i, j+1);
      }
      // following line
      if (input[i + 1]) {
        // in case such line exists (it will exist unless we are iterating through the last line)
        if (input[i + 1].charAt(j - 1)) {
          checkSymbolAdjacent(i+1, j-1);
        }
        if (input[i + 1].charAt(j + 1)) {
          checkSymbolAdjacent(i+1, j+1);
        }
        checkSymbolAdjacent(i+1, j);
      }
      j++;
    }
    // console.log("num: ", number, valid);
    if (valid === true) validValues.push(number);
    j++;
  }
}

// console.log(validValues);
const result = validValues.reduce((acc, curr) => {
  return Number(acc) + Number(curr);
});
console.log(result);
