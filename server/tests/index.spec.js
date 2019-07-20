const chai = require('chai');
const chaiHttp = require('chai-http');

const pool = require('../database/pool');

chai.use(chaiHttp);

const { should, expect } = chai;
should();

const url = '/';

const app = require('../../server');



describe('Test for base url', async () => {
    it('should return a status code of 200', (done)  => {
        chai.request(app)
        .get(url)
        .end((err, res) => {
            expect(res).to.have.status(200);
            done();
        });
    });
});

describe('Test for database connection', () => {
    it('should have a row count of one which signify active connection', async () => {
        const res = await pool.query('SELECT NOW()');
        expect(res.rowCount).to.equal(1);
    });
});