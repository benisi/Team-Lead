const chai = require('chai');

const generators = require('../database/generators');

const { should, expect } = chai;
should();

describe('Test for valid current iteration', () => {
    it('should have a datatype of integer', async () => {
        const response = await generators.getCurrentIteration(1);
        const currentIteration = response.rows[0].value;
        expect(Number.parseInt(currentIteration)).to.be.an('number');
    });
});

describe('Test for succesful incrementation of current iteration', () => {
    it('should have a value of current iteration + 1', async () => {
        const currentIterationResponse = await generators.getCurrentIteration(1);
        const currentIteration = currentIterationResponse.rows[0].value;
        const updatedInterationResponse = await generators.incrementCurrentIteration(1);
        const updatedInteration = updatedInterationResponse.rows[0].value;
        expect(Number.parseInt(currentIteration) + 1).to.equal(Number.parseInt(updatedInteration));
    });
});

describe('Test for succesful retrieval of team data', () => {
    it('it should have aa array of teams', async () => {
        const teamRetrievalResponse = await generators.getTeams();
        const teams = teamRetrievalResponse.rows;
        expect(teams).to.be.an('array');
    });
});

describe('Test for succesful retrieval of team members data', () => {
    it('it should have an array of team members', async () => {
        const membersRetrievalResponse = await generators.getMembers(1);
        const members = membersRetrievalResponse.rows;
        expect(members).to.be.an('array');
    });
});

describe('Test for succesful update of result table', () => {
    it('it should return an array of the updated result', async () => {
        const updatedResult = await generators.updateResult({ teamId: 1, currentQa: 'Ovie', currentTl: 'Rita'});
        const result = updatedResult.rows[0];
        expect(result).to.have.property('teamId');
    });
});

describe('Test for retrieval of candidates for Tl', () => {
    it('it should return an array of candidates', async () => {
        const response = await generators.getCandidatesForTl(1);
        const result = response.rows;
        expect(result).to.be.an('array');
    });
});

describe('Test for retrieval of candidates for QA', () => {
    it('it should return an array of candidates', async () => {
        const response = await generators.getCandidatesForQa(1);
        const result = response.rows;
        expect(result).to.be.an('array');
    });
});

describe('Test to update times a member is QA', () => {
    it('it should return an array of candidates containing an incremented value', async () => {
        const response = await generators.updateTimesQa(1,1);
        const result = response.rows[0];
        expect(result.timesQa).to.equal(2);
    });
});

describe('Test to update times a member is Tl', () => {
    it('it should return an array of candidates containing an incremented value', async () => {
        const response = await generators.updateTimesTl(1,1);
        const result = response.rows[0];
        expect(result.timesTl).to.equal(2);
    });
});



