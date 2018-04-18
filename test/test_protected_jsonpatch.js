/* global process, describe, it */
'use strict';

process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');

const token = '?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiZmVsaXgiLCJwYXNzd29yZCI6InBhc3MifSwiaWF0IjoxNTI0MDM0MjkxLCJleHAiOjE1MjQxMjA2OTF9.qzW1lzQfbvo-iOPKjr4t-YGLlquyBIX4Ek-b_-MxvGI';
const wrongToken = '?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiZmVsaXgiLCJwYXNzd29yZCI6InBhc3MifSwiaWF0IjoxNTI0MDM0MjkxLCJleHAiOjE1MjQxMjA2OTF9.qzW1lzQfbvo-iOPKjr4t-YGLlquyBIX4Ek-b_-MxvGI';

const api = require('../server');
chai.should();

chai.use(chaiHttp);
 
describe('Json Patch endpoints /protected/', () => {
    it('POST / should return patched object with status 200', (done) => {
        chai.request(api)
          .post('/protected/json_patch' + token)
          .send({
            'obj': {
              'baz': 'qux',
              'foo': 'bar'
            },
            'patch': [
              { 'op': 'replace', 'path': '/baz', 'value': 'boo' },
              { 'op': 'add', 'path': '/hello', 'value': ['world'] },
              { 'op': 'remove', 'path': '/foo'}
            ] 
          })
          .end((err, res) => {
              res.should.have.status(200);
              res.should.be.json;
              res.body.should.be.a('object');
              res.body.should.have.property('success');
              res.body.should.have.property('message');
              done();
          })
    });
    it('Should return 400 if jwt token not passed , POST /protected/json_patch', (done) => {
        chai.request(api)
          .post('/protected/json_patch')
          .send({
            'obj': {
              'baz': 'qux',
              'foo': 'bar'
            },
            'patch': [
              { 'op': 'replace', 'path': '/baz', 'value': 'boo' },
              { 'op': 'add', 'path': '/hello', 'value': ['world'] },
              { 'op': 'remove', 'path': '/foo'}
            ]
          })
          .end((err, res) => {
              res.should.have.status(400);
              res.should.be.json;
              res.body.should.be.a('object');
              res.body.should.have.property('success').eql(false);
              res.body.should.have.property('message').eql('No token provided.');
              done();
          })
    });
    it('Should return status 403 if wrong token provided , POST /protected/json_patch', (done) => {
        chai.request(api)
          .post('/protected/json_patch'+ wrongToken)
          .send({
            'obj': {
              'baz': 'qux',
              'foo': 'bar'
            },
            'patch': [
              { 'op': 'replace', 'path': '/baz', 'value': 'boo' },
              { 'op': 'add', 'path': '/hello', 'value': ['world'] },
              { 'op': 'remove', 'path': '/foo'}
            ] 
          })
          .end((err, res) => {
              res.should.have.status(403);
              res.should.be.json;
              res.body.should.be.a('object');
              res.body.should.have.property('success').eql(false);
              res.body.should.have.property('message').eql('Incorrect Token. Authenticaion Failed.');
              done();
          })
    });
    it('Should return status 400 if both json object and patch json arrays not passed , POST /protected/json_patch', (done) => {
        chai.request(api)
          .post('/protected/json_patch' + token)
          .send({})
          .end((err, res) => {
              res.should.have.status(400);
              res.should.be.json;
              res.body.should.be.a('object');
              res.body.should.have.property('success').eql(false);
              res.body.should.have.property('message').eql('Please provide obj (JSON) and patch (JSON Array) on the form');
              done();
          })
    });
})

