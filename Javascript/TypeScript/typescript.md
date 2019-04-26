These notes are taken from [this](https://udemy.com/understanding-typescript) amazing course from Udemy.

# Table of Contents
- [What is TypeScript](#what-is-typescript)
- [Setting up a Typescript Project](#setting-up-a-typescript-project)
- [Basic Types](#basic-types)
  - [Type Inference](#type-inferencestring)
  - [Arrays](#arrays)
    - [A gentle Peek into Type Union](#a-gentle-peek-into-type-union)
  - [Tuples](#tuples)
  - [Adding Types to Functions](#adding-types-to-functions)
    - [Funtion Return Value Type](#funtion-return-value-type)
    - [Function Argument Types](#function-argument-types)
      - [Function Variables](#function-variables)
    - [never Type and Exhaustive Checking](#never-type-and-exhaustive-checking)


# What is TypeScript
Typescript is a strongly typed superset of JavaScript.

# Setting up a TypeScript Project
TypeScript project will have .ts files that will be compiled to JavaScript. We can a node package manager like yarn on npm in a TypeScript project. One thing we'd want to do is to install a basic server like lite-server.

> npm install lite-server

In the package.json file, we can add a convinience script to start the server;

```json
{
  "scripts": {
    "start": "lite-server"
  }
}
```

The set up above will allow us to use `npm start` in the command-line inside the project directory to start up the server and by default server an `index.html` that we'd have in the root of the project directory.


We also would want to configure typescript in our project directory in order to specify our desirable options. e.g. specify the directory to be compiled. This can be achived by running `tsc-init` which will generate a new `.tscconfig.json` file in the root of our project.

# Basic Types
TypeScript allows us to be explicit about the types of items such as variables. There are a number of inbuilt types such a strings and numbers but we can still define our own types.

## Type Inference
If we do not specfy a type for a variable, TypeScript infers the type from the value we provide to the variable. For instance, the variable name below will be assigned a type string by inference.

```ts
let myName = 'John';
```

If we attempted to assign the variable another type which is not string e.g. number, the compiler would throw an error to that respect.

```ts
myName = 30; // this would cause the compiler to throw an error
```

In case we don't declare a variable with a value, TypeScript assigns `any` type to the variable.

```ts
let age;
age = "30"; // works
age = 30; // also works
```

## Explicit Type Assignment
The real power of TypeScript types is not in type inference but in allowing us to explicitly assign types to our variables. We do so as follows;

```ts
let age: number;
```

## Arrays
Besides numenrs and strings, TypeScript also allows us to declare types for arrays. We can choose one of at least two syntax approaches to achieve that;

```ts
let favNumbers: (number)[];
```

```ts
let favNumbers: Array<number>;
```

### A gentle Peek into Type Union
Sometimes, like in the example of favNumbers above, we may wnat to allow a union of types i.e. let a type be one of at least two. We may want our array of favNumbers to be of type either number or string. Type union allows us to do that. We use the `|` operator.


```ts
let favNumbers: (number|string)[];
// or
// let favNumbers: Array<number|string>;
```

## Tuples
We may find ourselves in a situation where we would like to have an array with fixed length and desirable types of contents. These are referred to as tuples.


```ts
let address: [string, number];
address = ['Thindigua Street', 15];
```

A tuple has to be in the declared format i.e. in this case, it specifies that we have a array of two items, first one has to be a string and the second one has to be a number.


## Enums
Sometimes, we may want to enumerate words in order to assign them numeric values. This can be useful for instance when we have an array of integers that have implied meanings that we're aware of and we we'd like to map those integers into their meanings perhaps to improve readability and avoid typos.

Consider a case where we recieve an array of movie ratings between 0 and 4 whereby we know that 0 = Very Bad, 1 = Bad, 2 = Indifferent, 3 = Good and 4 = Very Good for 5 different movies. 

```ts
const ratings = [2, 1, 0, 3, 4];
```

We could give some more meaning to these using Enums;

```ts
enum MovieRating {
  VeryBad /* we can specify a value e.g. VeryBad=1 and Bad below will be 2 */,
  Bad,
  Indifferent,
  Good,
  VeryGood
}

```

We can then refer to our Enum to make the meaning very clear;
```ts
const ratings: MovieRating[] = [2, 1, 0, 3, 4];

ratings.map((rating: MovieRating) => {
  switch (rating) {
    // ... more case(s)

    case(MovieRating.Bad):
      console.log(rating, 'That movie was bad!');
      break;

    case(MovieRating.Indifferent):
      console.log(rating, 'That movie was just okay!');
      break;

    case(MovieRating.Good):
      console.log(rating, 'That movie was good');
      break;
    
    // ... more case(s)

    default:
      console.log(rating, 'Unknown movie rating');
  }
})
```

## Adding Types to Functions
We can also be explict about types when working with functions.

### Funtion Return Value Type
We can specify the type of the return value for a function as follows;

```ts
function myName(): string { /* do something to get my name */ };
```

The function above is declared to return a string by `: string`.

In cases where a function does not return a value but runs to completion without throwing an error, we can specify the return type as `void`;

```ts
function printName (): void {
  console.log('John');
}
```

### Function Argument Types
We can specify the types of arguments for funtions as follows;

```ts
function printName (name: string): void {
  console.log(name);
}
```
#### Function Variables
Since JavaScritp allows us to store functions into variables, we're also able to specify types or function signatures to determine the types of functions that certain varibales should hold.

```ts
let nameLogger: (name: string) => void;
```
The syntax above is how we set a function's signature. This will allow us to assign
to the variable, nameLogger, any callable that accepts a single string variable and returns nothing. An important thing to note is that the variable name is not important here in the declaration, only the types are important; we can, therefore, assign a function that is defined with a different variable name as long as the variable is of type string.

```ts
nameLogger = function (childName: string): void {
  /* log somewhere */
};

nameLogger('Lazuli');
```

### never Type and Exhaustive Checking
In some cases, a function may never return a value because it will always throw an error or just terminate prematurely for a reason. In such a case, the return type for the function becomes `never`. This can be very useful when implementing an exhaustive check for a switch/if statement. Exhaustive check helps us affirm that we've exhausted all possible scenarios with the brances of code;

```ts
enum Color {
  Red,
  Gold,
  Green
}

function printColorName (color: Color): void {
  switch (color) {
    case(Color.Red):
      console.log('red');
      break;

    case(Color.Gold):
      console.log('gold');
      break;

    default:
      /**
       * this block is never expected to run if our case statements exhaust all
       * the three available color cases, Red, Gold and Green
       *
       * We therefore call an exhaustive check assertion here. This should be a
       * function that takes an argument of type never as expected.
       *
       * In cases where our switch/if branches have not exhausted all availble
       * scenarios, the compiler with throw an error.
       *
       * In this case, we have not exhausted the available color options since
       * didn't include a case for Color.Green. This means that at some point,
       * this exhaustive check funtion may be called with Color.Green. This is
       * the reason why the compiler cant compile this code and it'll alert us
       * that Color.Green is not assignable to an argument of type never which
       * is what we'd be attempting to do.
       */
     return assertInvalidColor(color); 
  }
}

function assertInvalidColor(color: never): never {
  /**
   * This function never returns a value; always throws an error
   *
   * It serves the purpose of an exhaustive check for code branching hence its
   * argument is set to type never since it's expected to never be called if the
   * the code in question is exhaustive
   */
  throw new Error('Unknown color: ', color);
}
```

## Object Types
TypeScript still inferes types for variables assigned with objects.

```ts
let person = {
  name: 'Sheelah',
  age: 29
}
```

With that in place, the type of person is infered by TypeScript to be an object that must contain two properties, a string name and number age; in this case the property names of the object are very significant. We can, now, only assign to the variable person any object that has only a name of type string and age of type number.



