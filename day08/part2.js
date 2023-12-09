const input = require("./input.cjs");

const instructions = input.slice(0, input.indexOf("\n"));
// console.log(instructions, instructions.length);

function parseMap(data) {
  let map = input.slice(input.indexOf("\n") + 2).split("\n");

  return map.map((item) => {
    const node = item.slice(0, 3);
    const left = item.slice(7, 10);
    const right = item.slice(12, 15);
    return [node, left, right];
  });
}

const parsedMap = parseMap(input);
// console.log("parsedMap: ", parsedMap);

// :::::::::::: PART 2 ::::::::::::

function getStartNodes(map) {
  const nodes = [];
  map.forEach((node, index) => {
    if (node[0].charAt(2) === "A") nodes.push(index);
  });
  return nodes;
}

function findXXZ(startNode) {
  let currentNode = startNode;
  let steps = 0;
  function goToNode(node) {
    parsedMap.forEach((item, index) => {
      if (item[0] === node) currentNode = index;
    });
  }
  while (parsedMap[currentNode][0].charAt(2) != "Z") {
    for (let i = 0; i < instructions.length; i++) {
      if (instructions.charAt(i) === "L") {
        goToNode(parsedMap[currentNode][1]);
      }
      if (instructions.charAt(i) === "R") {
        goToNode(parsedMap[currentNode][2]);
      }
      steps++;
    }
  }
  return { startNode: parsedMap[startNode], steps, endNode: parsedMap[currentNode] };
}

/**
 * I used LCM (least common multiple) to get the minimum steps needed for them all to occur at the same time.
 * I checked the following using paper + calculator:
 * Each of the steps are composed of a prime number multiplied by 263 (the length of the instructions).
 */

function getAnswerPart2() {
  const startNodes = getStartNodes(parsedMap);
  // console.log(startNodes);
  const tracks = [];
  startNodes.forEach((node) => {
    tracks.push(findXXZ(node));
  });
  // console.log("ghost tracks: ", tracks);
  const answer = tracks.reduce((acc, curr) => {
    return acc * (curr.steps / 263);
  }, 263);
  return answer;
}

console.log("the answer for part 2 is: ", getAnswerPart2());
