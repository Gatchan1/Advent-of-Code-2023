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

const matchesPerCards = cards.map((card) => {
  const matchingNumbers = card.winNums.filter((number) => {
    return card.ownNums.includes(number);
  });
  return { id: card.id, matches: matchingNumbers.length };
});

// console.log("matchesPerCards: ", matchesPerCards[2], matchesPerCards[3]);

const countCardCopies = matchesPerCards.map((card) => {
  card.copies = 1;
  return card
})
// console.log(countCardCopies);

for (let i = 0; i < countCardCopies.length; i++) {
  let lengthToCopy = countCardCopies[i].matches;
  let addCopyIndex = i + 1;
  while (lengthToCopy > 0) {
    countCardCopies[addCopyIndex].copies = countCardCopies[addCopyIndex].copies + countCardCopies[i].copies;
    addCopyIndex++;
    lengthToCopy--;
  }
}

console.log("after calculating the number of copies per card: ",countCardCopies);

const result = countCardCopies.reduce((acc, curr) => {
  return acc + curr.copies
}, 0)

console.log("the result of part 2 is: ", result)