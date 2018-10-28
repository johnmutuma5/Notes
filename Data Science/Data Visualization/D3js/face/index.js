const svg = d3.select('svg');
svg.style('background-color', 'coral');

const svgWidth = +svg.attr('width'); // unary + to parseFloat
const svgHeight = +svg.attr('height');

const faceElements = svg
  .append('g')
    .attr('class', 'face-elements')
    .attr('transform', `translate(${svgWidth/2}, ${svgHeight/2})`);

const face = faceElements
  .append('circle')
    .attr('r', 100)
    .attr('fill', 'yellow')
    .attr('stroke', 'black');

const eyeVerticalOffset = -30;
const eyeHorizontalOffset = 40;
const eyes = faceElements
  .append('g')
    .attr('class', 'eyes')
    .attr('transform', `translate(0, ${eyeVerticalOffset})`);

const eyeRadius = 16;
const leftEye = eyes
  .append('ellipse')
    .attr('rx', eyeRadius)
    .attr('ry', eyeRadius * 1.5)
    .attr('cx', -eyeHorizontalOffset)
    .attr('class', 'left-eye');

const rightEye = eyes
  .append('ellipse')
    .attr('rx', eyeRadius)
    .attr('ry', eyeRadius * 1.5)
    .attr('cx', eyeHorizontalOffset)
    .attr('class', 'right-eye');

const eyeBrows = eyes
  .append('g')
    .attr('class', 'eye-brows')
    .attr('transform', 'translate(0, -30)');

// eyeBrows
//   .transition().duration(500)
//     .attr('transform', 'translate(0, -50)')
//   .transition().duration(1000)
//     .attr('transform', 'translate(0, -30)')

const rightBrow = eyeBrows
  .append('rect')
    .attr('height', '5')
    .attr('width', '25')
    .attr('transform', 'rotate(20)')
    .attr('x', '-50')

const leftBrow = eyeBrows
  .append('rect')
    .attr('height', '5')
    .attr('width', '25')
    .attr('transform', 'rotate(-20)')
    .attr('x', '30')

const mouth = faceElements
  .append('path')
    .attr('d', 'M-40,40 a30,50 -50,0,0 80,0 Z')
    .attr('stroke', 'black')
    .attr('stroke-width', '1')
    .attr('stroke-linejoin', 'round')
    .attr('fill', 'pink')

// const mouth = faceElements.append('path')
//   .attr('d', d3.arc()({
//     innerRadius: 90,
//     outerRadius: 100,
//     startAngle: Math.PI / 2,
//     endAngle: (Math.PI / 2) * 1.7
//   }))
//   .attr('stroke', 'black')
//   .attr('stroke-width', '5')
//   .attr('stroke-linejoin', 'round')
