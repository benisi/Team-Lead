import pool from '../database/pool';

const getTeamOfficials = async(req, res) => {
    const query = 'SELECT * FROM results'
    const {rows} = await pool.query(query);
    res.status(200).json({
        status: 200,
        data: rows,
    })
}

export default getTeamOfficials;