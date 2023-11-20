import chaiHttp from 'chai-http';
import app from '../index.ts';
import { describe } from 'node:test';

const chai = require('chai');
const expect = require('chai').expect;

chai.use(chaiHttp);
chai.should();

describe('Test de obtener un admin', () => {
  describe('GET admin?id=1', () => {
    it('GET 1 admin debería retornar 200 o 404, si es 200 debería retornar un body con un objeto', (done) => {
      chai.request(app)
        .get('/admin?id=1')
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


describe('Test de obtener todos los admins', () => {
  describe('GET admin/all', () => {
    it('GET all admins debería retornar 200 y retornar un body con un arreglo', (done) => {
      chai.request(app)
        .get('/admin/all')
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
describe('Test de crear un admin', () => {
  describe('POST admin', () => {
    it('POST admin debería retornar 201 y retornar un body con un objeto y propiedad id', (done) => {
      chai.request(app)
        .post('/admin')
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


describe('GET admin recien creado', () => {
  it('GET 1 admin (despues de POST) debería retornar 200 y retornar un body con un objeto y id igual al creado', (done) => {
    chai.request(app)
      .get(`/admin?id=${id_creado}`)
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


describe('Test de actualizar un admin', () => {
  describe('PUT admin', () => {
    it('PUT admin debería retornar 200 y retornar un body con un objeto y propiedad id', (done) => {
      chai.request(app)
        .put(`/admin?id=${id_creado}`)
        .send({
          nombre: 'modificado',
          password: 'modificado',
          correo: 'modificado'
        })
        .end((err, res) => {
          res.should.have.status(200);
          describe('GET admin recien modificado', () => {
            it('GET (después de PUT) debería retornar 200 y retornar un body con un objeto y id igual al creado', (done) => {
              chai.request(app)
                .get(`/admin?id=${id_creado}`)
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


describe('Test de eliminar un admin', () => {
  describe('DELETE admin', () => {
    it('DELETE admin debería retornar 200 y retornar un body con un objeto y propiedad id', (done) => {
      chai.request(app)
        .delete(`/admin?id=${id_creado}`)
        .end((err, res) => {
          res.should.have.status(200);
          describe('GET admin recien eliminado', () => {
            it('GET (después de DELETE) debería retornar 404', (done) => {
              chai.request(app)
                .get(`/admin?id=${id_creado}`)
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
