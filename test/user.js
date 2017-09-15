import chai from 'chai'
import chaiHttp from 'chai-http'
import { describe, it } from 'mocha'

import server from '../app.js'
import { data } from '../test_data.js'

chai.use(chaiHttp)
let should = chai.should()

describe('Invalid routes', function() {
  it('should return error', function(done) {
    chai.request(server)
      .post('/')
      .end( function(err, res) {
        res.should.have.status(404)
        done()
      })
  })
})

describe('user-login', function() {
  this.timeout(10000)
  it('should return a JWT token given any username and password', function(done) {
    chai.request(server)
      .post('/login')
      .send(data.authorization.credentials)
      .end( function(err, res) {
        res.should.have.status(200)
        res.body.should.have.property('token')
        done()
      })
  })
  it('should return error if username is not provided', function(done) {
    chai.request(server)
    .post('/login')
    .send(data.authorization.credentials.password)
    .end( function(err, res) {
      res.should.have.status(400)
      res.body.should.have.property('message')
      done()
    })
  })
  it('should return error if password is not provided', function(done) {
    chai.request(server)
    .post('/login')
    .send(data.authorization.credentials.username)
    .end( function(err, res) {
      res.should.have.status(400)
      res.body.should.have.property('message')
      done()
    })
  })
})
