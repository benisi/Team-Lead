import pool from './pool';

const createTeamsTableQuery = `DROP TABLE IF EXISTS team CASCADE;
CREATE TABLE IF NOT EXISTS teams(
    id BIGSERIAL PRIMARY KEY NOT NULL,
    name CHARACTER VARYING(50) NOT NULL
)`;

const createMembersTableQuery = `DROP TABLE IF EXISTS members CASCADE;
CREATE TABLE IF NOT EXISTS members(
    id BIGSERIAL PRIMARY KEY NOT NULL,
    name CHARACTER VARYING(50) NOT NULL,
    "teamId" INTEGER NOT NULL,
    "timesTl" INTEGER NOT NULL DEFAULT 0,
    "timesQa" INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY ("teamId") REFERENCES teams(id) ON DELETE CASCADE
)`;

const createResultsTableQuery = `DROP TABLE IF EXISTS results CASCADE;
CREATE TABLE IF NOT EXISTS results(
    id BIGSERIAL PRIMARY KEY NOT NULL,
    "teamId" INTEGER NOT NULL,
    "currentTl" CHARACTER VARYING(50) NOT NULL,
    "currentQa" CHARACTER VARYING(50) NOT NULL,
    FOREIGN KEY ("teamId") REFERENCES teams(id) ON DELETE CASCADE
)`;

const createMetasTableQuery = `DROP TABLE IF EXISTS metas CASCADE;
CREATE TABLE IF NOT EXISTS metas(
    id BIGSERIAL PRIMARY KEY NOT NULL,
    name CHARACTER VARYING(50) NOT NULL)`;

const createTables = async () => {
  try {
    await pool.query(createTeamsTableQuery);
    await pool.query(createMembersTableQuery);
    await pool.query(createMetasTableQuery);
    await pool.query(createResultsTableQuery);
  } catch (e) {
    throw e;
  }
};

export default createTables;
