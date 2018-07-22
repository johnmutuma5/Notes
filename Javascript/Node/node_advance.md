# Advanced Node.js Tutorial
These notes have been taken from [this course](https://app.pluralsight.com/library/courses/nodejs-advanced/table-of-contents), on Pluralsight.

## Table of contents
- [Top](#advanced-nodejs-tutorial)
- [Node's Architecture: v8 and libuv](#nodes-architecture-v8-and-libuv)
- [Node's CLI and REPL](#nodes-cli-and-repl)


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
