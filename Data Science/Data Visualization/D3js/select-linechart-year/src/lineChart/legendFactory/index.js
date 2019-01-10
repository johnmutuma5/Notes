export default class LegendFactory {
  constructor(chartDimensions, chartScales) {
    this.chartScales = chartScales;
    this.chartDimensions = chartDimensions;
  }

  create(visArea, groupedData) {
    const { chartScales, chartDimensions } = this;
    const legendGroupEnter = visArea.selectAll('g.legend-container')
      .data([null])
        .enter()
          .append('g')
          .attr('class', 'legend-container')
          .attr('transform',
            `translate(${chartDimensions.width}, 0)`)
    const legendItemsData = legendGroupEnter.selectAll('g.legend-items')
      .data(groupedData.map(record => record.key))
    const legendItemsEnter = legendItemsData
      .enter()
        .append('g')
          .attr('class', 'legend-items')

    const { colorScaleMaker } = chartScales;
    legendItemsEnter.append('circle')
      .attr('cx', 20)
      .attr('cy', (legendText, i) => 30 * i)
      .attr('r', 12)
      .attr('fill', legendText => colorScaleMaker(groupedData)(legendText))

    legendItemsEnter.append('text')
      .text(legendText => legendText)
      .attr('x', 20 + 12 + 10)
      .attr('y', (_, i) => 30 * i)
      .attr('dy', '.35em')
  }
}
