// a container for environment variables
import dbConfig from './db.config.js';
import { checkEnv } from './utils';

// console.log({...dbConfig})
const env = {
  DB_NAME: dbConfig['database'],
  DB_USER: dbConfig['username'],
  DB_PASSWORD: dbConfig['password'],
  DB_DIALECT: dbConfig['dialect']
}

export default checkEnv(env);
