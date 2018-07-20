# Node.js tutorial

The following notes have been taken from [this course](https://app.pluralsight.com/library/courses/node-intro/table-of-contents 'Node.js Intro') on Pluralsight.


## Modules, require() and npm
### Some built in modules
- `fs` - for accessing the file systems
- `http` - for creating and responding to `http` requests
- `crypto` - for accessing various cryptographic methods
- `os` - for accessing attributes of the underlying operating system

## Events and streams
### Events and the EventEmitter class
The EventEmitter class is a major building block of the `Node.js` Non-blocking I/O model. We can extend this class to inherit the event handling functionalities including `Subscriptions` and `Publishing`.

## Readable and writable streams
Streams are instances of (and extensions to) `EventEmitter` class with an agreed upon interface.
It provides a unified abstraction of managing data flow including:
- Network traffic (http requests and responses, tcp sockets)
- File I/O
- stdin / stdout / stderr

A stream is an instance of either:
- ReadableStream
- WritableStream, or
- Both i.e. Duplex

***NB:*** A `ReadableStream` can be `piped` to a `WritableStream`.

Main encapsulations of `Streams`:

| `ReadableStream`                   | `WritableStream`                                 
|----------------------------------- |--------------------------------------------------
| readable [`boolean`]               | writable[`boolean`]
| events['`data`', '`end`', '`error`'] | events['`drain`', '`error`', '`close`', '`pipe`']
| pause()                            | write()          
| resume()                           | end()          
| destroy()                          | destroy()          
| pipe()                             | destroySoon()          


Read more about streams [here](https://medium.freecodecamp.org/node-js-streams-everything-you-need-to-know-c9141306be93 "Node.js Streams").

### Piping between `Streams`
Piping data between `Streams` is built with the concept of the `Unix` `pipe`. Data from a `ReadableStream` is `piped` into a `WritableStream`.

## Accessing the Local System
### The `process` object
It provides ways for a `Node.js` application to manage its own process as well as other processes on the system. It is available by default in a `Node` application; it does not even need `require`.

The process object contains:
- a collection of Streams
    - process.stdin - Readable
    - process.stdout - Writable
    - process.stderr - Writable
- attributes of the current process
    - process.env - set of environment variables
    - process.argv - command line arguments
    - process.pid - process id
    - process.title
    - process.upTime()
    - process.memoryUsage()
    - process.cwd()
    - etc
- process-related actions
    - process.abort()
    - process.chdir()
    - process.kill() - requires process id as a parameter
    - etc
- it is an instance of the `EventEmitter` class
    - events - '`exit`', '`uncaughtException`'
    - `POSIX` signal events ('`SIGINT`', etc.)

## Interacting with the File System
The file system is a wrapper around `POSIX` functions. Some of the functions include `rename`, `truncate`, `chown`, `chmod`, `write`, `read`, `open`, `readFile` etc.

It has Stream oriented methods:
- `fs.createReadStream`
- `fs.createWriteStream`

Watch a file or directory for changes:
- `fs.watch()` - returns an `fs.FSWatcher` event emitter
- `change` event - type of change and the filename that changed
- `error` event - emitted when an error occurs

### Buffers
When reading files, `Node` usually returns binary data in a `buffer`. JavaScript has difficulties dealing with binary data. The `Buffer` class provides a raw memory allocation for dealing with binary data directly.

Buffers can be converted to and from `strings` with encoding e.g. `ascii`, `utf8`, etc.

## Interacting with the web
With `Node`, interacting with the web can easily be achieved by making use of the `http` module.

```js
const http = require('http');

const req = http.request(<options>, <callback>);
req.end();
```

`options` can be a `string` representing the `url` or an object with options what can have this shape:

```js
const options = {
    host: 'https://example.com',
    port: 80,
    path: '/',
    method: 'GET'
}
```

The callback is a function that takes the `response` object as a sole argument. The `response` object is a `ReadableStream`, hence it can be `piped`.

***NB:*** `http` module does not follow `redirects`. There is another `module` called `requests` that does. With `http` you'd have to deal with the redirects in your code.

## Building a web server in Node.js
This is also done with the use of the `http` module.

e.g.

```js
const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});

    // lets read from a local file
    const read = fs.createReadStream(`${__dirname}/file.txt`);
    // lets pipe this to the res WritableStream
    read.pipe(res);
})
```

## Real time interactions with socket.IO
Websockets make possible low latency bidirectional exchange of data between client and server. This is most appropriate for applications that require realtime communication. Support across browsers is not at 100% yet.

`socket.IO` is a module that provides an abstraction on top of the implementation detail of `Websockets` and fallback mechanisms to other alternatives such as `long polling`, `http streaming` in cases where `Websockets` are not viable either due to browser or firewall limitations.

`socket.IO` also provides a consistent interface for implementation both on the client and on the server i.e. if the server is written in `Node.js`.

Developing a server in other backend languages like `C++`, `Python`, `Java`, `Erlang` etc is possible but it will lack the code symmetry achieved by using `Node.js` with `socket.IO`.


## Scaling your application
A common criticism of `Node.js` applications is that they don't handle CPU intensive tasks well. This is because `Node.js` applications are single threaded and performing CPU intensive computations will block the event loop and prevent any other tasks from being done. A strategy for dealing with this issue is by using `child processes`. A CPU intensive task can be deffered to a child process while the main process continues to handle events.

`Node.js` has four ways of launching child processes all of which are part of the `child_process` module;

- `spawn(command, [args], [options])`
    - launches a new process with `command` and `args`
    - returns a `ChildProcess` object which is
        - an `EventEmitter` and emits `exit` and `close` events
        - has streams for `stdin` and `stdout` that can be `piped` to/from

- `exec(command, [options], callback)`
    - runs 'command' string in a shell
    - callback is invoked on process completions with `error`, `stderr`, `stdout`
    - you can even `pipe` between `Unix` commands with a single invocation of `exec`. e.g. `piping` the result of the `ls` command to `grep`

- `execFile(file, [arg[, options]], callback)`
    - similar to `exec` but commands in `file` are run directly rather than in a subshell

- `fork(modulePath, [args[, options]])`
    - a special version of `spawn` especially for creating `node` processes
    - adds a `send` function and a `message` event to child processes


## Further reading
- Scaling with `Node` cluster module
