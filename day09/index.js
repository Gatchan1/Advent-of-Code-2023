const input = require("./input.cjs");

function parse(data) {
  const lines = data.split("\n");
  const values = lines.map((line) => {
    const strings = line.split(" ");
    const numbers = strings.map((string) => Number(string));
    return numbers;
  });
  return values;
}

const parsed = parse(input);
// console.log("first history: ", parsed[0]);

function getNextSequence(sequence) {
  const nextSequence = [];
  for (let i = 1; i < sequence.length; i++) {
    nextSequence.push(sequence[i] - sequence[i - 1]);
  }
  return nextSequence;
}

function isLastSequence(sequence) {
  if (sequence.every((num) => num === 0)) return true;
  return false;
}

// :::::::::::: PART 1 ::::::::::::

function getValue(sequences) {
  for (let i = sequences.length - 1; i >= 0; i--) {
    let newValue;
    if (i === sequences.length - 1) {
      newValue = 0;
    } else {
      const lastIndex = sequences[i].length - 1;
      newValue = sequences[i][lastIndex] + sequences[i + 1][lastIndex];
    }
    sequences[i].push(newValue);
  }
}

function getExtrapolatedValue(history) {
  const sequences = [[...history]];
  while (!isLastSequence(sequences[sequences.length - 1])) {
    let nextSequence = getNextSequence(sequences[sequences.length - 1]);
    sequences.push(nextSequence);
  }
  getValue(sequences);
  // console.log("Here is the original sequence with the extrapolated value at the end: ", sequences[0])
  const lastIndex = sequences[0].length - 1;
  return sequences[0][lastIndex]; // this is the extrapolated value.
}

function solve(data) {
  const newValues = [];
  data.forEach((history) => {
    newValues.push(getExtrapolatedValue(history));
  });
//   console.log("extrapolated values (part 1): ", newValues);
  const answer = newValues.reduce((acc, curr) => {
    return acc + curr;
  });
  return answer;
}

console.log("the answer for part 1 is: ", solve(parsed));

// :::::::::::: PART 2 ::::::::::::

// Ok, I hadn't noticed that reversing the arrays allows you to reuse every part 1 function...
 
function reverse(data) {
    const copy = JSON.parse(JSON.stringify(data));
    return copy.map((sequence) => sequence.reverse())
}

const reversed = reverse(parsed);

console.log("the answer for part 2 is: ", solve(reversed));



// function getBackwardsValue(sequences) {
//     for (let i = sequences.length - 1; i >= 0; i--) {
//       let newValue;
//       if (i === sequences.length - 1) {
//         newValue = 0;
//       } else {
//         newValue = sequences[i][0] - sequences[i + 1][0];
//       }
//       sequences[i].unshift(newValue);
//     }
//   }
  
//   function getExtrapolatedValueBackwards(history) {
//     const sequences = [[...history]];
//     while (!isLastSequence(sequences[sequences.length - 1])) {
//       let nextSequence = getNextSequence(sequences[sequences.length - 1]);
//       sequences.push(nextSequence);
//     }
//     getBackwardsValue(sequences);
//     // console.log("Here is the original sequence with the extrapolated value at the start: ", sequences[0])
//     return sequences[0][0]; // this is the extrapolated value.
//   }
  
//   function solveBackwards(data) {
//     const newValues = [];
//     data.forEach((history) => {
//       newValues.push(getExtrapolatedValueBackwards(history));
//     });
//     // console.log("extrapolated values (part 2): ", newValues);
//     const answer = newValues.reduce((acc, curr) => {
//       return acc + curr;
//     });
//     return answer;
//   }

//   console.log("the answer for part 2 is: ", solveBackwards(parsed));