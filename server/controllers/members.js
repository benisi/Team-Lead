import pool from '../database/pool';

const getTeamOfficials = async (req, res) => {
  const query = `SELECT results."currentQa", results."currentTl",teams.name FROM results
    INNER JOIN teams
    ON results."teamId" = teams.id`;

  const { rows } = await pool.query(query);
  res.status(200).json({
    status: 200,
    data: rows,
  });
};

export default getTeamOfficials;
