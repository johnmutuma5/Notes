# Introduction to Using D3.js
D3 stands for Data Driven Documents

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

```

#### The d3 margin convention
To create room for axes and chart titles, d3 has some margin convention;

- We define the top, right, bottom and left margins
- Set the scales max range by subtracting the relevant margins e.g. top and bottom for the vertical scale
- We wrap the visualisation area within a group and translate it by left and top margins
