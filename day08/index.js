const input = require("./input.cjs");
const instructions = input.slice(0, input.indexOf("\n"));
// console.log(instructions)

function parseMap(data) {
    let map = input.slice(input.indexOf("\n") + 2).split("\n");
    
    return map.map((item)=> {
        const node = item.slice(0,3);
        const left = item.slice(7,10);
        const right = item.slice(12,15);
        return [node, left, right]
    })
}

const parsedMap = parseMap(input);
// console.log("parsedMap: ", parsedMap);

function findZZZ(map, instructions) {
    let currentNode;
    let steps = 0;
    
    function goToNode(node) {
        map.forEach((item, index) => {
            if (item[0] === node) currentNode = index;
        });
    }
    goToNode("AAA");

    while (map[currentNode][0] != "ZZZ") {
        for (let i = 0; i < instructions.length; i++) {    
            if (instructions.charAt(i) === "L") {
                goToNode(map[currentNode][1]);
            };
            if (instructions.charAt(i) === "R") {
                goToNode(map[currentNode][2]);
            };
            steps++;
        }
    }
    return steps;
}

console.log("answer: ", findZZZ(parsedMap, instructions));