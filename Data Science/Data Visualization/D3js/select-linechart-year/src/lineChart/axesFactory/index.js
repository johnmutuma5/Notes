import * as d3 from 'd3';

export default class AxesFactory {
  constructor(chartDimensions, scales) {
    this.chartDimensions = chartDimensions;
    this.scales = scales;
  }

  _createXAxis(chartArea, data) {
    const { axisBottom } = d3;
    const { xScale } = this.scales;
    const renderXAxisTo = axisBottom(xScale);
    const xAxisGroup = chartArea.append('g')
      .attr('class', 'horizontal-axis-group')
      .attr('transform', `translate(0, ${this.chartDimensions.height})`);
    xAxisGroup.call(renderXAxisTo);
  }

  _createYAxis(chartArea, data) {
    const { scaleLinear, axisLeft, extent } = d3;
    const { yScale } = this.scales;
    const renderYAxisTo = axisLeft(yScale);
    const yAxisGroup = chartArea.append('g')
      .attr('class', 'vertical-axis-group')
      // .attr('transform', `translate(0, ${this.chartDimensions.height})`);
    yAxisGroup.call(renderYAxisTo);
  }

  createAxes(chartArea, data) {
    this._createXAxis(chartArea, data);
    this._createYAxis(chartArea, data);
  }
}
