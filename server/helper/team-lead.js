import generator from '../database/generators';

const selectTeamLead = async () => {
    const teams = await generator.getTeams();

    teams.rows.forEach( async (team) => {
        const { id } = team;
    
        let candidateResponse = await generator.getCandidatesForTl(id);
        let candidate = candidateResponse.rows;

        if ( candidateResponse.rowCount === 0 ){
            candidateResponse = await generator.getCandidatesForTl(id);
            candidate = candidateResponse.rows;
        }

        const teamLeadIndex = Math.floor(Math.random() * candidate.length);

        const teamLead = candidate[teamLeadIndex];
        generator.updateTimesTl( teamLead.timesTl, teamLead.id);

        selectTeamQa(id, teamLead);
        return true;
    });
}

const selectTeamQa = async (teamId, teamLead) => {
    const candidatesResponse = await generator.getCandidatesForQa(teamId);
    const candidates = candidatesResponse.rows;

    const qaNominees = candidates.filter((candidate) => {
        return candidate.id !== teamLead.id;
    });

    const qaIndex = Math.floor(Math.random() * qaNominees.length);
    const qa = qaNominees[qaIndex];

    await generator.updateTimesQa( qa.timesQa, qa.id);

    await generator.updateResult({teamId, 'currentTl': teamLead.name, 'currentQa': qa.name});
    console.log({teamId, 'currentTl': teamLead.name, 'currentQa': qa.name});
}

selectTeamLead();

export default selectTeamLead;
