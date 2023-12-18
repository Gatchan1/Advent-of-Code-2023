const input = require("./input.cjs");
const parsed = input.split("\n");

function locateS(data) {
  let location;
  data.forEach((elem, indexY) => {
    const indexX = elem.indexOf("S");
    if (indexX >= 0) location = [indexX, indexY, "SW"];
  });
  return location;
}

// locations contain X, meaning the index within a row array (column number)
// and Y, meaning the outer index in a bidimensional array (row number).
// location[2] indicates which direction points to the inside of the loop shape.

// We'll keep track of where is the inside part all along the loop.

const start = locateS(parsed);
// console.log("start", start);

const map = parsed.map((row) => {
  return row.split("");
});

// console.log('map:', map)

const move = {
  up: function (position) {
    position[1]--;
  },
  right: function (position) {
    position[0]++;
  },
  down: function (position) {
    position[1]++;
  },
  left: function (position) {
    position[0]--;
  },
};

/**
 * "test" serves the purpose of doing a dry run of a movement
 * without truly applying that movement to our real position
 * (we simply apply the movement to a copy of the position instead).
 */
function test(position, moveFunction) {
  const test = [...position];
  moveFunction(test);
  return test;
}

// We'll store the positions that form part of the loop in this array:
let loopPositions = [[...start]];

function runThrough() {
  let previousPos = [...start];
  let currentPos = [...start];
  currentPos[1]++; // begin from the position under the S;
  currentPos[2] = "SW";
  // currentPos[2] has to be the same as previousPos[2] for the stringified comparison to work.
  let steps = 1;
  loopPositions = [...loopPositions, [...currentPos]];

  //   console.log("previous position:", map[previousPos[1]][previousPos[0]], previousPos)
  //   console.log("current position", map[currentPos[1]][currentPos[0]], currentPos)

  /**
   * We have to keep track of what was our previous position so that we can know
   * where our current symbol is leading to.
   */
  while (!(currentPos[0] === start[0] && currentPos[1] === start[1])) {
    switch (map[currentPos[1]][currentPos[0]]) {
      case "|":
        if (JSON.stringify(test(previousPos, move.down)) === JSON.stringify(currentPos)) {
          move.down(previousPos);
          move.down(currentPos);
        } else {
          move.up(previousPos);
          move.up(currentPos);
        }
        if (["E", "SE", "NE"].includes(currentPos[2])) {
          previousPos[2] = "E";
          currentPos[2] = "E";
        } else if (["W", "NW", "SW"].includes(currentPos[2])) {
          previousPos[2] = "W";
          currentPos[2] = "W";
        }
        break;
      case "-":
        if (JSON.stringify(test(previousPos, move.right)) === JSON.stringify(currentPos)) {
          move.right(previousPos);
          move.right(currentPos);
        } else {
          move.left(previousPos);
          move.left(currentPos);
        }
        if (["S", "SE", "SW"].includes(currentPos[2])) {
          previousPos[2] = "S";
          currentPos[2] = "S";
        } else if (["N", "NW", "NE"].includes(currentPos[2])) {
          previousPos[2] = "N";
          currentPos[2] = "N";
        }
        break;
      case "L":
        if (JSON.stringify(test(previousPos, move.down)) === JSON.stringify(currentPos)) {
          move.down(previousPos);
          move.right(currentPos);
          if (["E", "SE", "NE"].includes(currentPos[2])) {
            previousPos[2] = "NE";
            currentPos[2] = "NE";
          } else if (["W", "NW", "SW"].includes(currentPos[2])) {
            previousPos[2] = "SW";
            currentPos[2] = "SW";
          }
        } else {
          move.left(previousPos);
          move.up(currentPos);
          if (["N", "NE", "NW"].includes(currentPos[2])) {
            previousPos[2] = "NE";
            currentPos[2] = "NE";
          } else if (["S", "SW", "SE"].includes(currentPos[2])) {
            previousPos[2] = "SW";
            currentPos[2] = "SW";
          }
        }
        break;
      case "J":
        if (JSON.stringify(test(previousPos, move.down)) === JSON.stringify(currentPos)) {
          move.down(previousPos);
          move.left(currentPos);
          if (["E", "SE", "NE"].includes(currentPos[2])) {
            previousPos[2] = "SE";
            currentPos[2] = "SE";
          } else if (["W", "NW", "SW"].includes(currentPos[2])) {
            previousPos[2] = "NW";
            currentPos[2] = "NW";
          }
        } else {
          move.right(previousPos);
          move.up(currentPos);
          if (["S", "SE", "SW"].includes(currentPos[2])) {
            previousPos[2] = "SE";
            currentPos[2] = "SE";
          } else if (["N", "NW", "NE"].includes(currentPos[2])) {
            previousPos[2] = "NW";
            currentPos[2] = "NW";
          }
        }
        break;
      case "7":
        if (JSON.stringify(test(previousPos, move.right)) === JSON.stringify(currentPos)) {
          move.right(previousPos);
          move.down(currentPos);
          if (["S", "SE", "SW"].includes(currentPos[2])) {
            previousPos[2] = "SW";
            currentPos[2] = "SW";
          } else if (["N", "NW", "NE"].includes(currentPos[2])) {
            previousPos[2] = "NE";
            currentPos[2] = "NE";
          }
        } else {
          move.up(previousPos);
          move.left(currentPos);
          if (["E", "NE", "SE"].includes(currentPos[2])) {
            previousPos[2] = "NE";
            currentPos[2] = "NE";
          } else if (["W", "NW", "SW"].includes(currentPos[2])) {
            previousPos[2] = "SW";
            currentPos[2] = "SW";
          }
        }
        break;
      case "F":
        if (JSON.stringify(test(previousPos, move.left)) === JSON.stringify(currentPos)) {
          move.left(previousPos);
          move.down(currentPos);
          if (["S", "SE", "SW"].includes(currentPos[2])) {
            previousPos[2] = "SE";
            currentPos[2] = "SE";
          } else if (["N", "NW", "NE"].includes(currentPos[2])) {
            previousPos[2] = "NW";
            currentPos[2] = "NW";
          }
        } else {
          move.up(previousPos);
          move.right(currentPos);
          if (["E", "SE", "NE"].includes(currentPos[2])) {
            previousPos[2] = "SE";
            currentPos[2] = "SE";
          } else if (["W", "NW", "SW"].includes(currentPos[2])) {
            previousPos[2] = "NW";
            currentPos[2] = "NW";
          }
        }
        break;
    }
    steps++;
    loopPositions = [...loopPositions, [...previousPos]];
    // It's important that we add to this array "previousPos" instead of "currentPos"!!
    // Because we've already modified currentPos to the next position, but it's direction
    // (currentPos[2]) hasn't been updated yet, whereas preciousPos is completely processed.
  }
  //   if (currentPos[0] === start[0] && currentPos[1] === start[1]) {
  //     console.log("the total length of the loop is: ", steps);
  //     console.log("the farthest point of the loop is: ", steps / 2);
  //   }
}

