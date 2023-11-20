import chaiHttp from 'chai-http';
import app from '../index.ts';
import { describe } from 'node:test';

const chai = require('chai');
const expect = require('chai').expect;

chai.use(chaiHttp);
chai.should();

describe('Test de obtener un producto', () => {
  describe('GET producto?id=1', () => {
    it('GET 1 producto debería retornar 200 o 404, si es 200 debería retornar un body con un objeto', (done) => {
      chai.request(app)
        .get('/producto?id=1')
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
  });
});


describe('Test de obtener todos los productos', () => {
  describe('GET producto/all', () => {
    it('GET all productos debería retornar 200 y retornar un body con un arreglo', (done) => {
      chai.request(app)
        .get('/producto/all')
        .end((err, res) => {
          res.should.have.property('body');
          res.should.have.status(200);
          res.body.should.be.an('array');
          done();
        });
    });
  });
});


let id_creado = 0;
describe('Test de crear un producto', () => {
  describe('POST producto', () => {
    it('POST producto debería retornar 201 y retornar un body con un objeto y propiedad id', (done) => {
      chai.request(app)
        .post('/producto')
        .send({
          nombre: 'test',
          precio_minimo: 100,
          descripcion: 'test',
          fecha_termino: '2021-06-01'
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.an('object');
          res.body.should.have.property('id');
          id_creado = res.body.id;          
          done();
        });
    });
  }); 
});


describe('GET producto recien creado', () => {
  it('GET 1 producto (despues de POST) debería retornar 200 y retornar un body con un objeto y id igual al creado', (done) => {
    chai.request(app)
      .get(`/producto?id=${id_creado}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.should.have.property('id');
        res.body.id.should.be.eq(id_creado);
        done();
      });
  });
});


describe('Test de actualizar un producto', () => {
  describe('PUT producto', () => {
    it('PUT producto debería retornar 200 y retornar un body con un objeto y propiedad id', (done) => {
      chai.request(app)
        .put(`/producto?id=${id_creado}`)
        .send({
          nombre: 'modificado',
          precio_minimo: 3000,
          descripcion: 'modificado',
          fecha_termino: '2021-06-02'
        })
        .end((err, res) => {
          res.should.have.status(200);
          describe('GET producto recien modificado', () => {
            it('GET (después de PUT) debería retornar 200 y retornar un body con un objeto y id igual al creado', (done) => {
              chai.request(app)
                .get(`/producto?id=${id_creado}`)
                .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.an('object');
                  res.body.should.have.property('id');
                  res.body.id.should.be.eq(id_creado);
                  res.body.nombre.should.be.eq('modificado');
                  res.body.precio_minimo.should.be.eq(3000);
                  res.body.descripcion.should.be.eq('modificado');
                  res.body.fecha_termino.should.be.eq('2021-06-02');
                  done();
                });
            });
          });
          setTimeout(() => {
          done();}, 1000);
        });
    });
  });
});


describe('Test de eliminar un producto', () => {
  describe('DELETE producto', () => {
    it('DELETE producto debería retornar 200 y retornar un body con un objeto y propiedad id', (done) => {
      chai.request(app)
        .delete(`/producto?id=${id_creado}`)
        .end((err, res) => {
          res.should.have.status(200);
          describe('GET producto recien eliminado', () => {
            it('GET (después de DELETE) debería retornar 404', (done) => {
              chai.request(app)
                .get(`/producto?id=${id_creado}`)
                .end((err, res) => {
                  res.should.have.status(404);
                  done();
                });
            });
          });
          done();
        });
    });
  });
});

