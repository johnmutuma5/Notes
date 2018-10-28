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
