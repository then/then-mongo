var assert = require('assert')
var mongo = require('../')
var db = mongo('mongodb://read:read@ds031617.mongolab.com:31617/esdiscuss')

before(function (done) {
  this.timeout(10000)
  db._get(done)
})

describe('read only operation', function () {
  it('db.getCollectionNames', function (done) {
    db.getCollectionNames()
      .then(function (names) {
        assert(names.indexOf('contents') != -1)
        assert(names.indexOf('headers') != -1)
        assert(names.indexOf('history') != -1)
        assert(names.indexOf('messages') != -1)
        assert(names.indexOf('topics') != -1)
      })
      .nodeify(done)
  })
  it('db.collection("name").find().limit(10)', function (done) {
    db.collection('headers').find().limit(10)
      .then(function (headers) {
        assert(Array.isArray(headers))
        assert(headers.length === 10)
      })
      .nodeify(done)
  })
  it('db.collection("name").find().count()', function (done) {
    db.collection('headers').find().count()
      .then(function (count) {
        assert(typeof count === 'number');
        assert(count > 0);
      })
      .nodeify(done)
  })
})