/* global process, describe, it */
'use strict';

process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');

const api = require('../server');
chai.should();

chai.use(chaiHttp);

describe('Public Endpoints.', () => {
  it('GET / should return status of 200 and a json object.', (done) => {
    chai.request(api)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object')
        res.body.should.have.property('success').eql(true);
        res.body.should.have.property('message').eql("Get authentication token by, POST  http://localhost:8080/login and provide an arbitrary username and password then Pass that token to 'x-access-token' header to access private endpoints");
        done();
      });
  });

  it('POST /login should return a verification token if username and password are passed ', (done) => {
    chai.request(api)
      .post('/login')
      .send({
        username: "randomusername",
        password: "randompass"
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('success').eql(true);
        res.body.should.have.property('message');
        res.body.should.have.property('token');
        done();
      });
  });
  it('POST /login should not return token if empty username is provide', (done) => {
    chai.request(api)
      .post('/login')
      .send({
        username: "",
        password: "randompass"
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('Please provide the username and password.');
        done();
      });
  });
  it('POST /login should not return token if empty password is provide.', (done) => {
    chai.request(api)
      .post('/login')
      .send({
        username: "randomusername",
        password: ""
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('Please provide the username and password.');
        done();        
      })
  })
  

});
