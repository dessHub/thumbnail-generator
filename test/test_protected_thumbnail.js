/* global process, describe, it */
'use strict';

process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');

const token = '?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiZmVsaXgiLCJwYXNzd29yZCI6InBhc3MifSwiaWF0IjoxNTI0MDM0MjkxLCJleHAiOjE1MjQxMjA2OTF9.qzW1lzQfbvo-iOPKjr4t-YGLlquyBIX4Ek-b_-MxvGI';
const wrongToken = '?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiZmVsaXgiLCJwYXNzd29yZCI6InBhc3MifSwiaWF0IjoxNTI0MDM0MjkxLCJleHAiOjE1MjQxMjA2OTF9.qzW1lzQfbvo-iOPKjr4t-YGLlquyBIX4Ek-b_-MxvGI';
const imgurl = "https://static.depositphotos.com/storage/image/b777195d2fbfd20498edac30eb573d4b865a7f0d.jpg";

const api = require('../server');
chai.should();

chai.use(chaiHttp);

describe('Protected Endpoints: Thumbnail Generation ', () => {
  it('Should return an image thumbnail if imageUrl and valid token is provided .POST /protected/generate_thumnail ', (done) => {
    chai.request(api)
      .post('/protected/generate_thumnail'+ token )                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
      .send({ imagurl: imgurl })
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.have.property('success').eql(true);
        res.body.should.have.property('message').eql('Thumbnail generated successfully');
        res.body.should.have.property('thumbnail');
        done();
      });
  });
  it('Should return status of 400 if verification token is not provided. POST /protected/generate_thumbnail ', (done) => {
    chai.request(api)
      .post('/protected/generate_thumnail')
      .send({ imgurl: imgurl })
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('No token provided.');
        done();
      });
  });
  it('Should return status of 403 if verification token provided is incorrect. POST /protected/generate_thumbnail ', (done) => {
    chai.request(api)
      .post('/protected/generate_thumnail'+ wrongToken)
      .send({ imgurl: imgurl })
      .set('token', wrongToken)
      .end((err, res) => {
        res.should.have.status(403);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('Incorrect Token. Authenticaion Failed.');
        done();
      });
  });
  it('Should not return an image if no imgUrl is provided with correct verification code. POST /protected/generate_thumbnail ', (done) => {
    chai.request(api)
      .post('/protected/generate_thumnail'+ token)
      .send({})
      .set('token', token)
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('Please provide/pass image url (imgurl) on the form');
        done();
      });
  });
});
