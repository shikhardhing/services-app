import chai from 'chai'
import chaiHttp from 'chai-http'
import { describe, it } from 'mocha'
import server from '../app.js'
import { data } from '../test_data.js'

chai.use(chaiHttp)
let should = chai.should()

describe('Thumbnail creation', function () {
  this.timeout(50000)
  it('should return thumbnail image if image url is correct', function(done) {
    chai.request(server)
      .post('/api/thumbnail?url=' + data.thumbnail.correctImg)
      .set('Authorization', data.authorization.validToken)
      .end( function(err, res) {
        res.should.have.property('body')
        res.should.have.status(200)
        done()
      })
  })
  it('should not authenticate if jwt token is not provided', function(done) {
    chai.request(server)
      .post('/api/thumbnail?url=' + data.thumbnail.correctUrl)
      .end( function(err, res) {
        res.should.have.property('body')
        res.should.have.status(401)
        done()
      })
  })
  it('should not authenticate if invalid jwt token is provided', function(done) {
    chai.request(server)
      .post('/api/thumbnail?url=' + data.thumbnail.correctUrl)
      .set('Authorization', data.authorization.inValidToken)
      .end( function(err, res) {
        res.should.have.property('body')
        res.should.have.status(401)
        done()
      })
  })
  it('should return thumbnail image if URL does not contains image', function(done) {
    chai.request(server)
      .post('/api/thumbnail?url=' + data.thumbnail.incorrectImg)
      .set('Authorization', data.authorization.validToken)
      .end( function(err, res) {
        res.should.have.property('body')
        res.should.have.status(400)
        done()
      })
  })
  it('should return error if image url is incorrect', function(done) {
    chai.request(server)
      .post('/api/thumbnail?url=' + data.thumbnail.incorrectUrl)
      .set('Authorization', data.authorization.validToken)
      .end( function(err, res) {
        res.should.have.property('body')
        res.should.have.status(400)
        done()
      })
  })
  it('should return error if image url is not provided', function(done) {
    chai.request(server)
      .post('/api/thumbnail')
      .set('Authorization', data.authorization.validToken)
      .end( function(err, res) {
        res.should.have.property('body')
        res.should.have.status(400)
        done()
      })
  })
  it('should return error if image is broken', function(done) {
    chai.request(server)
      .post('/api/thumbnail?url=' + data.thumbnail.brokenImg)
      .set('Authorization', data.authorization.validToken)
      .end( function(err, res) {
        res.should.have.property('body')
        res.should.have.status(400)
        done()
      })
  })
  it('should return error if image size exceeds 100MB', function(done) {
    chai.request(server)
      .post('/api/thumbnail?url=' + data.thumbnail.largeImg)
      .set('Authorization', data.authorization.validToken)
      .end( function(err, res) {
        res.should.have.property('body')
        res.should.have.status(400)
        done()
      })
  })
})

describe('Json Patch', function () {
  it('should return a patched json if correct data is provided', function(done) {
    chai.request(server)
    .post('/api/patch')
    .send({
      document: data.json_patch.document,
      operation: data.json_patch.validOperation
    })
    .set('Authorization', data.authorization.validToken)
    .end( function(err, res) {
      res.should.have.status(200)
      res.body.should.have.a.property('firstName', 'Joachim')
      res.body.should.have.a.property('lastName', 'Wester')
      res.body.should.have.deep.nested.property('contactDetails.phoneNumbers', [{ 'number': '555-123' }])
      done()
    })
  })
  it('should not authenticate if jwt token is not provided', function(done) {
    chai.request(server)
      .post('/api/patch')
      .send({
        document: data.json_patch.document,
        patch: data.json_patch.validPatch
      })
      .end( function(err, res) {
        res.should.have.status(401)
        res.body.should.have.a.property('message')
        done()
      })
  })
  it('should not authenticate if invalid jwt token is provided', function(done) {
    chai.request(server)
    .post('/api/patch')
    .send({
      document: data.json_patch.document,
      patch: data.json_patch.validPatch
    })
    .set('Authorization', data.authorization.inValidToken)
    .end( function(err, res) {
      res.should.have.status(401)
      res.body.should.have.a.property('message')
      done()
    })
  })
  it('should return error if document/patch is not provided', function(done) {
    chai.request(server)
    .post('/api/patch')
    .send({
      document: data.json_patch.document
    })
    .set('Authorization', data.authorization.validToken)
    .end( function(err, res) {
      res.should.have.status(400)
      res.body.should.have.a.property('message')
      done()
    })
  })
  it('should return error if patch is invalid', function(done) {
    chai.request(server)
    .post('/api/patch')
    .send({
      document: data.json_patch.document,
      patch: data.json_patch.invalidPatch
    })
    .set('Authorization', data.authorization.validToken)
    .end( function(err, res) {
      res.should.have.status(400)
      res.body.should.have.a.property('message')
      done()
    })
  })
})
