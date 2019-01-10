const prepareSvg = () => {
  const svg = d3.select('svg');
  svg.style('background-color', '#FFF0EB');
  const svgWidth = +svg.attr('width'); // unary + to parseFloat
  const svgHeight = +svg.attr('height');
  return { svg, svgWidth, svgHeight };
}

const { svg, svgWidth, svgHeight } = prepareSvg();
const margins = { top: 70, right: 70, bottom: 100, left: 100 };
const chartAreaWidth = svgWidth - (margins.left + margins.right);
const chartAreaHeight = svgHeight - (margins.top + margins.bottom);
const [dataX, dataY] = ['datetime', 'Portland']
const xPropertyAccessor = row => row[dataX];
const yPropertyAccessor = row => row[dataY];

// get data
const getCsv = async path => await d3.csv(path);
// data sanitize

const numericAutoAttrs = [
  'San Francisco'
];

const sanitizeData = (data) => {
  data.forEach(row => {
    numericAutoAttrs.forEach(attr => row[attr] = +row[attr]);
    row.datetime = new Date(row.datetime);
  });

  return data;
}
// render chart
const renderChart = async () => {
  const rawData = await getCsv('temperature.csv');
  const data = sanitizeData(rawData)
  console.log(data);
  renderScatterPlot(data);
}

renderChart();

const renderScatterPlot = (data) => {
  const chartArea = svg.append('g')
    .attr('class', 'chart-area')
    .attr('transform', `translate(${margins.left}, ${margins.right})`);

  const xScale = d3.scaleTime()
    // .domain([d3.min(data, row => row.displacement), d3.max(data, row => row.displacement)])
    .domain(d3.extent(data, xPropertyAccessor))
    .range([0, chartAreaWidth])
    .nice();

  const yScale = d3.scaleLinear()
    .domain(d3.extent(data, yPropertyAccessor))
    .range([chartAreaHeight, 0])
    .nice();

  const chartTitleGroup = chartArea.append('g')
    .attr('class', 'title-group')
    .attr('transform', `translate(${chartAreaWidth/2}, -30)`)
  chartTitleGroup.append('text')
    .text('Temperatures Visualisation')

  createAxes(data, chartArea, { xScale, yScale });
  renderScatterPoints(data, chartArea, { xScale, yScale });
  renderLine(data, chartArea, { xScale, yScale })
}


function renderLine(data, chartArea, scales) {
  const { xScale, yScale } = scales;
  const lineGenerator = d3.line()
    .x(row => xScale(xPropertyAccessor(row)))
    .y(row => yScale(yPropertyAccessor(row)))
    .curve(d3.curveBasis)

  chartArea.append('path')
    .attr('d', lineGenerator(data))
    .attr('class', 'path-line');
}



function renderScatterPoints(data, chartArea, scales) {
  const { xScale, yScale } = scales;
  const scatterPointsGroup = chartArea
    .append('g')
      .attr('class', 'points-vis-area');

  const points = scatterPointsGroup.selectAll('circle.point')
    .data(data)
    .enter()
    .append('circle')
      .attr('class', 'point')
      .attr('cx', row => xScale(xPropertyAccessor(row)))
      .attr('cy', row => yScale(yPropertyAccessor(row)))
      .attr('r', 1)
}



function createAxes(data, chartArea, scales) {
  const { xScale, yScale } = scales;

  const renderXAxisTo = d3.axisBottom(xScale)
    .tickSize(-chartAreaHeight);
  // create a group to render the x axis
  const xAxisGroup = chartArea
    .append('g')
      .attr('class', 'axis horizontal-axis')
      .attr('transform', `translate(0, ${chartAreaHeight})`);
  renderXAxisTo(xAxisGroup);
  xAxisGroup.append('g')
    .attr('class', 'axis-label horizontal')
      .append('text')
        .text(`${dataX}`)
        .attr('fill', 'black')
        .attr('transform', `translate(${chartAreaWidth/2}, 60)`);
  xAxisGroup.select('path.domain')
    .remove();

  const renderYAxisTo = d3.axisLeft(yScale)
    .tickSize(-chartAreaWidth);
  const yAxisGroup = chartArea
    .append('g')
      .attr('class', 'axis vertical-axis')
  renderYAxisTo(yAxisGroup);
  yAxisGroup.append('g')
    .attr('class', 'axis-label vertical')
    .attr('transform', `translate(-40, ${chartAreaHeight/2})`)
    .append('text')
      .text(`${dataY}`)
      .attr('fill', 'black')
      .attr('transform', 'rotate(-90)');
  yAxisGroup.select('path.domain')
    .remove();
}
