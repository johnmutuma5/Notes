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
Streams are instances of (and extensions to) with an agreed upon interface.
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
| events['`data`', '`end`', '`err`'] | events['`drain`', '`error`', '`close`', '`pipe`']
| pause()                            | write()          
| resume()                           | end()          
| destroy()                          | destroy()          
| pipe()                             | destroySoon()          


Read more about streams [here](https://medium.freecodecamp.org/node-js-streams-everything-you-need-to-know-c9141306be93 "Node.js Streams").