runThrough(map);

// "parseToStringPosition" exists for making the comparison of positions easier.
// (it's easier to compare two strings than two arrays...)
function parseToStringPosition(x, y) {
  let string;
  if (x < 10) string = "00" + x + "x";
  else if (x < 100) string = "0" + x + "x";
  else string = x + "x";
  if (y < 10) string += "_00" + y + "y";
  else if (y < 100) string += "_0" + y + "y";
  else string += "_" + y + "y";
  return string;
}

// console.log("loopPositions!!!", loopPositions);

// "stringPositions" contains the "stringified" positions that conform the loop
// but without the information of cardinal directions.
const stringPositions = loopPositions.map((position) => {
  return parseToStringPosition(position[0], position[1]);
});
// "stringCardinals" contains the "stringified" positions that conform the loop
// INCLUDING the information of cardinal directions.
const stringCardinals = loopPositions.map((position) => {
  let string;
  string = parseToStringPosition(position[0], position[1]);
  string += "_" + position[2];
  return string;
});
// console.log("stringPositions!!!", stringPositions);
// console.log("stringCardinals!!!", stringCardinals);

const insidePositions = [];

/**
 * "mapPositions" reads the map from left to right and counts how many
 * inside positions are collected inside the loop.
 * We know a position is an inside position if it follows a loop wall that
 * has it's interior pointing towards the east.
 */
function mapPositions() {
  map.forEach((row, indexY) => {
    let situation = "o"; // outside
    for (let indexX = 0; indexX < row.length; indexX++) {
      let position = parseToStringPosition(indexX, indexY);
      let index = stringPositions.indexOf(position);
      if (index >= 0) { // if the position is part of the loop:
        if (stringCardinals[index].includes("E")) situation = "i";
        // if the inside part of the loop points towards the east, we'll be looking at the inside.
        if (stringCardinals[index].includes("W")) situation = "o";
        // if the inside part of the loop points towards the west we'll be looking at the outside.
      }
      if (situation === "i" && index < 0) insidePositions.push(position);
    }
  });
}

mapPositions();
console.log("The number of inside positions is:", insidePositions.length);
