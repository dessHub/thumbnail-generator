/* global process, describe, it */
'use strict';

process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');

let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiZmVsaXgiLCJwYXNzd29yZCI6InBhc3MifSwiaWF0IjoxNTI0MDM0MjkxLCJleHAiOjE1MjQxMjA2OTF9.qzW1lzQfbvo-iOPKjr4t-YGLlquyBIX4Ek-b_-MxvGI';
let wrongToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiZmVsaXgiLCJwYXNzd29yZCI6InBhc3MifSwiaWF0IjoxNTI0MDM0MjkxLCJleHAiOjE1MjQxMjA2OTF9.qzW1lzQfbvo-iOPKjr4t-YGLlquyBIX4Ek-b_-MxvGI';


const api = require('../server');
chai.should();

chai.use(chaiHttp);
 
describe('Protected Endpoints /protected/', () => {
    it(' Should return user object with status 200 Get /protected', (done) => {
        chai.request(api)
          .get('/protected')
          .set('token', token)
          .end((err, res) => {
              res.should.have.status(200);
              res.should.be.json;
              res.body.should.be.a('object');
              res.body.should.have.property('success').eql(true);
              res.body.should.have.property('obj');
              done();
          })
    })
    it('Should return status 400 if token is not passed Get /protected ', (done) => {
        chai.request(api)
          .get('/protected')
          .end((err, res) => {
              res.should.have.status(400);
              res.should.be.json;
              res.body.should.be.a('object');
              res.body.should.have.property('success').eql(false);
              res.body.should.have.property('message').eql('No token provided.');
              done();
          })
    })
    it('Should return status 403 if wrong token is passed Get /protected ', (done) => {
        chai.request(api)
          .get('/protected')
          .set('token', wrongToken)
          .end((err, res) => {
              res.should.have.status(403);
              res.should.be.json;
              res.body.should.be.a('object');
              res.body.should.have.property('success').eql(false);
              res.body.should.have.property('message').eql('Incorrect Token. Authenticaion Failed.');
              done();
          })
    })
})

