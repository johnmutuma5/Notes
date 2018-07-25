// a container for environment variables
import dbConfig from './db.config.js';
import { checkEnv } from './utils';

// console.log({...dbConfig})
const env = {
  ...dbConfig
}

export default checkEnv(env);
