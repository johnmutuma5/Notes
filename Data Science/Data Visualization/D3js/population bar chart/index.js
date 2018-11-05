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
  const margin = { top: 50, bottom: 50, right: 50, left: 155 };
  const innerChartWidth = svgWidth - (margin.left + margin.right);
  const innerChartHeight = svgHeight - (margin.top + margin.bottom);

  const xScale = d3.scaleLinear()
    .domain([0, d3.max(data, getRowXValue)])
    .range([0, innerChartWidth]);
  const tickFormatter = number => d3.format('.3s')(number)
    .replace('M', 'Mill.');
  const renderXAxisTo = d3.axisBottom(xScale)
    .tickFormat(tickFormatter)
    .tickSize(-innerChartHeight);

  const yScale = d3.scaleBand()
    .domain(data.map(getRowYValue))
    .range([0, innerChartHeight])
    .padding(.15);
  const renderYAxisTo = d3.axisLeft(yScale);

  const visGroup = svg.append('g')
    .attr('class', 'vis-group')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);
  const yAxisGroup = visGroup
    .append('g')
      .attr('class', 'axis veritcal-axis-group');
  const xAxisGroup = visGroup
    .append('g')
      .attr('class', 'axis horizontal-axis-group')
      .attr('transform', `translate(0, ${innerChartHeight})`);
  // render axes
  renderYAxisTo(yAxisGroup);
  renderXAxisTo(xAxisGroup);
  xAxisGroup.append('text')
    .text('Population')
    .attr('fill', 'black')
    .attr('x', innerChartWidth/2)
    .attr('y', 35)
  // remove the domain line from the axes
  yAxisGroup
    .selectAll('.domain, g.tick line')
    .remove();
  xAxisGroup
    .select('.domain')
    .remove();
  // Add plot title
  const titleGroup = visGroup
    .append('text')
      .attr('y', -20)
      .attr('x', innerChartWidth/2)
      .style('text-anchor', 'middle')
      .attr('class', 'chart-title')
      .text('Total Population in East Africa (1950)')


  const barGroup = visGroup
    .append('g')
      .attr('class', 'bar-geom-group');

  barGroup.selectAll('rect.bar')
    .data(data)
    .enter()
    .append('rect')
      .attr('class', 'bar')
      .attr('width', row => xScale(getRowXValue(row)))
      .attr('height', yScale.bandwidth())
      .attr('y', row => yScale(getRowYValue(row)));
}

const prepareSvg = () => {
  const svg = d3.select('svg');
  svg.style('background-color', '#FFF0EB');
  const svgWidth = +svg.attr('width'); // unary + to parseFloat
  const svgHeight = +svg.attr('height');
  return { svg, svgWidth, svgHeight };
}
