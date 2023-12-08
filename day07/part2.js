const input = require("./input.cjs");

// Here I refactored some things I had done for part 1.
// I think this is pretty good!

function parse(data) {
  let split = data.split("\n");
  return split.map((item) => {
    let itemArray = item.split(" ");
    return { hand: itemArray[0], bid: Number(itemArray[1]) };
  });
}

function setType(data) {
  function getType(hand) {
    let type;
    const chars = hand.split("");
    let occurrences = { one: 0, two: 0, three: 0, four: 0, five: 0 };
    chars.forEach((char) => {
      const regex = new RegExp(char, "g");
      if (hand.match(regex).length === 1) occurrences.one++;
      if (hand.match(regex).length === 2) occurrences.two++;
      if (hand.match(regex).length === 3) occurrences.three++;
      if (hand.match(regex).length === 4) occurrences.four++;
      if (hand.match(regex).length === 5) occurrences.five++;
    });
    if (occurrences.five === 5) {
      type = 6; // Five of a Kind
    } else if (occurrences.four === 4) {
      type = 5; // Four of a Kind
    } else if (occurrences.three === 3 && occurrences.two === 2) {
      type = 4; // Full House
    } else if (occurrences.three === 3 && occurrences.one === 2) {
      type = 3; // Three of a Kind
    } else if (occurrences.two === 4) {
      type = 2; // Two Pair
    } else if (occurrences.two === 2 && occurrences.one === 3) {
      type = 1; // One Pair
    } else if (occurrences.one === 5) {
      type = 0; // High card
    }
    return type;
  }

  function tryTypes(hand) {
    const possibleValues = ["A", "K", "Q", "T", "9", "8", "7", "6", "5", "4", "3", "2"];
    const possibleTypes = [];
    possibleValues.forEach((value) => {
      let jokerHand = hand.replaceAll("J", value);
      const type = getType(jokerHand);
      if (!possibleTypes.includes(type)) possibleTypes.push(type);
    });
    possibleTypes.sort((a, b) => b - a);
    return possibleTypes[0]; // this is the "highest" type: the strongest possible type this jokered hand can achieve.
  }

  return data.map((item) => {
    let type;
    if (item.hand.includes("J")) {
      type = tryTypes(item.hand);
    } else type = getType(item.hand);

    item.type = type;
    return item;
  });
}

function setRanks(filteredData, startingRank = 0) {
  // this function is built to set the ranks to ONLY ONE TYPE of cards.
  const strength = { A: 13, K: 12, Q: 11, T: 10, 9: 9, 8: 8, 7: 7, 6: 6, 5: 5, 4: 4, 3: 3, 2: 2, J: 1 };
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

//   console.log(typedCards);

  function rank(data) {
    //this function ranks all the hand types, one by one.
    for (let i = 0; i <= 6; i++) {
      const cards = data.filter((item) => item.type === i);
      setRanks(cards, currentMaxRank);
      currentMaxRank = cards[cards.length - 1].rank;
      finalCards = [...finalCards, ...cards];
      // we rank each type and we add them to the "finalCards" array.
    }
  }

  rank(typedCards);
//   console.log("ranked cards:", finalCards);

  const result = finalCards.reduce((acc, curr) => {
    return acc + curr.bid * curr.rank;
  }, 0);
  return result;
}

console.log("answer: ", solve(input));
