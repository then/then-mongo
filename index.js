'use strict';

var mongojs = require('mongojs');
var Database = require('./lib/database');

// ObjectId
module.exports = function(connString, cols, options) {
  var connection = mongojs.apply(null, arguments);
  var db = new Database(connection);
  cols = cols || [];
  cols.forEach(function(colName) {
    db[colName] = db.collection(colName);

    var parts = colName.split('.');

    var last = parts.pop();
    var parent = parts.reduce(function(parent, prefix) {
      parent[prefix] = parent[prefix] || {};
      return parent[prefix];
    }, db);

    parent[last] = db.collection(colName);
  });
  return db;
};

module.exports.default = module.exports;

// expose bson stuff visible in the shell
module.exports.Binary = mongojs.Binary;
module.exports.Code = mongojs.Code;
module.exports.DBRef = mongojs.DBRef;
module.exports.Double = mongojs.Double;
module.exports.Long = mongojs.Long;
module.exports.MinKey = mongojs.MinKey;
module.exports.MaxKey = mongojs.MaxKey;
module.exports.ObjectID = mongojs.ObjectID;
module.exports.Symbol = mongojs.Symbol;
module.exports.Timestamp = mongojs.Timestamp;
