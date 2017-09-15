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

(0, _mocha.describe)('Thumbnail creation', function () {
  this.timeout(50000);
  (0, _mocha.it)('should return thumbnail image if image url is correct', function (done) {
    _chai2.default.request(_app2.default).post('/api/thumbnail?url=' + _test_data.data.thumbnail.correctImg).set('Authorization', _test_data.data.authorization.validToken).end(function (err, res) {
      res.should.have.property('body');
      res.should.have.status(200);
      done();
    });
  });
  (0, _mocha.it)('should not authenticate if jwt token is not provided', function (done) {
    _chai2.default.request(_app2.default).post('/api/thumbnail?url=' + _test_data.data.thumbnail.correctUrl).end(function (err, res) {
      res.should.have.property('body');
      res.should.have.status(401);
      done();
    });
  });
  (0, _mocha.it)('should not authenticate if invalid jwt token is provided', function (done) {
    _chai2.default.request(_app2.default).post('/api/thumbnail?url=' + _test_data.data.thumbnail.correctUrl).set('Authorization', _test_data.data.authorization.inValidToken).end(function (err, res) {
      res.should.have.property('body');
      res.should.have.status(401);
      done();
    });
  });
  (0, _mocha.it)('should return thumbnail image if URL does not contains image', function (done) {
    _chai2.default.request(_app2.default).post('/api/thumbnail?url=' + _test_data.data.thumbnail.incorrectImg).set('Authorization', _test_data.data.authorization.validToken).end(function (err, res) {
      res.should.have.property('body');
      res.should.have.status(400);
      done();
    });
  });
  (0, _mocha.it)('should return error if image url is incorrect', function (done) {
    _chai2.default.request(_app2.default).post('/api/thumbnail?url=' + _test_data.data.thumbnail.incorrectUrl).set('Authorization', _test_data.data.authorization.validToken).end(function (err, res) {
      res.should.have.property('body');
      res.should.have.status(400);
      done();
    });
  });
  (0, _mocha.it)('should return error if image url is not provided', function (done) {
    _chai2.default.request(_app2.default).post('/api/thumbnail').set('Authorization', _test_data.data.authorization.validToken).end(function (err, res) {
      res.should.have.property('body');
      res.should.have.status(400);
      done();
    });
  });
  (0, _mocha.it)('should return error if image is broken', function (done) {
    _chai2.default.request(_app2.default).post('/api/thumbnail?url=' + _test_data.data.thumbnail.brokenImg).set('Authorization', _test_data.data.authorization.validToken).end(function (err, res) {
      res.should.have.property('body');
      res.should.have.status(400);
      done();
    });
  });
  (0, _mocha.it)('should return error if image size exceeds 100MB', function (done) {
    _chai2.default.request(_app2.default).post('/api/thumbnail?url=' + _test_data.data.thumbnail.largeImg).set('Authorization', _test_data.data.authorization.validToken).end(function (err, res) {
      res.should.have.property('body');
      res.should.have.status(400);
      done();
    });
  });
});

(0, _mocha.describe)('Json Patch', function () {
  (0, _mocha.it)('should return a patched json if correct data is provided', function (done) {
    _chai2.default.request(_app2.default).post('/api/patch').send({
      document: _test_data.data.json_patch.document,
      operation: _test_data.data.json_patch.validOperation
    }).set('Authorization', _test_data.data.authorization.validToken).end(function (err, res) {
      res.should.have.status(200);
      res.body.should.have.a.property('firstName', 'Joachim');
      res.body.should.have.a.property('lastName', 'Wester');
      res.body.should.have.deep.nested.property('contactDetails.phoneNumbers', [{ 'number': '555-123' }]);
      done();
    });
  });
  (0, _mocha.it)('should not authenticate if jwt token is not provided', function (done) {
    _chai2.default.request(_app2.default).post('/api/patch').send({
      document: _test_data.data.json_patch.document,
      patch: _test_data.data.json_patch.validPatch
    }).end(function (err, res) {
      res.should.have.status(401);
      res.body.should.have.a.property('message');
      done();
    });
  });
  (0, _mocha.it)('should not authenticate if invalid jwt token is provided', function (done) {
    _chai2.default.request(_app2.default).post('/api/patch').send({
      document: _test_data.data.json_patch.document,
      patch: _test_data.data.json_patch.validPatch
    }).set('Authorization', _test_data.data.authorization.inValidToken).end(function (err, res) {
      res.should.have.status(401);
      res.body.should.have.a.property('message');
      done();
    });
  });
  (0, _mocha.it)('should return error if document/patch is not provided', function (done) {
    _chai2.default.request(_app2.default).post('/api/patch').send({
      document: _test_data.data.json_patch.document
    }).set('Authorization', _test_data.data.authorization.validToken).end(function (err, res) {
      res.should.have.status(400);
      res.body.should.have.a.property('message');
      done();
    });
  });
  (0, _mocha.it)('should return error if patch is invalid', function (done) {
    _chai2.default.request(_app2.default).post('/api/patch').send({
      document: _test_data.data.json_patch.document,
      patch: _test_data.data.json_patch.invalidPatch
    }).set('Authorization', _test_data.data.authorization.validToken).end(function (err, res) {
      res.should.have.status(400);
      res.body.should.have.a.property('message');
      done();
    });
  });
});