const pool = require('./pool');
const createTables = require('./config');

const dropTeamsTableQuery = `DROP TABLE IF EXISTS teams CASCADE;`;

const dropMembersTableQuery = `DROP TABLE IF EXISTS members;`;

const dropResultsTableQuery = `DROP TABLE IF EXISTS results;`;

const dropMetasTableQuery = `DROP TABLE IF EXISTS metas;`;

const createTeamQuery = `INSERT INTO teams(name) VALUES($1)`;

const createMembersQuery = `INSERT INTO members(name, "teamId") VALUES($1, $2)`;

const configTestTable = async () => {
  try {
    await pool.query(dropTeamsTableQuery);
    await pool.query(dropMembersTableQuery);
    await pool.query(dropMetasTableQuery);
    await pool.query(dropResultsTableQuery);
    console.log('table dropped');
    createTables();
    await pool.query(createTeamQuery, ['dahlia']);
    await pool.query(createMembersQuery, ['Ukhu', 1]);
    await pool.query(createMembersQuery, ['Rita', 1]);
    await pool.query(createMembersQuery, ['Ovie', 1]);
    await pool.query(createMembersQuery, ['Bela', 1]);
  } catch (e) {
    throw e;
  }
};

module.exports = configTestTable;

require('make-runnable');
