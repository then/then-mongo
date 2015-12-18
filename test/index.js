'use strict';

var assert = require('assert');
var test = require('testit');
var mongo = require('../')
var db = mongo('mongodb://read:read@ds063869.mongolab.com:63869/esdiscuss-clone', ['headers'])

test('connect', function () {
  return db.getConnection();
}, {timeout: '10 seconds'});

test('read only operation', function () {
  test('db.getCollectionNames', function () {
    return db.getCollectionNames().then(function (names) {
      assert(names.indexOf('contents') != -1);
      assert(names.indexOf('headers') != -1);
      assert(names.indexOf('history') != -1);
      assert(names.indexOf('messages') != -1);
      assert(names.indexOf('topics') != -1);
    });
  })
  test('db.collection("name").find().limit(10)', function () {
    return db.collection('headers').find().limit(10).then(function (headers) {
      assert(Array.isArray(headers));
      assert(headers.length === 10);
    });
  })
  test('db.collection("name").find().count()', function () {
    return db.headers.find().count().then(function (count) {
      assert(typeof count === 'number');
      assert(count > 0);
    });
  });
});

test('db.close()', function () {
  return db.close();
});