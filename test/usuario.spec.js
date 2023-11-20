import chaiHttp from 'chai-http';
import app from '../index.ts';
import { describe } from 'node:test';

const chai = require('chai');
const expect = require('chai').expect;

chai.use(chaiHttp);
chai.should();

describe('Test de obtener un usuario', () => {
  describe('GET usuario?id=1', () => {
    it('GET 1 usuario debería retornar 200 o 404, si es 200 debería retornar un body con un objeto', (done) => {
      chai.request(app)
        .get('/usuario?id=1')
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


describe('Test de obtener todos los usuarios', () => {
  describe('GET usuario/all', () => {
    it('GET all usuario debería retornar 200 y retornar un body con un arreglo', (done) => {
      chai.request(app)
        .get('/usuario/all')
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
describe('Test de crear un usuario', () => {
  describe('POST usuario', () => {
    it('POST usuario debería retornar 201 y retornar un body con un objeto y propiedad id', (done) => {
      chai.request(app)
        .post('/usuario')
        .send({
          nombre: 'test',
          password: 'test',
          correo: 'test@gmail.com'
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


describe('GET usuario recien creado', () => {
  it('GET 1 usuario (despues de POST) debería retornar 200 y retornar un body con un objeto y id igual al creado', (done) => {
    chai.request(app)
      .get(`/usuario?id=${id_creado}`)
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


describe('Test de actualizar un usuario', () => {
  describe('PUT usuario', () => {
    it('PUT usuario debería retornar 200 y retornar un body con un objeto y propiedad id', (done) => {
      chai.request(app)
        .put(`/usuario?id=${id_creado}`)
        .send({
          nombre: 'modificado',
          password: 'modificado',
          correo: 'modificado'
        })
        .end((err, res) => {
          res.should.have.status(200);
          describe('GET usuario recien modificado', () => {
            it('GET (después de PUT) debería retornar 200 y retornar un body con un objeto y id igual al creado', (done) => {
              chai.request(app)
                .get(`/usuario?id=${id_creado}`)
                .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.an('object');
                  res.body.should.have.property('id');
                  res.body.id.should.be.eq(id_creado);
                  res.body.nombre.should.be.eq('modificado');
                  res.body.password.should.be.eq('modificado');
                  res.body.correo.should.be.eq('modificado');
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


describe('Test de eliminar un usuario', () => {
  describe('DELETE usuario', () => {
    it('DELETE usuario debería retornar 200 y retornar un body con un objeto y propiedad id', (done) => {
      chai.request(app)
        .delete(`/usuario?id=${id_creado}`)
        .end((err, res) => {
          res.should.have.status(200);
          describe('GET usuario recien eliminado', () => {
            it('GET (después de DELETE) debería retornar 404', (done) => {
              chai.request(app)
                .get(`/usuario?id=${id_creado}`)
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
