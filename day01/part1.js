const input = require("./input.cjs");

function parse(data) {
  const splitData = data.split("\n");
  const numStringData = splitData.map((string) => {
    let num1;
    let num2;
    for (let i = 0; i < string.length; i++) {
      if (string.charAt(i) >= 0 || string.charAt(i) <= 9) {
        // Find first number
        num1 = string.charAt(i);
        break;
      }
    }
    for (let i = string.length - 1; i >= 0; i--) {
      if (string.charAt(i) >= 0 || string.charAt(i) <= 9) {
        // Find last number
        num2 = string.charAt(i);
        break;
      }
    }
    return num1 + num2; // Concat both digit characters.
  });
  //  console.log(numStringData);
  return numStringData.map((numString) => Number(numString));
}

const parsedInput = parse(input);
// console.log(parsedInput);

const answer = parsedInput.reduce((acc, curr)=>{
    return acc + curr;
});

console.log("the answer is: ", answer)