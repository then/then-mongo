# mongod

Promise based mongo driver built on mongojs

[![Build Status](https://travis-ci.org/then/mongod.png?branch=master)](https://travis-ci.org/then/mongod)
[![Dependency Status](https://gemnasium.com/then/mongod.png)](https://gemnasium.com/then/mongod)
[![NPM version](https://badge.fury.io/js/mongod.png)](http://badge.fury.io/js/mongod)

## Installation

    npm install mongod

## API

Emulates the [offical mongo api](http://docs.mongodb.org/manual/) as far as is possible, except that the result of every operation is a promise, rather than being synchronous.

```js
var mongo = require('mongod')
var db = mongo('connection-string', ['collectionA', 'collectionB'])
db.collectionA.find().skip(5).limit(10)
  .then(function (results) {
    console.dir(results)
  }).done()
```

## License

  MIT