import chaiHttp from 'chai-http';
import app from '../index.ts';
import { describe } from 'node:test';

const chai = require('chai');
const expect = require('chai').expect;

chai.use(chaiHttp);
chai.should();

describe('Test de obtener una oferta', () => {
  describe('GET oferta?id=1', () => {
    it('GET 1 oferta debería retornar 200 o 404, si es 200 debería retornar un body con un objeto', (done) => {
      chai.request(app)
        .get('/oferta?id=1')
        .end((err, res) => {
          expect(res.status).to.be.oneOf([200, 404]);
          if(res.status == 200){
            res.body.should.be.an('object');
            res.body.should.have.property('id');
            res.body.id.should.be.eq(1);
          }
          done();
        });
    });
    after(async () => {});
  });
});


describe('Test de obtener todas los ofertas', () => {
  describe('GET oferta/all', () => {
    it('GET all ofertas debería retornar 200 y retornar un body con un arreglo', (done) => {
      chai.request(app)
        .get('/oferta/all')
        .end((err, res) => {
          res.should.have.property('body');
          res.should.have.status(200);
          res.body.should.be.an('array');
          done();
        });
    });
    after(async () => {});
  });
});


let id_creado = 0;
describe('Test de crear una oferta', () => {
  describe('POST oferta', () => {
    it('POST oferta debería retornar 201 y retornar un body con un objeto y propiedad id', (done) => {
      chai.request(app)
        .post('/oferta')
        .send({
          monto: 100
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.an('object');
          res.body.should.have.property('id');
          id_creado = res.body.id;          
          done();
        });
    });
    after(async () => {});
  }); 
});


describe('GET oferta recien creada', () => {
  it('GET 1 oferta (despues de POST) debería retornar 200 y retornar un body con un objeto y id igual al creado', (done) => {
    chai.request(app)
      .get(`/oferta?id=${id_creado}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.should.have.property('id');
        res.body.id.should.be.eq(id_creado);
        done();
      });
      after(async () => {});
  });
});


describe('Test de actualizar un oferta', () => {
  describe('PUT oferta', () => {
    it('PUT oferta debería retornar 200 y retornar un body con un objeto y propiedad id', (done) => {
      chai.request(app)
        .put(`/oferta?id=${id_creado}`)
        .send({
          monto: 2000
        })
        .end((err, res) => {
          res.should.have.status(200);
          describe('GET oferta recien modificado', () => {
            it('GET (después de PUT) debería retornar 200 y retornar un body con un objeto y id igual al creado', (done) => {
              chai.request(app)
                .get(`/oferta?id=${id_creado}`)
                .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.an('object');
                  res.body.should.have.property('id');
                  res.body.id.should.be.eq(id_creado);
                  res.body.monto.should.be.eq(2000);
                  done();
                });
            });
          });
          setTimeout(() => {
          done();}, 1000);
        });
    });
    after(async () => {});
  });
});


describe('Test de eliminar un oferta', () => {
  describe('DELETE oferta', () => {
    it('DELETE oferta debería retornar 200 y retornar un body con un objeto y propiedad id', (done) => {
      chai.request(app)
        .delete(`/oferta?id=${id_creado}`)
        .end((err, res) => {
          res.should.have.status(200);
          describe('GET oferta recien eliminada', () => {
            it('GET (después de DELETE) debería retornar 404', (done) => {
              chai.request(app)
                .get(`/oferta?id=${id_creado}`)
                .end((err, res) => {
                  res.should.have.status(404);
                  done();
                });
            });
          });
          done();
        });
    });
    after(async () => {});
  });
});

  


