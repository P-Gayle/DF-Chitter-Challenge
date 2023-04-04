const chai = require('chai');
const { expect } = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server')
const { beforeEach } = require('mocha');
const dotenv = require('dotenv');
const Peep = require('../models/peepModel');

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const { sampleData } = require('./sampleData')

chai.use(chaiHttp);

describe('Server/DB integration tests for GET requests to "/"', () => {

    beforeEach(async () => {
        try {
            await Peep.deleteMany();
            console.log('Peeps deleted');
        } catch (error) {
            console.log('error deleting peeps')
            throw new Error('error deleting peeps')
        }

        try {
            await Peep.insertMany(sampleData.peep);
            console.log('Peeps added');
        } catch (error) {
            console.log('error adding peeps')
            throw new Error('error adding peeps')
        }
    })

    it('should return all peeps', async () => {
        // const response = await chai.request(server).get('/api/peeps');
        const response = await chai.request(server).get('/api/peeps').send();

        expect(response).to.have.status(200);
        expect(response.body).to.be.an('array');
        expect(response.body.length).to.equal(sampleData.peep.length);
    })
})