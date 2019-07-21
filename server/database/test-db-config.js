const pool = require('./pool');
const createTables = require('./config');

const dropTeamsTableQuery = `DROP TABLE IF EXISTS teams CASCADE;`;

const dropMembersTableQuery = `DROP TABLE IF EXISTS members;`;

const dropResultsTableQuery = `DROP TABLE IF EXISTS results;`;

const dropMetasTableQuery = `DROP TABLE IF EXISTS metas;`;

const configTestTable = async () => {
  try {
    await pool.query(dropTeamsTableQuery);
    await pool.query(dropMembersTableQuery);
    await pool.query(dropMetasTableQuery);
    await pool.query(dropResultsTableQuery);
    console.log('table dropped');
    createTables();
  } catch (e) {
    throw e;
  }
};

module.exports = configTestTable;

require('make-runnable');
