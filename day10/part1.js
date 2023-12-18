const input = require("./input.cjs");
const parsed = input.split("\n");

function locateS(data) {
  let location;
  data.forEach((elem, indexY) => {
    const indexX = elem.indexOf("S");
    if (indexX >= 0) location = [indexX, indexY];
  });
  return location;
}

// locations contain X, meaning the index within a row array (column number)
// and Y, meaning the outer index in a bidimensional array (row number).
const start = locateS(parsed);

const map = parsed.map((row) => {
  return row.split("");
});

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

function runThrough() {
  let previousPos = [...start];
  let currentPos = [...start];
  currentPos[1]++; // begin from the position under the S;
  let steps = 1;

  // console.log("previous position:", map[previousPos[1]][previousPos[0]], previousPos)
  // console.log("current position", map[currentPos[1]][currentPos[0]], currentPos)

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
        break;
      case "-":
        if (JSON.stringify(test(previousPos, move.right)) === JSON.stringify(currentPos)) {
          move.right(previousPos);
          move.right(currentPos);
        } else {
          move.left(previousPos);
          move.left(currentPos);
        }
        break;
      case "L":
        if (JSON.stringify(test(previousPos, move.down)) === JSON.stringify(currentPos)) {
          move.down(previousPos);
          move.right(currentPos);
        } else {
          move.left(previousPos);
          move.up(currentPos);
        }
        break;
      case "J":
        if (JSON.stringify(test(previousPos, move.down)) === JSON.stringify(currentPos)) {
          move.down(previousPos);
          move.left(currentPos);
        } else {
          move.right(previousPos);
          move.up(currentPos);
        }
        break;
      case "7":
        if (JSON.stringify(test(previousPos, move.right)) === JSON.stringify(currentPos)) {
          move.right(previousPos);
          move.down(currentPos);
        } else {
          move.up(previousPos);
          move.left(currentPos);
        }
        break;
      case "F":
        if (JSON.stringify(test(previousPos, move.left)) === JSON.stringify(currentPos)) {
          move.left(previousPos);
          move.down(currentPos);
        } else {
          move.up(previousPos);
          move.right(currentPos);
        }
        break;
    }
    steps++;
  }
  if (currentPos[0] === start[0] && currentPos[1] === start[1]) {
    console.log("the total length of the loop is: ", steps);
    console.log("the farthest point of the loop is: ", steps / 2);
  }
}

runThrough(map);
