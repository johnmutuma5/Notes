# Testing Javascript applications

#### This is beginner tutorial notes taken from the following tutorial from Traversy Media on YouTube.

[![this](https://img.youtube.com/vi/7r4xVDI2vho/maxresdefault.jpg)](https://www.youtube.com/watch?v=7r4xVDI2vho 'Testing JavaScript with Jest')

Link to git repo:

## Table of Contents


### Managing project dependencies
We need to create a package.json file in the root directory of our project to manage the project's dependencies.

You can use `npm` to initialize an `npm` managed project. Running `npm init -y` will initialize a project with a `package.json` that will be updated by `npm` with every installation of a package/dependency. `-y` flag indicates to use default settings.

> run npm init -y

### Installing Jest
We will install Jest as a development dependency and save it to our `package.json` for portability.

> npm install --save-dev jest

or
> npm install -D jest


### Create a function to test

```js
// functions.js

const add = (num, num1) => num + num1;

module.exports = add;
```

### Our first Jest test

```js
// functions.test.js

const add = require('./functions');


test("it adds correctly", () => {
    expect(add(2, 2)).toBe(4);
});

```

A test will be provoked by call to a function `test` which takes the description of the test The callback function is expected to call another function `exppect` which calls the function to be tested passing testing arguments to it.

### Matchers

The return value of a call to `expect` is chained with a `matcher`(*more on matchers later*).

The `matcher` compares the output of the tested function and the `matchers` arguments and if a match if found, then the test has passed. Our `matcher` in this case is `toBe`.

#### Negating a matcher
A match returns `true` for a match. We may sometimes want to return true for no match! For instance, we may want to test that the add function does not return 5 when we pass 2 and 2 as its arguments. Thus we test that `add` does not return 5 for 2 + 2.

This is easily achieved with jest by preceeding the matcher with `.not`.

```js
// functions.test.js

const add = require('./functions');


test("it adds correctly", () => {
    expect(add(2, 2)).not.toBe(5);
});
```
