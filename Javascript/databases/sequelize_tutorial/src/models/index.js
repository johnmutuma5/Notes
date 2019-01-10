import Sequelize from 'sequelize';
import createUserModel from './user.model.js';
import env from '../config/env';


const connection = new Sequelize(env.DB_NAME, env.DB_USER, env.DB_PASSWORD, {
  dialect: env.DB_DIALECT,
});

// this object shall contain the connection and all application models
const db = {
    connection,
    User: createUserModel(connection, Sequelize)
}

export default db;
