async function visualizeData(path) {
  const data = await getCsv(path);
  // from thousands to actual numbers
  data.forEach(data => data.population = +data.population * 1000);
  renderBarChart(data);
}

visualizeData('population_1950.csv');













async function getCsv(path) {
  const data = await d3.csv(path);
  return data;
}

const renderBarChart = data => {
  renderBars(data)
};

const renderBars = data => {
  const { svg, svgWidth, svgHeight } = prepareSvg();
  const getRowXValue = row => row.population;
  const getRowYValue = row => row.country;
  const margin = { top: 50, bottom: 50, right: 50, left: 50 };
  const innerChartWidth = svgWidth - (margin.top + margin.bottom);
  const innerChartHeight = svgHeight - (margin.right + margin.left);

  const xScale = d3.scaleLinear()
    .domain([0, d3.max(data, getRowXValue)])
    .range([0, innerChartWidth]);

  const yScale = d3.scaleBand()
    .domain(data.map(getRowYValue))
    .range([0, innerChartHeight]);

  const barGroup = svg.append('g')
    .attr('class', 'bar-geom-group')
    .attr('transform', `translate(${margin.right}, ${margin.top})`);

  barGroup.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
      .attr('width', row => xScale(getRowXValue(row)))
      .attr('height', yScale.bandwidth())
      .attr('y', row => yScale(getRowYValue(row)));
}

const prepareSvg = () => {
  const svg = d3.select('svg');
  svg.style('background-color', 'coral');
  const svgWidth = +svg.attr('width'); // unary + to parseFloat
  const svgHeight = +svg.attr('height');
  return { svg, svgWidth, svgHeight };
}
