'use strict';

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var connection = new _sequelize2.default('sequelize_test', 'postgres', '', {
    dialect: 'postgres'
});

var User = connection.define('users', {
    name: _sequelize2.default.STRING,
    home_area: _sequelize2.default.STRING
});

connection.sync().then(function () {
    // User.create({
    //     name: 'Laz',
    //     home_area: 'Kiambu Rd'
    // });
});
