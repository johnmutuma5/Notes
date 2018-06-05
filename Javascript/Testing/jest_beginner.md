# Testing Javascript applications

#### This is beginner tutorial notes taken from the following tutorial from Traversy Media on YouTube.

[![this](https://img.youtube.com/vi/7r4xVDI2vho/maxresdefault.jpg)](https://www.youtube.com/watch?v=7r4xVDI2vho 'Testing JavaScript with Jest')

Link to git repo: [here](https://github.com/johnmutuma5/Testing.git)

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


### Our first Jest test

```js
// functions.test.js

const add = require('./functions');


test("it adds correctly", () => {
    expect(add(2, 2)).toBe(4);
});

```

### Create the function to test

```js
// functions.js

const add = (num, num1) => num + num1;

module.exports = add;
```


A test will be provoked by call to a function `test` which takes the description of the test The callback function is expected to call another function `exppect` which calls the function to be tested passing testing arguments to it.

### Matchers

The return value of a call to `expect` is chained with a `matcher`(*more on matchers later*).

The `matcher` compares the output of the tested function and the `matchers` arguments and if a match if found, then the test has passed. Our `matcher` in this case is `toBe`.

#### More matchers
##### Checking for 'falsy' and 'truthy' values
`toBeNull` - matches for `null`\
`toBeUndefined` - matches `undefined`\
`toBeDefined` - the opposite of `toBeUndefined`\
`toBeTruthy` - matches anything that would pass as true in an `if` statement\
`toBeFalsy` - the opposite of `toBeTruthy`\
`toBeLessThan` - matches if the value is `<`\
`toBeLessThanOrEqual` - matches `<==`\
`toMatch` - matches with regex. More [here](#regex-matchers)
`toContain` - matches when an array contains a given value


#### Negating a matcher
A match returns `true` for a match. We may sometimes want to return true for no match! For instance, we may want to test that the add function does not return 5 when we pass 2 and 2 as its arguments. Thus we test that `add` does not return 5 for 2 + 2.

This is easily achieved with jest by preceeding the matcher with `.not`.

```js
// functions.test.js

const add = require('./functions');

// ...

test("it adds correctly", () => {
    expect(add(2, 2)).not.toBe(5);
});
```

#### `toBe` vs `toEqual`

`toBe` tests for same value strict equality, i.e. whereby you test that two objects are the same object including memory address. Note, not only equal but one and the same.

`toEqual` does a `visual` comparison that two objects are similar, not necessarily being the same object.

See [**this answer**](https://stackoverflow.com/a/50693976/6951110, 'toBe vs toEqual') on Stackoverflow.


```js
// functions.test.js

const functions = require('./functions');

// ...

test("it returns correct user", () => {
    let user = {
        name: "John",
        occupation: "Software"
    };

    expect(functions.getUser()).toBe(user);
});
```

```js
// functions.js

const functions = {
    add: (num, num1) => num + num1,
    getUser: () = ({
        name: "John",
        occupation: "Software"
    })
}

module.exports = functions;
```


The above test will not pass because `user` and the user from `getUser` may be similar visually but they refer to two different objects that look alike. Here, we want to use `toEqual` instead of `toBe`.


#### Regex Matchers
We can test whether a value matches a given regular expression using the `toMatch` matcher.


```js
// functions.test.js

const functions = require('./functions');

// ...

test("response begins with Successful", () => {
    let match = /^Successful/;
    let response = functions.getResponse();
    expect(response).toMatch(match);
})
```


```js
// functions.js

const functions = {
    add: (num, num1) => num + num1,
    getUser: () => ({
        name: "John",
        occupation: "Software"
    }),
    getResponse: () => 'Successful. Operation approved!'
}

module.exports = functions;
```

This can also be used with `.not`


### Asynchronouns Testing
Asynchronouns requests or functions can be called in JavaScript using the `Promise`.`then`.`catch` pattern or the `async`-`await` pattern.

#### Testing Asynchronouns functions that return a Promise
If a function being tested returns a `Promise`, then `jest` testing expects that we return a call to the function chained with `.then` which handles the `expect` part of the test.

It is also good practise to include the expected number of assertions with async calls to consider a test as successful in testing all the assertions expected. We do this with `expect.assertions(<num>)` In our test below, we expect a single assertion i.e. `expect`, hence 1 assertion.

```js
// functions.test.js

const functions = require('./functions');

// ...
test("it gets correct async message: with promise", () => {
    expect.assertions(1);
    return functions.getMsgPromise().then((message) => {
        expect(user).toEqual('Hello');
    });
})
```

```js
// functions.js
const asyncCalls = require('../asyncCalls/asyncCalls');

const functions = {
    add: (num, num1) => num + num1,
    getUser: () => ({
        name: "John",
        occupation: "Software"
    }),
    getResponse: () => 'Successful. Operation approved!',
    getMsgPromise: () => {
        prom = asyncCalls.getMsgPromise();
        return prom;
    }
}

module.exports = functions;
```


```js
// asyncCalls.js
const getMsgPromise = () => {
    prom = new Promise((resolve, reject) => {
        const msg = 'Hello world!';
        // delay the message 1 seconds
        setTimeout(() => {
            resolve msg;
        }, 1000);
    });
    return prom;
};

const asyncCalls = {
    getMsgPromise: getMsgPromise
}

module.exports = asyncCalls;
```