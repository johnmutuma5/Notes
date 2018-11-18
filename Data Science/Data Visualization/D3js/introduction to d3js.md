# Introduction to Using D3.js
D3 stands for Data Driven Documents

## Resources
[d3 in-depth](https://d3indepth.com/ "d3-indepth")

## Loading D3js from a CDN
We can use `unpkg.com` to load node modules. It provides the minified script of the latest version of the module.

```html
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title></title>
    <script src="https://unpkg.com/d3@5.7.0/dist/d3.min.js"></script>
  </head>
  <body>
    <script>
      console.log(d3);
    </script>
  </body>
</html>
```

## Selecting elements
D3 provides the `select` method which aids in seleting elements from the DOM just like JavaScript's `document.querySelectorAll`.

```js
const svg = d3.select('svg');
console.log(svg);
```

## Making a bar chart with D3js
- Representing a data table in JavaScript
- Creating rectangles for each row
- Using d3 linear and band scales
- The margin convention
- Adding axes


### Representing a data table in JavaScript
#### Loading CSV data
From d3, we can import a function `csv` that is instrumental in loading CSV data from a file. The function `csv` returns a promise that resolves the data in the CSV.

```js
d3.csv('path/to/file.csv')
  .then(data => {
    console.log(data);
  });

// using async/await
async function getCsv (path) {
  const data = await d3.csv(path);
  console.log(data);
}
```

***NB: Remember to `parseFloat` for numeric values in CSV as they are loaded as strings.***

### Creating rectangles for each row
#### The d3 data join

data  -----------   elements

enter ----- update ----- exit

'enter' to match every row in the data with an element, 'update' to create new elements for rows that didn't get an element to match with due to insufficient number of elements.

After selecting elements that will become a representation of all the rows in the data, we need to join data into the selection context, then enter the data into each element, and finally 'update' to create elements for data that didn't get an element to enter into.

```js
svg.selectAll('rect')
  .data(data)
  .enter()
  .append('rect')

```

### Using d3 linear and band scales
We would like to make the rectangles created to be bars of a bar chart that correspond to the data.

#### Linear scales
Linear scales are good with quantitative attributes. A linear scale comprises;

- Domain - this is the `data space` i.e. the `min` and `max` values in the data
- Range - this is the `display space` i.e. the `min` and `max` space available

For instance, if we have data that has a `max` value of 1000, then the domain here is `[0, 1000]`. If the screen is only `500px`, then the range is `[0, 500]` whereby the `max` in the domain will correspond to `500`.

We can access `scaleLinear` function from d3.

```js
const width = 960;

const xScale = d3.scaleLinear()
  .domain([0, d3.max(data, row => row.population)])
  .range([0, width])

```

#### Band scales
Band scales are good with ordinal/categorical attributes of a dataset.
Just like the linear scale, they comprise a `domain` and a `range`.

The domain for band scale is an array of all available categories. The range is the available display space.


```js
const height = 960;

const yScale = d3.scaleBand()
  .domain(data.map(data => data.country))
  .range([0, height])
  .padding(.2) // adds separation between bands

```

#### Other scales
- `scaleTime` - for time
- `scalePoint` - like `scaleBand` for points as opposed to rectangles
- `scaleOrdinal` - for switching values against categorical attributes
    ```js
      const colorScale = d3.scaleOrdinal()
        .domain(['Kenya', 'Tanzania', 'Uganda'])
        .range(['green', 'orange', 'blue'])
    ```

#### The d3 margin convention
To create room for axes and chart titles, d3 has some margin convention;

- We define the top, right, bottom and left margins
- Set the scales max range by subtracting the relevant margins e.g. top and bottom for the vertical scale
- We wrap the visualisation area within a group and translate it by left and top margins
- Create an axis group and append it to the visualisation group

d3 provides axis utilities for creating axes. For instance, we can use `d3.axisLeft` to create a left axis using our y scale;

```js
const visGroup = svg.append('g');
const height = 960;
const yScale = d3.scaleBand()
  .domain(['Red', 'Green', 'Blue', 'Gold'])
  .range([0, height])

const renderYAxisTo = d3.axisLeft(yScale);
const yAxisGroup = visGroup.append('g');
renderYAxisTo(yAxisGroup)

```

### Customising axes
#### Formating numbers
d3 provides a number formatting utility for axes, `d3.format(<format specifier>)` which can be used with `tickFormat` method of an axis instance.

```js
const renderYAxisTo = d3.axisLeft(yScale)
  .tickFormat(d3.format('.2s'));
```

`tickFormat` accepts a function that receives a number and returns a formatted `string`. `d3.format` does that; it returns a function that accepts a number and returns a formatted `string`. We can, therefore, create our own custom formatter as a function that accepts a number and formats it.

```js
const tickFormatter = number => d3.format('.2s')(number);
const renderYAxisTo = d3.axisLeft(yScale)
  .tickFormat(tickFormatter);
```

#### Removing unnecessary lines
d3 selections have a method `remove` that removes the selection from the DOM.

```js
yAxisGroup
  .selectAll('.domain, g.tick line') // selectAll, select work like css accessors
  .remove();
```

#### Adding a visualisation title
We append a `text` svg element to the visualisation.

#### Tick gridlines
The axis creator has another property `tickSize` which sets the size of the tick lines. By setting this to the inner height of the chart, the tick marks create tick gridlines.

```js
const renderYAxisTo = d3.axisLeft(yScale)
  .tickFormat(d3.format('.2s'))
  .tickSize(-innerChartHeight); // for bottom axis, set negative for the tick gridlines to span upwards
```


## Scatter plots
This are very good for visualisation of quantitative attributes.

## Line and Area charts
These are also good for visualisation of quantitative attributes.
d3 avails a `line` function and an `area` function which are useful for generating these types of visualisations.

```js
const lineGenerator = d3.line() // you can supply an array of points to `line`
  .x(row => xScale(row.temperature))
  .y(row => yScale(row.city))
  .curve(d3.curveBasis) // optional
```

```js
const areaGenerator = d3.area()
  .x(row => xScale(row.temperature))
  .y1(row => yScale(row.city))
  .y0(innerChartHeight);
```

It's good practice to have areas charts with a zero baseline for the domain.

### The general update pattern for d3

Enter => Update => Exit

#### Data join
On calling `d3.selectAll(<el_type>).data(<data>)`, we have created a data join.

By calling `enter` on the data join, d3 determines the number of DOM elements that are missing to match the length of the data.

`exit` should be called when there are more than enough DOM elements compared to the number of records in the data. Exit returns a d3 selection of the surplus elements. We can therefore call `.remove` on that selection.
```js
svg.selectAll('circle').data(data)
  .exit()
  .remove()
```

`update` should happen when there are just enough DOM elements corresponding to the data. There is no `update` function in d3, rather, the data join is the update selection itself and setting attributes on the data join will trigger update.

```js
const radiusScale = d3.scaleLinear()
  .domain(d3.extent(data, row => row.population))
  .range(5, 50);

const colorScale = d3.scaleOrdinal()
  .domain(['Kenya', 'Tanzania', 'Uganda'])
  .range(['green', 'orange', 'blue'])

const circles = svg.selectAll('circles').data(data); // the data join is the update selection
// create new circles for deficit DOM nodes
circles
  .enter()
  .append('circle')
    .attr(`cx`, (row, i) => i*100 + row.offset)
    .attr(`cy`, (row, i) => i*100 + row.offset)
    .attr('r', row => radiusScale(row.population))
    .attr('fill', row => colorScale(row.country))
// update pre-existing circles
circles
  .attr('r', row => radiusScale(row.population))
  .attr('fill', row => colorScale(row.country))
// remove excess DOM elements
circles.exit().remove()

```

`merge` - merge helps eliminate duplication of code between the `update` and `enter` phases.
merge can improve the code above as follows;

```js
// ...
const circles = svg.selectAll('circles').data(data); // the data join is the update selection
// create new circles for deficit DOM nodes
circles
  .enter()
    .append('circle')
      .attr(`cx`, (row, i) => i*100 + row.offset)
      .attr(`cy`, (row, i) => i*100 + row.offset)
  .merge(circles) // merge the appended circles with the pre-existing circles to add common attributes
    .attr('r', row => radiusScale(row.population))
    .attr('fill', row => colorScale(row.country))
// remove excess DOM elements
circles.exit().remove()
```

`Animated transitions` - on a selection we can set transitions directly too;

```js

circles
  .enter()
    .append('circle')
      .attr('r', '0')
  .transition().duration(1000)
    .attr('r', 100)
```


`Object Constancy` - D3 retains the state(attributes) of the elements in memory. By default, the index in the data array is used to store the attributes of the elements. By removing some data records from the array, the rest of the elements get affected in that they get a new index in the array and by default, their attributes change to what d3 has stored as the attributes for their new indexes; these include positions and other attributes such as fill colors etc.

Sometimes, we don't want elements to mutate attributes when their indexes vary. As such, we need to avail to d3 an alternative way to store the attributes of the elements representing the data; we can pass a key to the data join. This is supposed to be unique for each record for d3 to store the attributes.

```js
const circles = d3.selectAll('circles').data(data, row => row.<unique_identifier>)
  .enter()
    .append('circle')
```

With a unique identifier for each record of data, the elements don't mutate state once their positional indexes change.

`Nested elements` - use groups and bind data to the group, update on the children element and exit on the group

`Singular elements` - data([null])


### Marks and Channels
- Marks - Points, Lines, Areas
- Channels - Position, Color and Shapes
- How to choose marks and channels based on attribute types and tasks


#### Channels

|            |              | Categorical |  Ordered     |  Quantitative    |
|:----------:|:------------:|:-----------:|:------------:|:----------------:|
| Position   | X Position   | Yes         | Yes          | Yes              |
|            | Y Position   | Yes         | Yes          | Yes              |
| Size       | Area         | -           | Yes          | Yes              |
| Color      | Luminance    | -           | Yes          | Yes              |
|            | Hue          | Yes         | -            | -                |


### Interaction with Unidirectional Data
- Listenning for Click events - `on('<event>', <listener>)`
- Unidirectional data flow concepts - `render -> interact -> update container state -> re-render with general d3 update pattern`
- Selecting a mark by clicking
- Highlighting a selected mark
- Selecting a mark by hovering


### Making a world map with D3
- Loading and parsing `TopoJSON`
- Rendering geographical features
- Using different map projections
- Rendering the projected sphere outline
- Tweaking map styles


### Building a Tree Visualization
- Constructing a node-link tree visualization
- Adding text to the nodes
- Using the margin convention
- Tweaking label alignment and size
- Panning and zooming
- Using a custom font

`Constructing a node-link tree visualization` - in order to create a tree visualization with d3.js, we need to make use of d3.js `hierarchy` to create a hierarchy. The function needs to take as an argument stratified json data that has this format;

```json
{
  "<key>": "<value>",
  "<key1": "<value1>",
  "children": [
    {
      "<key1>": "<value1>",
      "children": [
        {
          "<key1>": "<value1>"
        }
      ]
    }
  ]
}
```

i.e. we need data with nodes, and each node needs to have a data and children attributes. If our data is not in this format, then we can make use of `d3.stratify` to stratify our data.

Once we have a hierarchy from our data, we can use it to construct a tree. Basically, a tree is the same hierarchy object with `x` and `y` coordinates for the nodes and `source` and `target` nodes for the links. With `d3.tree`, we can construct a nice tree object.

```js
//...
const hierarchyRoot = d3.hierarchy(data);
const treeConstructor = d3.tree()
  .size([<width>, <height>]);

treeConstructor(hierarchyRoot);
// this, above, adds x and y positions for the nodes and target source for the links
// ...
```

### Creating Legends (Size and Color)
We can use the color scale to extract the domain and determine the colors at the same time by creating a data join using the domain values as the data and rendering appropriate shapes/symbols with d3.

```js
const colorScale = d3.scaleOrdinal()
  .domain(['lemon', 'orange', 'lime'])
  .range(['turquoise', 'orange', 'green'])

const legendItemsGroupDataJoin = d3.selectAll('g.legend-item')
  .data(colorScale.domain());

const ITEM_TOP_OFFSET = 150;
const legendItemsGroupEnter = legendItemsGroupDataJoin
  .enter()
    .append('g')
      .attr('class', 'legend-item')
      .attr('transform', (color, i) => `translate(0, ${ i * ITEM_TOP_OFFSET })`)

legendItemsGroupEnter
  .append('circle')
    .attr('r', 20)
    .attr('fill', colorScale);

legendItemsGroupEnter
  .append('text')
    .text(color => color)
    .attr('fill', 'black');

```

The same premises can be adapted for the size legend. This is good for Categorical or Ordinal attribute legends. For quantitative attribute legends, we may want to use `scaleSqrt` instead of `scaleOrdinal`.

```js

const radiusScale = d3.scaleSqrt()
  .domain(d3.extent(data, d => d.<attribute>))
  .range([0, <maxRadius>])

const ticks = radiusScale.domain().ticks(<number_of_ticks>)
const legendItemsGroupDataJoin = d3.selectAll('g.legend-item')
  .data(ticks);

//...

```

### Melting and Munging Data for Visualisation
