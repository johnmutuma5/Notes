# SEQUELIZE TUTORIAL
These notes have been taken from the following tutorial on youtube.

[![](https://img.youtube.com/vi/6NKNfXtKk0c/maxresdefault.jpg)](https://www.youtube.com/watch?v=6NKNfXtKk0c&list=PL5ze0DjYv5DYBDfl0vF_VRxEu8JdTIHlR&index=2 "Sequelize tutorials")

## Table of Contents
- [Getting Started](#getting-started)


## Getting started
The first thing we need to do is to install the sequelize module in the project as a production dependency `npm install --save sequelize`.
From the [documentation](http://docs.sequelizejs.com/manual/installation/getting-started.html#installation), select one of the database adapters according to the database you're using. e.g. `npm install --save pg pg-hstore` for PostgreSQL.

### Loading sequelize
To load sequelize, we simply `require` it:

```js
// app.js
const Sequelize = require('sequelize');
```

Note the capitalization of `Sequelize` above, because the on `requiring`, we get a contructor function that should be invoked with the `new` keyword.

### Creating a connection
There are two ways through which we can connect to the database after installing the modules above.

First, we can use a bare string representing the database URI:
```js
// app.js
const Sequelize = require('sequelize');
const connection = new Sequelize('postgres://user:pass@example.com:5432/dbname', {});
```

The second argument in the constructor above is an object of options. You can see the [API Reference](http://docs.sequelizejs.com/class/lib/sequelize.js~Sequelize.html) for a whole range of options available.

The alternative way of creating a connection to the database is by using the following criteria;

```js
// app.js
const Sequelize = require('sequelize');
const connection = new Sequelize('database_name', 'user', 'password', {
    dialect: 'postgres'
});
```
