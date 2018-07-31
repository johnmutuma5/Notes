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
- [Modularity - How `require` works](#modularity---how-require-works)
    - [The Circular Modular Dependency](#the-circular-modular-dependency)
    - [JSON and C++ Addons](#json-and-c-addons)
    - [Wrapping and caching](#wrapping-and-caching)
        - [Wrapping](#wrapping)
        - [Is script main or being required?](#checking-if-running-as-a-module-or-a-script)
        - [Caching](#caching)
    - [Know your npm](#know-your-npm)
- [Concurrency Model and Event Loop](#concurrency-model-and-event-loop)
    - [What is I/O](#what-is-io)
    - [The Event Loop](#the-event-loop)
        - [The call stack](#the-call-stack)
        - [How callbacks actually work](#how-callbacks-actually-work)
- [Node's Event-driven Architecture](#nodes-event-driven-architecture)
    - [Callbacks, Promises and Async/Await](#callbacks-promises-and-asyncawait)
    - [Some tips with EventEmitters](#some-tips-with-eventemitters)
- [Node for Networking](#node-for-networking)
  - [Working with multiple sockets](#working-with-multiple-sockets)
  - [The DNS Module](#the-dns-module)
  - [UDP datagram sockets](#udp-datagram-sockets)
- [Node for the web](#node-for-the-web)
- [Node's Common Built-in Libraries](#nodes-common-built-in-libraries)
- [Working with Streams](#working-with-streams)
- [Clusters and Child Processes](#clusters-and-child-processes)
- [Scalability strategies](#scalability-strategies)
- [Child Process, Events and Standard I/O](#child-process-events-and-standard-io)

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
#### Wrapping
There are at least two different ways to export from a module;
- using `module.exports` - e.g. `module.exports.id = 10` or `module.exports = {id: 10}`
- using `exports` - e.g. `exports.id = 10`. For this way, cannot use `exports = {id: 10}`. Why??

Answering the 'Why'!
Before compiling a module, `node` wraps the module's code in a function. Run `require('module').wrapper` to see. This is how `node` keeps the arguments to that function scoped to every module. `exports` is a object whose reference is the `module.exports` object. By assigning it to a new object, it ceases to reference to `module.exports`.

#### Checking if running as a module or a script
It is also possible to use the `require` and `module` context arguments to check it the script file is being evaluated as the main script or being required as a module.

```js
const name = 'Laz';
const myName (name) => {
    console.log(`My name is ${name}`);
}

if (require.main == module) {
    myName(name);
} else {
    exports.name = name
}
```

This is useful when calling functions that should only be called if the script is running as the main script.

#### Caching
Modules that have been resolved and loaded before are stored in `require.cache`.

### Know your npm
You can find some in depth notes about npm [here](https://github.com/johnmutuma5/Notes/blob/develop/NPM/npm.md "NPM Playbook").


## Concurrency Model and Event Loop
You can compare this with Python's `Twisted`.

Slow I/O's are handled with events and callbacks so that they do not block the main single-threaded execution runtime.

### What is I/O
It is short for Input/Output.

I/O labels external communication between a process and resources that are external to that process including Network, memory, disk and even other processes. In `node`, I/O is commonly used to reference accesses disk and network resources. This is the most time-expensive part of all operations. The most common alternative of handling slow I/O is using `threads`. This approach can however get complicated when `threads` start sharing resources i.e. data races. `Node` uses a single-threaded approach with the Event Loop being the main building block.

### The Event Loop
It is the entity that handles external events and converts them into callback invocations. It is the loop that picks events from the event queue and pushes their callbacks to the call stack; it works between the event queue and the call stack.

#### The call stack
It is a simple Last-in First-out data structure i.e. a stack.

#### How callbacks actually work
There are four main collaborators:
- The call stack
- The Node API
- The event queue
- The event loop

When a script is run, function calls are pushed into the call stack and popped LIFO. If any of the calls interacts with the Node API such as `timers` and network calls, they are transferred from the call stack into the Node API for monitoring. Once timers have elapsed or network call promises have resolved or rejected, Node API pushes their callback functions independently into the event queue which is a FIFO data structure. The event loop keeps monitoring the call stack and once it is empty, the callbacks in the event queue are popped one after the other into the call stack for execution.

***NB:*** **Further reading `setImmediate` and `process.nextTick`**

## Node's Event-driven Architecture
### Callbacks, Promises and Async/Await
`node.js` uses these in its event-driven architecture. The current trend is to have your asynchronous operations support all the interfaces. This can be achieved by having your asynchronous operation return a `Promise` and still take an optional callback function i.e. by having a default callback.

```js
const fs = require('fs');

function readFileLines(path, callback=() => null){
    const prom = new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if(err) {
                reject(err);
                return callback(err)
            }

            const lines = data.toString().trim().split('\n');
            resolve(lines);
            callbacks(null, lines);
        })
    });

    return prom;
}

readFileLines('./file.txt')
    .then(lines => console.log(lines)); // this will work

readFileLines('./file.txt', (err, lines) => {
    if(err) console.error(err);
    console.log(lines);
}); // this will also work

async function showLines () {
    try{
        const lines = await readFileLines('./file.txt');
        console.log(lines);
    }
    catch(err){
        console.error(err)
    }
}
showLines(); // this will also work
```

### Some tips with EventEmitters
- `process.once('uncaughtException', <callback>)` - to handle several uncaught error at process exit. Rememeber to `process.exit(1)` anyway
- `<emmiter>.prependListener('event', <callback>)` - to register a listener that will be called first and not in order of registration
- `<emitter>.removeListener('event', <callback>)` - remove a listener

## Node for Networking
We can use the `net` module to create as `network socket` server. The server is an `EventEmiiter` object. On connection, it creates a socket which is a duplex stream i.e. we can read and write into it concurrently.

```js
const net = require('net');

const server = net.createServer();
server.on('connection', socket => {
  console.log('hello');
  socket.write('How are you?\n');
  socket.on('data', data => {
    console.log('data is: ', data)
  });
  return socket.on('end', console.log('Disconnected'));
});

server.listen(8000, () => console.log('Listenning for connections'));

```

By default, `data` in the the sockets is a `Buffer` object without encoding. This is why data is logged is a `Buffer`. We can use `socket.setEncoding('utf8')` to set global encoding for the socket.

### Working with multiple sockets
Each connected client gets a seperate socket. To write data to every socket, the server needs to keep and loop through a registry of connected sockets and write data in every socket.

```js
const net = require('net');

const server = net.createServer();

const activeSockets = {};
let socketId = 0;

server.on('connection', socket => {
  socket.id = socketId++;
  activeSockets[socket.id] = socket;
  socket.write('Hello, welcome!\n');

  socket.on('data', data => {
    Object.entries(activeSockets)
      .forEach(([id, soc]) => {
        return soc.write(`${socket.id}: ${data}`);
      })
  })
});

server.listen(8000, () => console.log('Listenning for connections'));
```

If one of the clients disconnects, we need to remove the client from the active sockets otherwise the server will crash for trying to write to a terminated socket.

```js
const net = require('net');

const server = net.createServer();

const activeSockets = {};
let socketId = 0;

const server = net.createServer();
server.on('connection', socket => {
  socket.id = socketId++;
  activeSockets[socket.id] = socket;
  socket.write('Hello, welcome!\n');

  socket.on('end', () => {
    return delete activeSockets[socket.id];
  })
});
```


### The DNS Module
The Domain Name System is a hierarchical decentralized naming system for computers, services, or other resources connected to the Internet or a private network. The `dns` module in Node is important for translating between names and addresses.

For instance, it can be used as follows;

```js
const dns = require('dns');

dns.lookup('pluralsight.com', (err, address) => console.log(adddress)); // ip address
dns.resolve4('pluralsight.com', (err, address) => console.log(address)); // IPV4 address
dns.reverse('192.65.56.204', (err, hostnames) => console.log(hostnames)); // an array of hostnames
```

### UDP datagram sockets
Further learning

## Node for the web
TODO - to write later

## Node's Common Built-in Libraries
The best way to explore node builtin modules is to check the [documentation](https://nodejs.org/docs/latest-v9.x/api/, "Node.js documentation")
### Working with the operating system
We can work with the `os` module to retrieve os-specific information including the user info, cpus, memory information etc.
### The file system
The `fs` module provides an interface for working with the File I/O.
Items to explore:
- `fs.watch`
- `fs.truncate`

### Console and Utilites
- `console.dir`
- `console.time`, `console.timeEnd`
- `console.Console`
- `utils.inspect`
- `utils.depracate`

etc.


## Working with Streams
Streams are collections of data that may not be available all at once and do not have to fit in memory.
There are four fundamental types of streams:
- Readable
- Writable
- Duplex
- Transform

All streams are instances of `EventEmiiter`.
We can consume streams using the `pipe` from readable to writable.

`src.pipe(dst)`;

Implementing streams requires the `stream` module.
Consuming streams requries the use of `pipe` or `events`.

`Readable` streams have two main options in the way consume them: they can be either flowing or paused. All `readable` streams start in the paused mode. In pause mode, we use `stream.read` to read data, while in flowing mode, the data is continously flowing and we can use `pipe` or events to consume it.

### Implementing a Writable Stream
We need the `Writable` constructor function from `stream` module, and instantiate it with an object of options amongst which should include a `write` function.

```js
const { Writable } = require('stream');

const writableStream = new Writable({
  write(chunk, encoding, callback) {
    process.stdout.write(chunk.toString);
    callback();
  }
});

//test
process.stdin.pipe(writableStream);
```


### Implementing a Readable Stream
We need the `Readable` constructor function from `stream` module, and instantiate it with an object of options amongst which should include a `read` function which pushes data to the stream for reading.

```js
const { Readable } = require('stream');

const readStream = new Readable({
  read(size) {
    // to indicate when there is no more stream
    if(this.currentChar > 90) return this.push(null);
    this.push(String.fromCharCode(this.currentChar++));
  }
});

readStream.currentChar = 65;

//test
readStream.pipe(process.stdout);
```

### Implementing Duplex Streams
We need the `Duplex` constructor function from `stream` module, and instantiate it with an object of options amongst which should include a `read` function which pushes data to the stream for reading and a `write` function which we use to write data to a destination.

```js
const { Writable } = require('stream');

const readWriteStream = new Writable({
  write(chunk, encoding, callback) {
    process.stdout.write(chunk.toString);
    callback();
  }

  read(size) {
    // to indicate when there is no more stream
    if(this.currentChar > 90) return this.push(null);
    this.push(String.fromCharCode(this.currentChar++));
  }
});
readWriteStream.currentChar = 65;
//test
process.stdin.pipe(readWriteStream).pipe(process.stdout);
```

### Implementing a Transform Stream
This is a special kind of a Duplex stream but it is useful when you want access to the data that is coming in through the `writable` channel of the stream.

```js
const { Transform } = require('stream');

const toUpper = new Transform({
  transform(chunk, encoding, callback) {
    this.push(chunk.toString().toUpperCase());
    callback();
  }
})

process.stdin.pipe(toUpper).pipe(process.stdout);
```

***NB:*** By passing the transformed `chunk` as a second argument to `callback`, it is automatically pushed to the Buffer. i.e. `callback(null, transformedChunk)`. This is unique to the transform constructor.

***Further Reading:*** `crypto` and `zlib` transforms.


## Clusters and Child Processes
Using multiple processes is the only way to scale a `Node.js` application. `Node.js` is designed for building distributed applications with many 'nodes'. Cases for scaling applications include workload, avaibalability and fault-tolerance.

### Scalability strategies
- _Cloning:_ cloning the application multiple times and have each instance handle part of the workload. This does not cost a lot in terms of development time and it is highly effective
- _Decomposing:_ an application can be decomposed based on functionalities and services. This means having multiple different applications with different codebases and sometimes dedicated databases and UIs. This is commonly referred to as `micro services`. It is important to enforce loose coupling and high cohesion between services.
- _Splitting:_ this involves splitting the application into multiple instances where each instance is responsible for only a portion of the application's data. It is often referred to as `horizontal partitioning`, or `sharding` in databases

### Child Process, Events and Standard I/O
