const createUserModel = (dbConnection, Sequelize) => {
    // create the User model
    const User = dbConnection.define('users', {
      name: Sequelize.STRING,
      home_area: Sequelize.STRING
    });

    return User;
};

export default createUserModel;
