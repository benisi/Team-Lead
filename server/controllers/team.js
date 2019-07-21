import TeamModel from '../models/Team';

const Team = new TeamModel();

class TeamController {
    static async addNewTeam (req, res) {
        const { name } = req.user;

        const team = await Team.create({
            name
        });
        return res.status(201).send({
            success: 'true`',
            message: 'team added successfully', 
            team
        });
    } 
}

export default TeamController;
