import pool from '../database/pool';

//user able to add a team
class Team {
    
    async create(data) {
        const addTeam = `INSERT INTO
            team("name", "userId")
            VALUES($1, $2)
            returning *`;
        
        const values = [
            data.name
        ];

        try {
            const { rows } = await pool.query(addTeam, values);
            return rows[0];
        }   catch (error) {
            return error
        }
    }
}



export default Team;


