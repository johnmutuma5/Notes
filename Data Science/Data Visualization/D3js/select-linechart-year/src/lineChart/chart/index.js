import * as d3 from 'd3';
import AxesFactory from '../axesFactory';
import LegendFactory from '../legendFactory';

import './chart.css';

export default class Chart {
  constructor(props) {
    this.props = props;
    this.chartDimensions = this.dimensions;
    this.chartScales = this.scales;
    this.axesFactory = new AxesFactory(this.chartDimensions, this.chartScales);
    this.legendFactory = new LegendFactory(this.chartDimensions, this.chartScales);
  }

  get dimensions() {
    const { measurements } = this.props;
    const { svgWidth, svgHeight, margins } = measurements;
    return {
      width: svgWidth - (margins.left + margins.right),
      height: svgHeight - (margins.top + margins.bottom)
    };
  }

  groupData(data, groupByAccessor) {
    const { nest } = d3;
    const newData = nest()
      .key(groupByAccessor)
      // .rollup(nestRecords => d3.sum(nestRecords, record => record.temperature))
      .entries(data);
    return newData;
  }

  get scales() {
    const { data } = this.props;
    const { scaleTime, scaleLinear, scaleOrdinal, schemeCategory10, extent } = d3;

    const xScale = scaleTime()
      .domain(extent(data, record => record.datetime))
      .range([0, this.chartDimensions.width])
      .nice();

    const yScale = scaleLinear()
      .domain(extent(data, record => record.temperature))
      .range([this.chartDimensions.height, 0]);

    const colorScaleMaker = data => scaleOrdinal(schemeCategory10)
      .domain(data.map(record => record.key))

    return {
      xScale,
      yScale,
      colorScaleMaker
    }
  }

  createLines(visArea, groupedData, scales) {
    const { line } = d3;
    const { xScale, yScale, colorScaleMaker } = scales;

    const lineGenerator = line()
      .x(record => xScale(record.datetime))
      .y(record => yScale(record.temperature))
      .curve(d3.curveBasis);

    const existingLinesDataJoin = visArea.selectAll('path.sparkline')
      .data(groupedData);
    const lineEnterSelection = existingLinesDataJoin
      .enter()
        .append('path')
          .attr('class', 'sparkline')
          .attr('stroke', record => colorScaleMaker(groupedData)(record.key))
        .merge(existingLinesDataJoin)
          .attr('d', record => lineGenerator(record.values))
  }

  render() {
    const { svg, data, groupEntriesBy, measurements } = this.props;
    const { margins } = measurements;
    const { chartDimensions } = this;
    const scales = this.chartScales;
    // transform the chartContainer
    // svg
    //   .on('mousemove', () => console.log(d3.mouse(this.node())));
    const visArea = svg.append('g')
      .attr('class', 'line-chart-area')
      .attr('transform', `translate(${margins.left}, ${margins.top})`);

    const groupedData = this.groupData(data, record => record[groupEntriesBy]);
    this.axesFactory.createAxes(visArea, data);
    this.legendFactory.create(visArea, groupedData);
    this.createLines(visArea, groupedData, scales);
  }
}
