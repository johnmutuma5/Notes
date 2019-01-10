import db from './models';


db.connection.sync()
  .then(() => console.info('Database ready'));
