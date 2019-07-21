const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const connectionString = process.env.DATABASE_URL;

const connect = {
  connectionString,
};

const pool = new Pool(connect);

module.exports = pool;
