# Advanced Node.js Tutorial
These notes have been taken from [this course](https://app.pluralsight.com/library/courses/nodejs-advanced/table-of-contents), on Pluralsight.

## Table of contents
- [Top](#advanced-nodejs-tutorial)
- [Node's Architecture: v8 and libuv](#nodes-architecture-v8-and-libuv)
- [Node's CLI and REPL](#nodes-cli-and-repl)
- [Global Object, Process and Buffer](#global-object-process-and-buffer)
    - [The process object](#the-process-object)
    - [The Buffer object](#the-buffer-object)
        - [Using the StringDecoder](#using-the-stringdecoder)
- [Modularity - How `require` works](#modularity-how-require-works)
    - [The Circular Modular Dependency](#the-circular-modular-dependency)
    - [JSON and C++ Addons](#json-and-c-addons)
    - [Wrapping and caching](#wrapping-and-caching)

## Node's Architecture: v8 and libuv
The two most important players in `node` architecture are chrome's `v8` engine and `libuv`.
Node is however on a path to be engine agnostic. There is also work in progress to get node to work on `Chackra-core`. `Chakra` is the `JavaScript` engine that powers Microsoft's `Edge`. `v8` has three feature groups; shipping, staged and in-progress. Shipping features are in node by default, staged and in-progress features are not on by default but we can use command-line flags to enable them.

Staged features are almost complete but the the `v8` team may not be comfortable shipping them just yet. We can use `--harmony` flag to enable them. For instance, at the time of recording this section of the tutorial, string padding methods were in the `staged` group. `node -p "'ndoe'.padEnd(8, '*')"` would throw an error but `node -p --harmony "'node'.padEnd(8, '*')"` would work well.

In-progress features are unstable but we can still enable them with special flags. We're able to see all `v8` options available with `node --v8-options`.


`libuv` is a C library developed for `node`, but it is now used by other languages like Rust, Julia and others. It is used to abstract the Non-blocking I/O operations to a consistent interface across operating systems. It is what handles operations on the File System, TCP & UDP sockets, child processes and others. `Libuv` includes a thread pool to handle what cannot be done asynchronously at the operating system level. It also provides `node` with the event loop.

## Node's CLI and REPL
`Node.js` comes with a variety of CLI options which expose built-in debugging, multiple ways to execute scripts and other helpful runtime options.

Running the `node` command on the command-line without arguments starts a `REPL`, Read, Eval, Print & Loop. `REPL` has an autocomplete feature accessible by hitting `tab` twice in the `REPL`. In the `REPL`, you there are commands that begin with a dot, `.`. Run `.help` to see them. `.editor` enables us to write in the `REPL` as if it were a text editor and hit `ctrl + D` once done and the text is executed like a script. `.save` enables us to save a `REPL` session to a file e.g. `.save session.js`.

`Node` also has a builtin `REPL` module that you can use to start a customized `REPL`.

```JS
const repl = require('repl');

let r = repl.start({
    ignoreUndefined: true,
    replMode: repl.REPL_MODE_STRICT
})
```

The script above opens up a `REPL` in strict mode and it doesn't print out `undefined` values.
It also has a `context` object that you can populate with varibles that you'd like to find in the `REPL` without defining, declaring or requiring them. e.g.

```js

const repl = require('repl');

let r = repl.start({
    ignoreUndefined: true,
    replMode: repl.REPL_MODE_STRICT
});

// express will be available in the REPL context
r.context.express = require('express');
```

To see a list of `node` options, use `node --help | less`.

## Global Object, Process and Buffer
The global object exposes variables, modules etc to a global context. To see a list of objects in the global object, use `global` with autocomplete on the `REPL`. To add items in the object, use `glolab.<item> = <value>`.

Notably, the `global` object contains the `process` and `buffer` objects.

### The process object
One of the most useful objects in the process object is the `process.env`. It contains environment variables. It is a copy of the actual object in the Operating System. It is advisable not to read the object directly and instead use a configuration module that can be exported for maintainability of large projects. e.g.

```js
// config.js
const config = {
    port: process.env.PORT || 8080
}
module.exports = {
    config
}


// anotherModule.js

const { config } = require('config');
console.log(config.port);
```

The process objects also exposes standard streams; `stdin`, `stdout`, `stderr`.

The `process` object is an instance of `EventEmiiter`. Two key events that the `process` object emits are:

- `exit` - when the process is about to terminate
- `uncaughtException` - when there is an error

```js
process.on('exit', (code) => {
    /// do a final desirable synchronous operation
    console.log(`Exiting with code ${code}`)
})
```

```js
process.on('uncaughtException', (err) => {
    // do some clean up and exit with error code 1
    console.log(err);
    // force exit after clean up
    process.exit(1);
});
```


### The Buffer object
The `buffer` object also available on `node` global object is used to work with `binary` streams of data. It is a chunck of memory allocated outside of the `v8` heap and we can use that memory to store and access data. Data stored in the `Buffer` does not hav any character encoding, to read it we need to specify an encoding. It is a low-level data structure to represent a sequence of binary data. ***Unlike arrays, once memory has been allocated, it cannot be resized***.

A `Buffer` can be created in one of three major ways;

- `Buffer.alloc(<size>)` - creates a filled buffer of size `size`. `Buffer.allocUnsafe(<size>)` does not fill the buffer. To fill a `buffer` we should use `.fill()`. You can view the contents of a `Buffer` with `.toString()`. `allocUnsafe` has some clear performance advantages but we should be careful with it
- `Buffer.from` - it accepts a few different types in its arguments. e.g. `Buffer.from('Hello, world!')`

***NB:***
- Just like using `arrays`, `buffers` also have methods like `slice`, `indexOf`, etc. But they behave a little differently. For instance, when we do a `slice` on a `buffer`, the returned slice shares the same memory with the original `buffer` and hence making changes to the slice also affects the original `buffer`

#### Using the StringDecoder
When converting streams of binary data, we should use the `string_decoder` module because it handles multi-byte characters much better. This is notable when converting binary chunks to string; the `string_decoder` holds the chunks in memory concatenating the chunks until it can make sense out of the sequence. For instance, if the `€` sign is represented by `0xE20x820xAC`, if we input these in chunks like `0xE2`, then `0x82` and finally `0xAC`, the inbuilt `.toString()` will have no clue, but using `string_decoder`, the chunks are going to be held in memory and when we finally enter the last input, the concatenation can make sense and the `string_decoder` can output the `€` sign

```js
// using string_decoder example code
const { StringDecoder } = require('string_decoder');
const decoder = new StringDecoder('utf8');

process.stdin.on('readable', () => {
    let chunk = process.stdin.read();
    if (chunk != null){
        let buffer = Buffer.from([chunk]);
        let convertedToString =  decoder.write(buffer);
        console.log(convertedToString);
    }
});
```

## Modularity - How `require` works
Modularity is a first class concept in `node` and it is vital to understand how it works.

To execute a `require` call, the following sequence of steps are taken;
- ***Resolving:*** to find the absolute file path of a module
- ***Loading:*** determined by the content of the file at the resolved path
- ***Wrapping:*** gives every module its private scope and makes `require` private to every module
- ***Evaluating:*** this is what the VM eventually does with the code
- ***Caching:*** so that when we require the module again, the VM does not go through the whole steps again

Whenever we use `require('a_package')`, node goes through the directory branch from the current directory to the root directory looking for the directory `node_modules` and if found looks for `a_package` inside; `console.log(module)` and see `paths`. If found, `node` resolves the file and loads it.

If we only wanted to check that the file existed and not to actually load it, we could use `require.resolve('a_package')`. This would check if we have `a-file` in node modules and throw an error if not!

***NB:*** `Node` modules do not have to be files, they can also be directories with an `index.js`. The `index.js` is what will be loaded. `index.js` is the default name of the file to be loaded. We can control this in the package directory using the `package.json` file for the package and specifying what `main` is:

```json
{
    "name": "a_package",
    "main": "start.js"
}
```

`require` can also load files from any directory besides the `node_modules` directory by using relative or absolute paths.

### The Circular Modular Dependency
This occurs when modules require each other! But this is actually allowed in `node`!!

### JSON and C++ Addons
`Node` require function can also be used on `json` and `C++` addons. `Node` tries to resolve a `.js` file first, then `.json` and finally `.node` as can be see with `require.extensions`. It loads `.json` as a JavaScript object. This can be useful with configuration.

To have `C/C++` addons, we need to:
- have an `addon-src` directory in our project directory. This will contain the C++ program e.g. `hello.cc`
- have a `binding.gyp` file for configuration in the `addon-src` directory. This will include sources and a target name for the compiled module
- `cd addon-src` to change into `addon-src` directory
- `npm install node-gyp -g` to install the dependency that will build the addon
- `node-gyp configure` to generate the necessary platform dependent build files like `Makefile`
- `node-gyp build` to build the addon. This will be dumped as `addon-src/build/Release/<target_name>.node`
- we can finally copy this into `node_modules` so that we can require it directly like `require('addon')`

***Opportunity for further reading***


### Wrapping and caching