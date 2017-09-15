'use strict';

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _fastJsonPatch = require('fast-json-patch');

var _fs = require('fs');

var _path = require('path');

var _api = require('../utils/api.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * This function returns updated JSON document after performing given operations
 * @name Patch
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @return {json} updated JSON document
 */
exports.patch = function (req, res, next) {
  if (typeof req.body.document !== 'undefined' && typeof req.body.operation !== 'undefined') {
    var document = req.body.document;
    var operation = req.body.operation;
    var output = (0, _fastJsonPatch.applyPatch)(document, operation).newDocument;
    res.json(output);
  } else {
    var err = new Error();
    err.statusCode = 400;
    err.message = 'JSON document or patch is missing';
    next(err);
  }
};
/**
 * This function returns thumbnail of 50*50 pixel of given image
 * @name Thumbnail
 * @param {object} req public URL of image
 * @param {object} res 50*50 pixel thumbnail image
 * @param {function} next
 */
exports.thumbnail = function (req, res, next) {
  if (typeof req.query.url !== 'undefined') {
    var imageUrl = req.query.url;
    _request2.default.head(imageUrl).on('response', function (response) {
      var contentHeader = response.headers['content-type'];
      var contentType = contentHeader.substring(0, 5);
      var imgFormat = contentHeader.substring(6);
      if (response.statusCode === 200 && contentType === 'image') {
        if (response.headers['content-length'] <= 100 * 1024 * 1024) {
          var date = Math.floor(new Date());
          var imgLocation = (0, _path.resolve)((0, _path.join)(baseDirectory, 'img')) + '/original_' + date + '.' + imgFormat;
          var thumbnailLocation = (0, _path.resolve)((0, _path.join)(baseDirectory, 'img')) + '/thumbnail_' + date + '.' + imgFormat;
          var stream = _request2.default.get(imageUrl).pipe((0, _fs.createWriteStream)(imgLocation));
          stream.on('finish', function () {
            (0, _api.resizeImage)(imgLocation, thumbnailLocation, function (err, out) {
              if (err) {
                next(err);
              } else {
                res.writeHead(200, { 'content-type': contentHeader, 'Connection': 'close' });
                res.end((0, _fs.readFileSync)(thumbnailLocation), 'binary');
              }
            });
          });
        } else {
          var err = new Error();
          err.statusCode = 400;
          err.message = 'Image size exceeds 100MB';
          next(err);
        }
      } else {
        var _err = new Error();
        _err.statusCode = 400;
        _err.message = 'Image not found';
        next(_err);
      }
    }).on('error', function (err) {
      err.statusCode = 400;
      next(err);
    });
  } else {
    var err = new Error();
    err.statusCode = 400;
    err.message = 'No URL found';
    next(err);
  }
};