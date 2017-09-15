'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _mocha = require('mocha');

var _app = require('../app.js');

var _app2 = _interopRequireDefault(_app);

var _test_data = require('../test_data.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.use(_chaiHttp2.default);
var should = _chai2.default.should();

(0, _mocha.describe)('Invalid routes', function () {
  (0, _mocha.it)('should return error', function (done) {
    _chai2.default.request(_app2.default).post('/').end(function (err, res) {
      res.should.have.status(404);
      done();
    });
  });
});

(0, _mocha.describe)('user-login', function () {
  this.timeout(10000);
  (0, _mocha.it)('should return a JWT token given any username and password', function (done) {
    _chai2.default.request(_app2.default).post('/login').send(_test_data.data.authorization.credentials).end(function (err, res) {
      res.should.have.status(200);
      res.body.should.have.property('token');
      done();
    });
  });
  (0, _mocha.it)('should return error if username is not provided', function (done) {
    _chai2.default.request(_app2.default).post('/login').send(_test_data.data.authorization.credentials.password).end(function (err, res) {
      res.should.have.status(400);
      res.body.should.have.property('message');
      done();
    });
  });
  (0, _mocha.it)('should return error if password is not provided', function (done) {
    _chai2.default.request(_app2.default).post('/login').send(_test_data.data.authorization.credentials.username).end(function (err, res) {
      res.should.have.status(400);
      res.body.should.have.property('message');
      done();
    });
  });
});