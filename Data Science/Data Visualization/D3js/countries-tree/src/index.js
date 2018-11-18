import { help } from './helper';

help()

const prepareSvg = () => {
  const svg = d3.select('svg');
  svg.style('background-color', '#FFF0EB');
  const svgWidth = +svg.attr('width'); // unary + to parseFloat
  const svgHeight = +svg.attr('height');
  return { svg, svgWidth, svgHeight };
}

const { svg, svgWidth, svgHeight } = prepareSvg();
const margins = { top: 50, right: 200, bottom: 50, left: 150 };
const chartAreaWidth = svgWidth - (margins.left + margins.right);
const chartAreaHeight = svgHeight - (margins.top + margins.bottom);

const getJson = async (path) => {
  return await d3.json('src/data.json');
};

const renderTree = async () => {
  const data = await getJson('data.json');
  const hierarchyRoot = d3.hierarchy(data);
  const tree = d3.tree()
    .size([chartAreaHeight, chartAreaWidth]);
  // add x and y postions for the nodes in hierarchyRoot
  tree(hierarchyRoot);

  const chartArea = svg.append('g')
    .attr('class', 'chart-area')
    .attr('transform', `translate(${margins.left}, ${margins.top})`);

    // svg.call(d3.zoom().on('zoom', () => {
    //   chartArea
    //     .attr('transform', d3.event.transform)
    // }));
    d3.zoom().on('zoom', () => {
      chartArea
        .attr('transform', d3.event.transform)
    })(svg)

  const linksDataJoin = chartArea.selectAll('path.path path-links')
    .data(hierarchyRoot.links());
  const nodesDataJoin = chartArea.selectAll('g.node node-group')
    .data(hierarchyRoot.descendants());

  const linkGenerator = d3.linkHorizontal()
    .x(link => link.y)
    .y(link => link.x)

  const linksEnterSelection = linksDataJoin
    .enter()
      .append('path')
        .attr('d', link => linkGenerator(link))
        .attr('class', 'path path-links');
  const nodesEnterSelection = nodesDataJoin
    .enter()
      .append('g')
        .attr('class', 'node node-group');
  nodesEnterSelection
      .append('circle')
        .attr('r', node => (node.height * 2) + 1)
        .attr('transform', 'translate(1, 0)')
        .attr('class', 'node-circle')
        .transition().duration(800)
          .attr('cx', node => node.y) // inverted because it's a horizontal chart
          .attr('cy', node => node.x);

  nodesEnterSelection
      .append('text')
        .text(node => node.data.data.id)
        .attr('dy', '.2em')
        .attr('text-anchor', node => !node.children ? 'start' : 'end')
        .attr('dx', node => `${(!node.children ? '+' : '-')}${'.9em'}`)
        .attr('font-size', node => `${(node.height*.4)+.2}em`)
        .attr('class', 'node-text')
        .transition().duration(1000)
          .attr('x', node => node.y) // inverted because it's a horizontal chart
          .attr('y', node => node.x);
}

renderTree();
