import LineChart from './chart';

const createChart = (svg, data, options) => {
  const { groupEntriesBy } = options;

  const measurements = {
    margins: { top: 100, bottom: 100, right: 200, left: 100 },
    svgWidth: +svg.attr('width'),
    svgHeight: +svg.attr('height')
  }
  const lineChart = new LineChart({svg, data, measurements, groupEntriesBy});
  lineChart.render();
};

export default createChart;
