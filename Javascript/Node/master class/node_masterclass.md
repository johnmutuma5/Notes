# Node.js
Node is a server-side JavaScript environment.

- Server side - runs on a computer operating system as opposed to running on a web browser or a phone.

Nodejs now presents itself as two applications:
 - A script processor
 - A REPL (Read, Eval, Print and Loop)

## The script processor
This is usually used by invoking node with a file containing JavaScript code to execute. e.g. `node index.js`.

Nodejs is a Non-blocking I/O and it achieves this by scheduling asynchronous tasks into an event loop. This makes it very efficient; as the application awaits responses from asynchronous operations, it is able to carry on with other tasks such as responding to other requests and once the asynchronous responses are ready, it resumes the previous operations.

The Nodejs script processor goes through the following summary series of steps;

- Reads the file you specify
- Reads into memory all the dependencies of that file and the dependencies of those dependencies
- Begins executing the synchronous tasks in those files
- Begins processing the 'todo list' by running an event loop until it has nothing to do

## The REPL
The REPL is invoked by running Node without specifying a file to execute. The REPL is an interactive JavaScript environment where you can write JavaScript code and have it executed on hitting `Return`.

## Building a RESTful API
The code for the application can be found in the `apps` directory under `restful_api`.
### Starting a HTTP server
We need the `http` module which is a standard module for Nodejs.

> `const http = require('http');`

To create a server, the `http` module provides the method `createServer` that takes a call back to which it supplies the `req` and `res` objects.

```js
const server = http.createServer((req, res) => {
 // some code
});

```

The server can start listening on a PORT.

```js
server.listen(3000, () => {
  console.log('Listening on PORT 3000')
})
```

We can now test the response by sending a request to `localhost:3000`.

### Parsing Request Paths
This helps with identifying the particular resources that a request is looking for. Nodejs has a standard library for parsing URLs and it can be accessed by requiring it with `url`.

> `const url = require('url');`

Ideally, a RESTful application would go through the following basic steps when it receives a request;

- Get the request's url and parse it to determine the resource
- Get the path
- Process the request and send the response
- Log the path for informational purposes

The `url` library provides a method `parse`, that takes the a `URL` string as an argument and it returns an 'url' object.

```js
const parsedUrl = url.parse('http://localhost:3000/test?name=lazuli%20Doe', true);
```
The second `boolean` argument in the function denotes that query object should be included in the `parsedUrl` object. See [this](https://nodejs.org/docs/latest/api/url.html#url_url_parse_urlstring_parsequerystring_slashesdenotehost) for full usage of the method.

### Parsing HTTP methods
The request method can be accessed via `req.method`.

### Parsing Query Strings
This can be accessed from the `parsedUrl` with `parsedUrl.query` if the second `boolean` arg was set to `true`.

### Parsing Request Headers
These can be accessed via `req.headers`.
