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
console.log(seeds);

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

const transformedSeeds = seeds.map((seed)=>{
    const soil = transform(seed, seedToSoil);
    const fertilizer = transform(soil, soilToFertilizer);
    const water = transform(fertilizer, fertilizerToWater);
    const light = transform(water, waterToLight);
    const temperature = transform(light, lightToTemperature);
    const humidity = transform(temperature, temperatureToHumidity);
    const location = transform(humidity, humidityToLocation);
    return location;
})
console.log("locations:",transformedSeeds);