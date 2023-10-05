import chaiHttp from 'chai-http';
import app from '../index.ts';
import { describe } from 'node:test';

const chai = require('chai');

chai.use(chaiHttp);
chai.should();

describe('Test', () => {
  describe('GET /', () => {
    it('should return 200', (done) => {
      chai.request(app)
        .get('/usuario?id=1')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
});
