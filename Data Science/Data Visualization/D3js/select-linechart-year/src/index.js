import * as d3 from 'd3';
import createChart from './lineChart';
import { doMeltColumns } from './helpers';


const svg = d3.select('svg.chart');
svg
  .style('background-color', '#fdf9f8');

const getCsv = path => d3.csv(path);

const main = async () => {
  const rawData = await getCsv('src/temperature.csv');
  let columnsToMelt = [...(rawData.columns)];
  columnsToMelt = columnsToMelt.slice(1, 6);
  const data = doMeltColumns(rawData, columnsToMelt, 'city', 'temperature');
  createChart(svg, data, { groupEntriesBy: 'city' });
}

main();
