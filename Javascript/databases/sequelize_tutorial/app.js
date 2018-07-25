import Sequelize from 'sequelize';

const connection = new Sequelize('sequelize_test', 'postgres', '', {
  dialect: 'postgres',
});

const User = connection.define('users', {
  name: Sequelize.STRING,
  home_area: Sequelize.STRING
});

connection.sync({
    logging: false
  })
  .then(function() {
    User.findAll()
      .then(function(users) {
        for (let user of users)
          console.log(user.dataValues);
      });
  });