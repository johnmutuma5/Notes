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
