const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  password: 'rootroot',
  host: 'localhost',
  database: 'employees_db',
  port: 5432
});

pool.connect()
  .then(() => console.log('Connected to the employees_db database'))
  .catch(err => console.error('Error connecting to the database', err));

module.exports = pool;
