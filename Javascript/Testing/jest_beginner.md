# Testing Javascript applications

## This is beginner tutorial notes taken from the following tutorial from Traversy Media on YouTube.

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
const add = (num, num1) => num + num1;
```
