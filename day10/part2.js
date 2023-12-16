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

// We'll keep track of where is the inside all along the loop.

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

function test(position, moveFunction) {
  const test = [...position];
  moveFunction(test);
  return test;
}

let loopPositions = [[...start]];

function runThrough() {
  let previousPos = [...start];
  let currentPos = [...start];
  currentPos[1]++; // begin from the position under the S;
  currentPos[2] = "SW"
  // currentPos[2] has to be the same as previousPos[2] for the stringified comparison to work;
  let steps = 1;
  loopPositions = [...loopPositions, [...currentPos]]

  // console.log("previous position:", map[previousPos[1]][previousPos[0]], previousPos)
  // console.log("current position", map[currentPos[1]][currentPos[0]], currentPos)

  /**
   * We have to keep track of what was our previous position so that we can know
   * where our current symbol has to take us to.
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
        if (currentPos[2] === "E" || currentPos[2] === "SE" || currentPos[2] === "NE") {
          previousPos[2] = "E";
          currentPos[2] = "E";
        } else if (currentPos[2] === "W" || currentPos[2] === "NW" || currentPos[2] === "SW") {
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
        if (currentPos[2] === "S" || currentPos[2] === "SE" || currentPos[2] === "SW") {
          previousPos[2] = "S";
          currentPos[2] = "S";
        } else if (currentPos[2] === "N" || currentPos[2] === "NW" || currentPos[2] === "NE") {
          previousPos[2] = "N";
          currentPos[2] = "N";
        }
        break;
      case "L":
        if (JSON.stringify(test(previousPos, move.down)) === JSON.stringify(currentPos)) {
          move.down(previousPos);
          move.right(currentPos);
          if (currentPos[2] === "E" || currentPos[2] === "SE" || currentPos[2] === "NE") {
            previousPos[2] = "NE";
            currentPos[2] = "NE";
          } else if (currentPos[2] === "W" || currentPos[2] === "NW" || currentPos[2] === "SW") {
            previousPos[2] = "SW";
            currentPos[2] = "SW";
          }
        } else {
          move.left(previousPos);
          move.up(currentPos);
          if (currentPos[2] === "N" || currentPos[2] === "NE" || currentPos[2] === "NW") {
            previousPos[2] = "NE";
            currentPos[2] = "NE";
          } else if (currentPos[2] === "S" || currentPos[2] === "SW" || currentPos[2] === "SE") {
            previousPos[2] = "SW";
            currentPos[2] = "SW";
          }
        }
        break;
      case "J":
        if (JSON.stringify(test(previousPos, move.down)) === JSON.stringify(currentPos)) {
          move.down(previousPos);
          move.left(currentPos);
          if (currentPos[2] === "E" || currentPos[2] === "SE" || currentPos[2] === "NE") {
            previousPos[2] = "SE";
            currentPos[2] = "SE";
          } else if (currentPos[2] === "W" || currentPos[2] === "NW" || currentPos[2] === "SW") {
            previousPos[2] = "NW";
            currentPos[2] = "NW";
          }
        } else {
          move.right(previousPos);
          move.up(currentPos);
          if (currentPos[2] === "S" || currentPos[2] === "SE" || currentPos[2] === "SW") {
            previousPos[2] = "SE";
            currentPos[2] = "SE";
          } else if (currentPos[2] === "N" || currentPos[2] === "NW" || currentPos[2] === "NE") {
            previousPos[2] = "NW";
            currentPos[2] = "NW";
          }
        }
        break;
      case "7":
        if (JSON.stringify(test(previousPos, move.right)) === JSON.stringify(currentPos)) {
          move.right(previousPos);
          move.down(currentPos);
          if (currentPos[2] === "S" || currentPos[2] === "SE" || currentPos[2] === "SW") {
            previousPos[2] = "SW";
            currentPos[2] = "SW";
          } else if (currentPos[2] === "N" || currentPos[2] === "NW" || currentPos[2] === "NE") {
            previousPos[2] = "NE";
            currentPos[2] = "NE";
          }
        } else {
          move.up(previousPos);
          move.left(currentPos);
          if (currentPos[2] === "E" || currentPos[2] === "NE" || currentPos[2] === "SE") {
            previousPos[2] = "NE";
            currentPos[2] = "NE";
          } else if (currentPos[2] === "W" || currentPos[2] === "NW" || currentPos[2] === "SW") {
            previousPos[2] = "SW";
            currentPos[2] = "SW";
          }
        }
        break;
      case "F":
        if (JSON.stringify(test(previousPos, move.left)) === JSON.stringify(currentPos)) {
          move.left(previousPos);
          move.down(currentPos);
          if (currentPos[2] === "S" || currentPos[2] === "SE" || currentPos[2] === "SW") {
            previousPos[2] = "SE";
            currentPos[2] = "SE";
          } else if (currentPos[2] === "N" || currentPos[2] === "NW" || currentPos[2] === "NE") {
            previousPos[2] = "NW";
            currentPos[2] = "NW";
          }
        } else {
          move.up(previousPos);
          move.right(currentPos);
          if (currentPos[2] === "E" || currentPos[2] === "SE" || currentPos[2] === "NE") {
            previousPos[2] = "SE";
            currentPos[2] = "SE";
          } else if (currentPos[2] === "W" || currentPos[2] === "NW" || currentPos[2] === "SW") {
            previousPos[2] = "NW";
            currentPos[2] = "NW";
          }
        }
        break;
    }
    steps++;
    loopPositions = [...loopPositions, [...previousPos]]
    // It's important that we add to this array "previousPos" instead of "currentPos"!!
    // Because we've already modified currentPos to the next position, but it's direction
    // (currentPos[2]) hasn't been updated yet, whereas preciousPos is completely processed.

  }
  if (currentPos[0] === start[0] && currentPos[1] === start[1]) {
    // console.log("the total length of the loop is: ", steps);
    // console.log("the farthest point of the loop is: ", steps / 2);
  }
}

runThrough(map);

function parseToStringPosition(x, y) {
    let string;
    if (x < 10) string = '00' + x + 'x';
    else if (x < 100) string = '0' + x + 'x';
    else string = x + 'x';
    if (y < 10) string += '_00' + y + 'y';
    else if (y < 100) string += '_0' + y + 'y';
    else string += '_' + y + 'y';
    return string;
}

// console.log("loopPositions!!!", loopPositions);
const stringPositions = loopPositions.map(position => {
    return parseToStringPosition(position[0], position[1])
})
const stringCardinals = loopPositions.map(position => {
    let string;
    string = parseToStringPosition(position[0], position[1]);
    string += '_' + position[2];
    return string;
})

// console.log("stringPositions!!!", stringPositions);
// console.log("stringCardinals!!!", stringCardinals);

const insidePositions = [];
function mapPositions() {
    map.forEach((row, indexY)=>{
        let situation = 'o';
        for (let indexX = 0; indexX < row.length; indexX++) {
            let position = parseToStringPosition(indexX, indexY);
            let index = stringPositions.indexOf(position);
            if (index >= 0) {
             if (stringCardinals[index].includes("E")) situation = 'i';
             if (stringCardinals[index].includes("W")) situation = 'o';
            }
            if (situation === 'i' && index < 0) insidePositions.push(position)
        }
    })
}

mapPositions();
console.log("insidePositions!!!", insidePositions.length);
