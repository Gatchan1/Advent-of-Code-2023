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

// :::::::::::: PART 1 ::::::::::::

function findZZZ() {
  let currentNode;
  let steps = 0;
  function goToNode(node) {
    parsedMap.forEach((item, index) => {
      if (item[0] === node) currentNode = index;
    });
  }
  goToNode("AAA");
  while (parsedMap[currentNode][0] != "ZZZ") {
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
  return steps;
}

console.log("answer of part 1: ", findZZZ());
