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
