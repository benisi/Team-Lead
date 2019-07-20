const { Pool } = require('pg');
require('dotenv').config();

const connectionString = process.env.DATABASE_URL;

const connect = {
    connectionString,
  };

const pool = new Pool(connect);

module.exports = pool;