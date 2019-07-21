import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const environments = {
  development: process.env.DATABASE_URL,
  test: process.env.TEST_DATABASE_URL,
};

const nodeEnv = process.env.NODE_ENV || 'development';
const connectionString = environments[nodeEnv];

const connect = {
  connectionString,
};

const pool = new Pool(connect);

export default pool;
