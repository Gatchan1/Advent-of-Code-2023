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
    let locations = [];

    function checkAsteriskAdjacent(lineIndex, charIndex) {
      if (input[lineIndex].charAt(charIndex).search(/\*/) === 0) {
        valid = true;
        if (!locations.includes(`i${lineIndex}-j${charIndex}`)) locations.push(`i${lineIndex}-j${charIndex}`);
      }
    }

    while (input[i].charAt(j) >= "0" && input[i].charAt(j) <= "9") {
      number += input[i].charAt(j);
      // previous line
      if (input[i - 1]) {
        // in case such line exists (it will exist unless we are iterating through the first line)
        if (input[i - 1].charAt(j - 1)) {
          // in case such character exists (it will exist unless we are looking at the first character of the line)
          checkAsteriskAdjacent(i-1, j-1);
        }
        if (input[i - 1].charAt(j + 1)) {
          // in case such character exists (it will exist unless we are looking at the last character of the line)
          checkAsteriskAdjacent(i-1, j+1);
        }
        checkAsteriskAdjacent(i-1, j);
      }
      // current line
      if (input[i].charAt(j - 1)) {
        checkAsteriskAdjacent(i, j-1);
      }
      if (input[i].charAt(j + 1)) {
        checkAsteriskAdjacent(i, j+1);
      }
      // following line
      if (input[i + 1]) {
        // in case such line exists (it will exist unless we are iterating through the last line)
        if (input[i + 1].charAt(j - 1)) {
          checkAsteriskAdjacent(i+1, j-1);
        }
        if (input[i + 1].charAt(j + 1)) {
          checkAsteriskAdjacent(i+1, j+1);
        }
        checkAsteriskAdjacent(i+1, j);
      }
      j++;
    }
    // console.log("num: ", number, valid, locations);
    if (valid === true) validValues.push([number, locations]);
    j++;
  }
}
// validValues is now a list of every number that is adyacent to an asterisk, and indicates where is the asterisk located.
// (Btw, I was expecting some numbers to be adyacent to TWO asterisks (or more) at the same time, but it never happened)

// console.log(validValues); // [ '65', [ 'i1-j12' ] ],

const reorderedValues = validValues.map((value)=>{
  return [value[1][0], value[0]]
})
// Simple reformatting. I don't need an inner array with only one item.
// console.log(reorderedValues) // [ 'i1-j12', '65' ],

const groupedValues = reorderedValues.map((value) => {
  return reorderedValues.filter((elem) => {
    return (elem[0] == value[0])
  })
})
// I group the values that share the same asterisk.
// console.log("groupedValues: ",groupedValues) // [ [ 'i1-j33', '998' ], [ 'i1-j33', '874' ] ],

const stringifiedGroups = groupedValues.map((value) => {
  return `${value}`;
})
// I stringify each group so that I can later easily compare them and filter the duplicates.
// console.log(stringifiedGroups) // 'i1-j33,998,i1-j33,874',

const stringifiedNoRepeats = [];
stringifiedGroups.forEach((elem)=>{
  if (!stringifiedNoRepeats.includes(elem)) stringifiedNoRepeats.push(elem);
})
// Filter duplicates.
// console.log(stringifiedNoRepeats) // 'i1-j33,998,i1-j33,874',

const parsedGroups = stringifiedNoRepeats.map((value) => {
  let newValue = value.split(",")
  return newValue;
})
// "Un-stringify" our array elements.
// console.log(parsedGroups) // [ 'i1-j12', '65' ],
// [ 'i1-j33', '998', 'i1-j33', '874' ],

const gears = parsedGroups.filter((value) => {
  return (value.length === 4)
})
// Filter out the asterisks that only connect to one number.
// We only save the asterisks that connect with exactly two numbers.
// console.log("gears",gears) // [ 'i1-j33', '998', 'i1-j33', '874' ],

const result = gears.reduce((acc, curr) => {
  return acc + (curr[1] * curr[3]);
}, 0)
// Multiply the second value by the fourth value of each array element, and then sum those multiplications.
console.log(result)