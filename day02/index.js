let input = require("./input.cjs");

const games = input.split("\n").map((string) => {
  let idSliceIndex = string.indexOf(":");
  let id = string.slice(0, idSliceIndex);

  id = id.replace("Game ", '"id":');

  const redCubes = string.match(/.. red/g);
  const redArray = redCubes.map((elem) => {
    elem = elem.slice(0, 2);
    elem = elem.trim();
    return elem;
  });
  const greenCubes = string.match(/.. green/g);
  const greenArray = greenCubes.map((elem) => {
    elem = elem.slice(0, 2);
    elem = elem.trim();
    return elem;
  });
  const blueCubes = string.match(/.. blue/g);
  const blueArray = blueCubes.map((elem) => {
    elem = elem.slice(0, 2);
    elem = elem.trim();
    return elem;
  });

  const object = "{" + id + ',"red":[' + redArray + '],"green":[' + greenArray + '],"blue":[' + blueArray + "]}";

  const parsedObject = JSON.parse(object);
  return parsedObject;
});
// console.log("final: ", games)

// :::::::::::: PART 1 ::::::::::::

function solve1(data) {
  const filteredGames = data.filter((game) => {
    return game.red.every((number) => number <= 12) && game.green.every((number) => number <= 13) && game.blue.every((number) => number <= 14);
  });
  // console.log("filtered: ", filteredGames)
  const result = filteredGames.reduce((acc, curr) => {
    return acc + curr.id;
  }, 0);
  return result;
}

console.log("result of part 1: ", solve1(games));

// ---------- END OF PART 1 ----------

// :::::::::::: PART 2 ::::::::::::

function solve2(data) {
    const reducedGames = data.map((game) => {
      const red = game.red.reduce((acc, curr) => {
        if (curr > acc) acc = curr;
        return acc;
      });
      game.red = red;
      const green = game.green.reduce((acc, curr) => {
        if (curr > acc) acc = curr;
        return acc;
      });
      game.green = green;
      const blue = game.blue.reduce((acc, curr) => {
        if (curr > acc) acc = curr;
        return acc;
      });
      game.blue = blue;
      return game;
    });    
    // console.log("reduced: ", reducedGames);

    const powersGames = reducedGames.map((game) => {
      const power = game.red * game.green * game.blue;
      game.power = power;
      return game;
    });
    // console.log("games with powers: ", powersGames)

    const result = powersGames.reduce((acc, curr) => {
      return acc + curr.power;
    }, 0);
    return result;
}
console.log("result of part 2: ", solve2(games));

// ---------- END OF PART 2 ----------
