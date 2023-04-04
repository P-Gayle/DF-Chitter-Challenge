const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server.js');
const Peep = require('../models/peepModel.js');
const expect = chai.expect;
const dotenv = require('dotenv');

//test database
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

chai.use(chaiHttp);

describe('Peep Controller', () => {
  describe('POST /peeps', () => {
    beforeEach(async () => {
      await Peep.deleteMany({});
    });

    it('should return a 200 response with the created peep', async () => {
      const user = { user_id: 'test_user_id' };
      const message = 'Hello, world!';

      const response = await chai
        .request(server)
        .post('/peeps')
        .send({ message })
        .set('Authorization', `Bearer ${user._id}`);

      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('object');
      expect(response.body.message).to.equal(message);
      expect(response.body.user_id).to.equal(user._id);

      const peeps = await Peep.find({});
      expect(peeps).to.have.length(1);
      expect(peeps[0].message).to.equal(message);
      expect(peeps[0].user_id).to.equal(user._id);
    });

    it('should return a 400 response if message field is empty', async () => {
      const user = { user_id: 'test_user_id' };
      const message = '';

      const response = await chai
        .request(server)
        .post('/peeps')
        .send({ message })
        .set('Authorization', `Bearer ${user._id}`);

      expect(response.status).to.equal(400);
      expect(response.body).to.be.an('object');
      expect(response.body.error).to.equal('Please complete the form');
      expect(response.body.emptyField).to.include('message');

      const peeps = await Peep.find({});
      expect(peeps).to.have.length(0);
    });
  });
});