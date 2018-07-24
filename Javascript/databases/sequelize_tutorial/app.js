const Sequelize = require('sequelize');

const connection = new Sequelize('database_name', 'user', 'password', {
    dialect: 'postgres'
});
