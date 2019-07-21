const pool = require('./pool');

const createTeamsTableQuery = `CREATE TABLE IF NOT EXISTS teams(
    id BIGSERIAL PRIMARY KEY NOT NULL,
    name CHARACTER VARYING(50) NOT NULL
)`;

const createMembersTableQuery = `CREATE TABLE IF NOT EXISTS members(
    id BIGSERIAL PRIMARY KEY NOT NULL,
    name CHARACTER VARYING(50) NOT NULL,
    "teamId" INTEGER NOT NULL,
    "timesTl" INTEGER NOT NULL DEFAULT 0,
    "timesQa" INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY ("teamId") REFERENCES teams(id) ON DELETE CASCADE
)`;

const createResultsTableQuery = `CREATE TABLE IF NOT EXISTS results(
    id BIGSERIAL PRIMARY KEY NOT NULL,
    "teamId" INTEGER NOT NULL,
    "currentTl" CHARACTER VARYING(50) NOT NULL,
    "currentQa" CHARACTER VARYING(50) NOT NULL,
    FOREIGN KEY ("teamId") REFERENCES teams(id) ON DELETE CASCADE
)`;

const createMetasTableQuery = `CREATE TABLE IF NOT EXISTS metas(
    id BIGSERIAL PRIMARY KEY NOT NULL,
    name CHARACTER VARYING(50) NOT NULL,
    value CHARACTER VARYING(50) NOT NULL,
    "teamId" INTEGER NOT NULL,
    FOREIGN KEY ("teamId") REFERENCES teams(id) ON DELETE CASCADE
    )`;

const createTeamQuery = `INSERT INTO teams(name) VALUES($1)`;

const createMembersQuery = `INSERT INTO members(name, "teamId") VALUES($1, $2)`;

const createTables = async () => {
  try {
    await pool.query(createTeamsTableQuery);
    await pool.query(createMembersTableQuery);
    await pool.query(createMetasTableQuery);
    await pool.query(createResultsTableQuery);
    await pool.query(createTeamQuery, ['dahlia']);
    await pool.query(createMembersQuery, ['Ukhu', 1]);
    await pool.query(createMembersQuery, ['Rita', 1]);
    await pool.query(createMembersQuery, ['Ovie', 1]);
    await pool.query(createMembersQuery, ['Bela', 1]);
    await pool.query(createMembersQuery, ['Nero', 1]);
    await pool.query(createMembersQuery, ['Ben', 1]);
    await pool.query(createMembersQuery, ['Maro', 1]);
    await pool.query(createTeamQuery, ['Mazus']);
    await pool.query(createMembersQuery, ['Odum', 1]);
    await pool.query(createMembersQuery, ['Pelumi', 1]);
    await pool.query(createMembersQuery, ['Tolu', 1]);
    await pool.query(createMembersQuery, ['Emeka', 1]);
    await pool.query(createMembersQuery, ['John', 1]);
    await pool.query(createMembersQuery, ['Mark', 1]);
    await pool.query(createMembersQuery, ['Peace', 1]);
  } catch (e) {
    throw e;
  }
};

module.exports = createTables;

require('make-runnable');
