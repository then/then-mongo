'use strict'

var mongojs = require('mongojs');
var Promise = require('promise');
var Database = require('./lib/database');

// ObjectId
module.exports = function (connString, cols, options) {
  var connection = mongojs.apply(null, arguments);
  var db = new Database(connection);
  cols = cols || [];
  cols.forEach(function (colName) {
    db[colName] = db.collection(colName);

    var parts = colName.split('.');

    var last = parts.pop();
    var parent = parts.reduce(function (parent, prefix) {
      parent[prefix] = parent[prefix] || {};
      return parent[prefix];
    }, db);

    parent[last] = db.collection(colName);
  })
  return db;
};