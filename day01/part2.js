const stringInput = require("./input.cjs");

const arrayInput = stringInput.split("\n");
// console.log(arrayInput)

const wordsToDigits = arrayInput.map((string) => {
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

const numStringArray = wordsToDigits.map((string) => {
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

const answer = numArray.reduce((acc, curr) => {
  return acc + curr;
});
console.log("the answer is: ", answer);