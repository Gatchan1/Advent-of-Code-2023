let input = require("./input.cjs");

const inputArray = input.split("\n");
// console.log(inputArray)

// console.log(": is index", inputArray[0].indexOf(":"));
// console.log("| is index", inputArray[0].indexOf("|"))

const cards = inputArray.map((card) => {
  let id = card.slice(4, 8);
  id = id.trim();

  let winNums = card.slice(9, 39);
  winNums = winNums.replaceAll("  ", " ");
  // winNums.charAt(0) is now always a space.
  winNums = winNums.slice(1); // We remove that first space.
  winNums = winNums.split(" ");

  let ownNums = card.slice(41);
  ownNums = ownNums.replaceAll("  ", " ");
  // ownNums.charAt(0) is now always a space.
  ownNums = ownNums.slice(1); // We remove that first space.
  ownNums = ownNums.split(" ");

  const object = `{"id":${id},"winNums":[${winNums}],"ownNums":[${ownNums}]}`;
  const parsedObject = JSON.parse(object);
  return parsedObject;
});

// console.log("cards:", cards[2], cards[3]);

const matchingNumbersPerCards = cards.map((card) => {
  const matchingNumbers = card.winNums.filter((number) => {
    return card.ownNums.includes(number);
  });
  return { id: card.id, matchingNumbers };
});

console.log("matchingNumbersPerCards: ", matchingNumbersPerCards[2], matchingNumbersPerCards[3]);

const pointsPerCards = matchingNumbersPerCards.map((card) => {
  let points;
  if (card.matchingNumbers.length === 1) points = 1;
  else if (card.matchingNumbers.length === 0) points = 0;
  else points = Math.pow(2, card.matchingNumbers.length - 1);
  return { id: card.id, points };
});

// console.log("pointsPerCards: ", pointsPerCards);

const result = pointsPerCards.reduce((acc, curr) => {
    return (acc + curr.points)
}, 0)

console.log("the result is: ", result)