const svg = d3.select('svg');
svg.style('background-color', 'floral');

const svgWidth = +svg.attr('width'); // unary + to parseFloat
const svgHeight = +svg.attr('height');

async function getCsv(path) {
  const data = await d3.csv(path);
  return data;
}

async function processData(path) {
  const data = await getCsv(path);
  data.forEach(data => data.population = +data.population);
  console.log(data);
}

processData('population_1950.csv');
