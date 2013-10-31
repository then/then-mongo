'use strict'

var mongojs = require('mongojs')
var Promise = require('promise')

function denodeify(proto, method) {
  proto[method] = Promise.denodeify(proto[method])
}

function mixinPromise(proto, fn) {
  proto.then = function (onFulfilled, onRejected) {
    var self = this
    var res = new Promise(function (resolve, reject) {
      fn(self, function (err, res) {
        if (err) reject(err)
        else resolve(res)
      })
    })
    return res.then.apply(res, arguments)
  }
  Object.keys(Promise.prototype)
    .forEach(function (key) {
      if (!(key in proto)) {
        proto[key] = Promise.prototype[key]
      }
    })
}


/* Fix Cursor */

var Cursor = mongojs.Cursor

mixinPromise(Cursor.prototype, function (self, cb) {
  return self.toArray(cb)
})
var cursorTerminators = [
  'count',
  'explain',
  'close'
];
cursorTerminators.forEach(function (key) {
  denodeify(Cursor.prototype, key)
})

/* Fix Collection */

var Collection = mongojs.Collection

Object.keys(Collection.prototype)
  .forEach(function (key) {
    if (key !== 'find' && key[0] != '_' && typeof Collection.prototype[key] === 'function') {
      denodeify(Collection.prototype, key)
    }
  })

/* Fix Database */

var Database = mongojs.Database

Object.keys(Database.prototype)
  .forEach(function (key) {
    if (key !== 'removeAllEventListeners' && key !== 'collection' && key[0] != '_' && typeof Database.prototype[key] === 'function') {
      denodeify(Database.prototype, key)
    }
  })

module.exports = mongojs