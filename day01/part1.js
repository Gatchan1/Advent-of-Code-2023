const stringInput = require("./input.cjs");

const arrayInput = stringInput.split("\n");
// console.log(arrayInput)

const numStringArray = arrayInput.map((string) => {
  let num1;
  let num2;
  for (let i = 0; i < string.length; i++) {
    if (string.charAt(i) >= 0 || string.charAt(i) <= 9) {
      num1 = string.charAt(i);
      break;
    }
  }
  for (let i = string.length - 1; i >= 0; i--) {
    if (string.charAt(i) >= 0 || string.charAt(i) <= 9) {
      num2 = string.charAt(i);
      break;
    }
  }
  return num1 + num2;
});
// console.log(numStringArray);

const numArray = numStringArray.map((numString) => Number(numString));
// console.log(numArray);

const answer = numArray.reduce((acc, curr)=>{
    return acc + curr;
});
console.log("the answer is: ", answer)