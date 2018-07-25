const Sequelize = require('sequelize');

const connection = new Sequelize('sequelize_test', 'postgres', '', {
    dialect: 'postgres'
});

const User = connection.define('users', {
    name: Sequelize.STRING,
    home_area: Sequelize.STRING
});

connection.sync()
