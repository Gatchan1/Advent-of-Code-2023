const input = require("./input.cjs");
// const input = require("./mock.cjs");

function extractSeeds(data) {
  // console.log("index of first colon", data.indexOf(":"));
  // console.log("index of first line jump", data.indexOf("\n"))
  const seedsString = data.slice(data.indexOf(":") + 2, data.indexOf("\n"));
  // console.log(seedsString)
  const seedsStringArray = seedsString.split(" ");
  return seedsStringArray.map((seed) => Number(seed));
}
const seeds = extractSeeds(input);
console.log("seeds: ", seeds);

function extractMap(data, index1, index2) {
  const mapString = data.slice(index1, index2);
  const ranges = mapString.split("\n");
  const map = ranges.map((range) => {
    const splittedRange = range.split(" ");
    return splittedRange;
  });
  const numbersMap = map.map((range) => {
    return range.map((num)=> Number(num))
  })
  return numbersMap;
}

function extractSeedToSoil(data) {
  const firstIndex = data.indexOf("seed-to-soil map:\n") + "seed-to-soil map:\n".length;
  const lastIndex = data.indexOf("\n\nsoil-to-fertilizer");
  return extractMap(data, firstIndex, lastIndex);
}
function extractSoilToFertilizer(data) {
  const firstIndex = data.indexOf("soil-to-fertilizer map:\n") + "soil-to-fertilizer map:\n".length;
  const lastIndex = data.indexOf("\n\nfertilizer-to-water");
  return extractMap(data, firstIndex, lastIndex);
}
function extractFertilizerToWater(data) {
  const firstIndex = data.indexOf("fertilizer-to-water map:\n") + "fertilizer-to-water map:\n".length;
  const lastIndex = data.indexOf("\n\nwater-to-light");
  return extractMap(data, firstIndex, lastIndex);
}
function extractWaterToLight(data) {
  const firstIndex = data.indexOf("water-to-light map:\n") + "water-to-light map:\n".length;
  const lastIndex = data.indexOf("\n\nlight-to-temperature");
  return extractMap(data, firstIndex, lastIndex);
}
function extractLightToTemperature(data) {
  const firstIndex = data.indexOf("light-to-temperature map:\n") + "light-to-temperature map:\n".length;
  const lastIndex = data.indexOf("\n\ntemperature-to-humidity");
  return extractMap(data, firstIndex, lastIndex);
}
function extractTemperatureToHumidity(data) {
  const firstIndex = data.indexOf("temperature-to-humidity map:\n") + "temperature-to-humidity map:\n".length;
  const lastIndex = data.indexOf("\n\nhumidity-to-location");
  return extractMap(data, firstIndex, lastIndex);
}
function extractHumidityToLocation(data) {
  const firstIndex = data.indexOf("humidity-to-location map:\n") + "humidity-to-location map:\n".length;
  const lastIndex = data.length;
  return extractMap(data, firstIndex, lastIndex);
}

const seedToSoil = extractSeedToSoil(input);
const soilToFertilizer = extractSoilToFertilizer(input);
const fertilizerToWater = extractFertilizerToWater(input);
const waterToLight = extractWaterToLight(input);
const lightToTemperature = extractLightToTemperature(input);
const temperatureToHumidity = extractTemperatureToHumidity(input);
const humidityToLocation = extractHumidityToLocation(input);

function transform(seed, map) {
  let result;
  map.forEach((range) => {
    if ((seed >= range[1]) && (seed <= range[1] + range[2])) {
      // if the seed is between the lower margin of a range and the upper margin of the same sange
      const difference = range[1] - range[0];
      // we have to subtract this number from our seed number.
      result = seed - difference;
    }
  });
  if (result) return result;
  else return seed;
}

function seedToLocation(seed) {
  const soil = transform(seed, seedToSoil);
  const fertilizer = transform(soil, soilToFertilizer);
  const water = transform(fertilizer, fertilizerToWater);
  const light = transform(water, waterToLight);
  const temperature = transform(light, lightToTemperature);
  const humidity = transform(temperature, temperatureToHumidity);
  const location = transform(humidity, humidityToLocation);
  return location;
}

const transformedSeeds = seeds.map((seed)=> seedToLocation(seed))
// console.log("locations:",transformedSeeds); // Here lies the answer of part 1 !!

// ---------- END OF PART 1 ----------


// :::::::::::: PART 2 ::::::::::::

function getRealSeeds(data) {
  const seedRanges = []
  for (let i = 0; i < data.length; i += 2) {
    seedRanges.push([data[i], data[i+1]])
  }
  console.log("seedRanges: ", seedRanges)

  let lowerLocation;
  // seedRanges.forEach((range) => {

  //First I tried to get them all at once but it was taking too long,
  // so in the end I looked only into one range at a time: 
    for (let i = 0; i < seedRanges[9][1]; i++) {
      let seed = seedRanges[9][0] + i;
      let location = seedToLocation(seed);
      if (!lowerLocation || lowerLocation > location) lowerLocation = location;
    }
  // })
  console.log("9: ", lowerLocation)
}
getRealSeeds(seeds)

// seedRanges[0]: 3117212723
// seedRanges[1]: 210388587
// seedRanges[2]: 120063313
// seedRanges[3]: 317412500
// seedRanges[4]: 3247724559
// seedRanges[5]: 455176214
// seedRanges[6]: 291248264
// seedRanges[7]: 384367354
// seedRanges[8]: 69841803 // this was the answer for part 2!
// seedRanges[9]: 1148949110