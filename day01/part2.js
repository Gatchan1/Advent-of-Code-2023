const input = require("./input.cjs");

function parse(data) {
  const splitData = data.split("\n");
  const wordsToDigits = splitData.map((string) => {
    string = string.replaceAll("one", "one1one");
    string = string.replaceAll("two", "two2two");
    string = string.replaceAll("three", "three3three");
    string = string.replaceAll("four", "four4four");
    string = string.replaceAll("five", "five5five");
    string = string.replaceAll("six", "six6six");
    string = string.replaceAll("seven", "seven7seven");
    string = string.replaceAll("eight", "eight8eight");
    string = string.replaceAll("nine", "nine9nine");
    return string;
  });
  const numStringData = wordsToDigits.map((string) => {
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

const answer = parsedInput.reduce((acc, curr) => {
  return acc + curr;
});
console.log("the answer is: ", answer);
