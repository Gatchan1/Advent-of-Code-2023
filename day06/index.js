// ::::::::::::::: PART 1 :::::::::::::::

const input1 = [
  { time: 35, distance: 213 },
  { time: 69, distance: 1168 },
  { time: 68, distance: 1086 },
  { time: 87, distance: 1248 },
];

function getValidPossibilities(race) {
  const possibilities = [];
  for (let i = 1; i < race.time; i++) {
    let distance = i * (race.time - i);
    possibilities.push(distance);
  }
  const filteredPossibilities = possibilities.filter((possibility) => possibility > race.distance);
  return filteredPossibilities.length;
}

const possibilitiesPerRace = input1.map((race) => getValidPossibilities(race));
const answer1 = possibilitiesPerRace.reduce((acc, curr) => acc * curr);
console.log("part 1 answer: ", answer1);

// ---------- END OF PART 1 ----------

// ::::::::::::::: PART 2 :::::::::::::::

const input2 = { time: 35696887, distance: 213116810861248 };

function getValidPossibilities2(race) {
  const possibilities = [];
  for (let i = 1; i < race.time; i++) {
    let distance = i * (race.time - i);
    if (distance > race.distance) possibilities.push(distance);
    // a more optimized approach than what I did in part 1 is
    // filtering the results right away like this, in only one step,
    // instead of iterating through every number twice.
  }
  return possibilities.length;
}

const answer2 = getValidPossibilities2(input2);
console.log("part 2 answer: ", answer2)

// ---------- END OF PART 2 ----------