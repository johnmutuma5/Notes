import Sequelize from 'sequelize';

const connection = new Sequelize('sequelize_test', 'postgres', '', {
    dialect: 'postgres'
});

const User = connection.define('users', {
    name: Sequelize.STRING,
    home_area: Sequelize.STRING
});

connection.sync()
    .then(function() {
        User.create({
            name: 'Laz',
            home_area: 'Kiambu Rd'
        });
    });
