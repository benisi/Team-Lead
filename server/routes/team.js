import { Router } from 'express';
import TeamController from '../controllers/team';

const teamRouter = Router();

const { addNewTeam } = TeamController;

teamRouter.post('/', addNewTeam);

export default teamRouter;
