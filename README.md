# then-mongo

Promise based mongo driver built on mongojs

[![Build Status](https://img.shields.io/travis/then/then-mongo/master.svg)](https://travis-ci.org/then/then-mongo)
[![Dependency Status](https://img.shields.io/david/then/then-mongo.svg)](https://david-dm.org/then/then-mongo)
[![NPM version](https://img.shields.io/npm/v/then-mongo.svg)](https://www.npmjs.com/package/then-mongo)

## Installation

    npm install then-mongo

## Usage

Emulates the [offical mongo api](https://docs.mongodb.org/manual/reference/method/) as far as is possible, except that the result of every operation is a promise, rather than being synchronous.

```js
var mongo = require('then-mongo');
var db = mongo('connection-string', ['collectionA', 'collectionB']);

db.collectionA.find().skip(5).limit(10)
  .done(function (results) {
    console.dir(results);
  });
```

## API

Exports a function `connect(connectionString, collections?, options?)` and returns an instance of [Database](docs/database.md).  If you pass in a list of collection names, then you can access each [Collection](docs/collection.md) as a property of the [Database](docs/database.md) instance.

## License

  MIT
