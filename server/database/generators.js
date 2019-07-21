const pool = require('./pool');
const currentWeek = 'current-iteration';
const initialCount = 0;

const getCurrentIteration = async (teamId) => {
    let query = 'SELECT * FROM metas WHERE name = $1 AND "teamId" = $2;';
    let currentIteration = await pool.query(query, [currentWeek, teamId]);
    if(currentIteration.rowCount < 1 ){
        query = 'INSERT INTO metas(name, value, "teamId") VALUES($1, $2, $3) RETURNING *';
        currentIteration = await pool.query(query, [currentWeek, initialCount, teamId]);
    }
    return currentIteration;
}

const incrementCurrentIteration = async (teamId) => {
    const currentIteration = await getCurrentIteration(teamId);
    const updatedIteration = Number.parseInt(currentIteration.rows[0].value) + 1;
    query = 'UPDATE metas SET value=$1 WHERE name=$2 AND "teamId"=$3 RETURNING *';
    const response = await pool.query(query, [updatedIteration, currentWeek, teamId]);
    return response;
}

const getTeams = async () => {
    query = 'SELECT * FROM teams';
    const response = await pool.query(query);
    return response;   
}

const getMembers = async (teamId) => {
    query = 'SELECT * FROM members WHERE "teamId"=$1';
    const response = await pool.query(query, [teamId]);
    return response;   
}

const updateTimesTl = async (timesTl, id) => {
    query = `UPDATE members SET "timesTl"=$1 WHERE "id"=$2 RETURNING *`;
    response = await pool.query(query, [timesTl + 1, id]);
    return response;
}

const updateTimesQa = async (timesQa, id) => {
    query = `UPDATE members SET "timesQa"=$1 WHERE "id"=$2 RETURNING *`;
    response = await pool.query(query, [timesQa + 1, id]);
    return response;
}

const updateResult = async ({ teamId, currentTl, currentQa} ) => {
    let query = 'SELECT * FROM results WHERE "teamId"=$1';
    let response = await pool.query(query, [teamId]);
    if (response.rowCount < 1 ){
        query = `INSERT INTO results("teamId","currentTl","currentQa") VALUES($1, $2, $3) RETURNING *`;
        response = await pool.query(query, [ teamId, currentTl, currentQa]);
    } else {
        query = `UPDATE results SET "currentTl"=$1, "currentQa"=$2 WHERE "teamId"=$3 RETURNING *`;
        response = await pool.query(query, [ currentTl, currentQa, teamId ]);
    }

    return response;
}

const getCandidatesForQa = async (teamId) => {
    let query = 'SELECT * FROM members WHERE "teamId"=$1 AND "timesQa"=$2';
    return getCandidates(teamId, query);
}

const getCandidatesForTl = async (teamId) => {
    let query = 'SELECT * FROM members WHERE "teamId"=$1 AND "timesTl"=$2';
    return getCandidates(teamId, query);
}

const getCandidates = async (teamId, query) => {
    let currentIteration = await getCurrentIteration(teamId);
    let iteration = Number.parseInt(currentIteration.rows[0].value) < 0 ? 0 : Number.parseInt(currentIteration.rows[0].value) - 1;
    let response = await pool.query(query, [teamId, iteration]);

    if(response.rowCount < 1){
       currentIteration = await incrementCurrentIteration(teamId);
       iteration = Number.parseInt(currentIteration.rows[0].value) < 0 ? 0 : Number.parseInt(currentIteration.rows[0].value) - 1;
       response = await pool.query(query, [teamId, iteration]);
    }
    return response;
}

module.exports = {
    getCurrentIteration,
    incrementCurrentIteration,
    getTeams,
    getMembers,
    updateResult,
    getCandidatesForTl,
    getCandidatesForQa,
    updateTimesTl,
    updateTimesQa,
}