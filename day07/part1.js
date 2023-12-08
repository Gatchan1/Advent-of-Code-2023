const input = require("./input.cjs");

// Quite proud of this one!

function parse(data) {
  let split = data.split("\n");
  return split.map((item) => {
    let itemArray = item.split(" ");
    return { hand: itemArray[0], bid: Number(itemArray[1]) };
  });
}

function setType(data) {
  return data.map((item) => {
    const chars = item.hand.split("");
    let occurrences = { one: 0, two: 0, three: 0, four: 0, five: 0 };
    chars.forEach((char) => {
      const regex = new RegExp(char, "g");
      if (item.hand.match(regex).length === 1) occurrences.one++;
      if (item.hand.match(regex).length === 2) occurrences.two++;
      if (item.hand.match(regex).length === 3) occurrences.three++;
      if (item.hand.match(regex).length === 4) occurrences.four++;
      if (item.hand.match(regex).length === 5) occurrences.five++;
    });
    if (occurrences.five === 5) {
      item.type = "fiveOfAKind";
    } else if (occurrences.four === 4) {
      item.type = "fourOfAKind";
    } else if (occurrences.three === 3 && occurrences.two === 2) {
      item.type = "fullHouse";
    } else if (occurrences.three === 3 && occurrences.one === 2) {
      item.type = "threeOfAKind";
    } else if (occurrences.two === 4) {
      item.type = "twoPair";
    } else if (occurrences.two === 2 && occurrences.one === 3) {
      item.type = "onePair";
    } else if (occurrences.one === 5) {
      item.type = "highCard";
    }

    return item;
  });
}

function setRanks(filteredData, startingRank = 0) {
  const strength = { A: 13, K: 12, Q: 11, J: 10, T: 9, 9: 8, 8: 7, 7: 6, 6: 5, 5: 4, 4: 3, 3: 2, 2: 1 };
  function compare(a, b) {
    let i = 0;
    let comparison = 0;
    while (i < 5 && comparison == 0) {
      if (strength[a.hand.charAt(i)] > strength[b.hand.charAt(i)]) {
        comparison = 1;
      } else if (strength[a.hand.charAt(i)] < strength[b.hand.charAt(i)]) {
        comparison = -1;
      }
      i++;
    }
    return comparison;
  }
  filteredData.sort(compare); // (this mutates the original array)
  return filteredData.map((item, index) => {
    // (a map that changes an object inside an array... will of course affect the original array, since maps only create shallow copies)
    item.rank = index + 1 + startingRank;
    return item;
  });
}

function solve(data) {
  const parsedCards = parse(data);
  const typedCards = setType(parsedCards);
  let currentMaxRank = 0;
  let finalCards = [];

  function getRanked(type) {
    const cards = typedCards.filter((item) => item.type === type);
    setRanks(cards, currentMaxRank);
    currentMaxRank = cards[cards.length - 1].rank;
    finalCards = [...finalCards, ...cards];
  } // we rank one type and we add it to the "finalCards" array.

  getRanked("highCard");
  getRanked("onePair");
  getRanked("twoPair");
  getRanked("threeOfAKind");
  getRanked("fullHouse");
  getRanked("fourOfAKind");
  getRanked("fiveOfAKind");

  const result = finalCards.reduce((acc, curr) => {
    return acc + (curr.bid * curr.rank)
  }, 0)
  return result;
}

console.log("answer: ", solve(input));
