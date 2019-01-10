const svg = d3.select('svg');
svg.style('background-color', 'snow');

const svgWidth = +svg.attr('width'); // unary + to parseFloat
const svgHeight = +svg.attr('height');

class Fruit {
  constructor(type) {
    this.type = type;
    this.id = Math.random();
  }
}
const fruitTypes = ['lemon', 'orange', 'apple'];
const randomizeFruitType = () => {
  const randomIndex = Math.round(0 + (Math.random() * (fruitTypes.length - 1)));
  return fruitTypes[randomIndex];
}

// const fruits = d3.range(5);
const fruits = new Array(7)
  .fill('')
  .map(() => new Fruit('lemon'));

const fruitsGroup = svg.append('g')
  .attr('class', 'fruits-group')
  .attr('transform', `translate(0, ${svgHeight/2})`);


const colorScale = d3.scaleOrdinal()
  .domain(fruitTypes)
  .range(['#c6f50f', '#ffa500', '#f67453']);

const radiusScale = d3.scaleOrdinal()
  .domain(fruitTypes)
  .range([25, 40, 35]);

const fontColorScale = d3.scaleOrdinal()
  .domain(fruitTypes)
  .range(['black', 'magenta', 'white'])



const renderFruits = (props, state) => {
  const { selection, fruits, setSelectedFruit } = props;
  const { selectedFruit } = state;

  const existingFruitsJoin = selection.selectAll('g.fruit')
    .data(fruits, fruit => fruit.id);

  const resolveTranslation = (fruit, i) => `translate(${i * 100 + 100}, 75)`;
  const fruitEnterSelections = existingFruitsJoin.enter()
    .append('g')
      .attr('class', 'fruit')
      .attr('transform', resolveTranslation);

  fruitEnterSelections
    .merge(existingFruitsJoin)
      .transition().duration(1000)
        .attr('transform', resolveTranslation);

  fruitEnterSelections.append('circle')
    .attr('r', 0)
    .merge(existingFruitsJoin.select('circle'))
      .attr('fill', fruit => colorScale(fruit.type))
      .on('click', fruit => setSelectedFruit(fruit.id))
      .attr('stroke', fruit => fruit.id === selectedFruit ? 'black' : 'none')
      .transition().duration(1000)
        .attr('r', fruit => radiusScale(fruit.type));
  fruitEnterSelections.append('text')
    .attr('text-anchor', 'middle')
    .attr('y', 60)
    .merge(existingFruitsJoin.select('text'))
      .text(fruit => fruit.type)
      .attr('fill', fruit => fontColorScale(fruit.type));

  // exit remove excess fruit elements
  const exitFruits = existingFruitsJoin.exit();
  exitFruits.select('circle')
    .transition().duration(1000)
      .attr('r', 0);
  exitFruits.select('text')
    .remove();
  exitFruits
    .transition().duration(1000)
    .remove();
}

class FruitsBowl {
  constructor(props) {
    this.state = {
      selectedFruit: null,
      fruits
    };
    this.props = props;
  }

  setState(callback) {
    this.state = callback(this.state);
    this.render();
  }

  setSelectedFruit(fruitId) {
    this.setState(prevState => {
      let { fruits } = prevState;
      fruits = fruits.map(fruit => ({...fruit}));
      const targetFruitIndex = fruits.findIndex(fruit => fruit.id === fruitId);
      const newFruit = new Fruit(randomizeFruitType());
      fruits.splice(targetFruitIndex, 1, newFruit);
      return {
        ...prevState,
        fruits,
        selectedFruit: newFruit.id
      }
    });
  }

  renderBowl(selection) {
    const bowlJoin = selection.selectAll('rect.bowl').data([null]);
    const bowlEnterSelection = bowlJoin
      .enter()
        .append('rect')
          .attr('class', 'bowl');
    bowlEnterSelection
      .merge(bowlJoin.select('rect.bowl'))
      .attr('width', 800)
      .attr('height', 150)
      .attr('rx', '20%');
  }

  render() {
    const { selection } = this.props;
    const { selectedFruit, fruits } = this.state;
    this.renderBowl(selection);
    let props = {
      ...this.props,
      fruits,
      setSelectedFruit: this.setSelectedFruit.bind(this)
    };
    renderFruits(props, this.state);
  };
}


const fruitBowl = new FruitsBowl({selection: fruitsGroup });
fruitBowl.render();
