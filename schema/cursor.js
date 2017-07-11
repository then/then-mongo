module.exports = {
  desc: (
    'The Cursor is both a [ReadableStream](https://nodejs.org/api/stream.html#stream_class_stream_readable) and a [Promise](https://www.promisejs.org/api/).  It won\'t make ' +
    'any requests until you start reading form it though.  You can call `cursor.toArray()` to make the request immediately and return a [Promise](https://www.promisejs.org/api/) if you want to pre-populate a cache.'
  ),
  readableStream: true,
  methods: {
    next: {
      args: [],
      returns: 'Promise<Object>'
    },
    rewind: {
      args: [],
      returns: 'Promise<any>'
    },
    toArray: {
      args: [],
      returns: 'Promise<Array<Object>>',
      defaultValueForLazyPromise: true
    },
    map: {
      args: [{name: 'mapfn'}],
      returns: 'Promise<Array<any>>'
    },
    // TODO: forEach should return a promise
    forEach: {
      args: [{name: 'fn'}],
      returns: 'void'
    },
    count: {
      args: [],
      returns: 'Promise<number>'
    },
    size: {
      args: [],
      returns: 'Promise<number>'
    },
    explain: {
      args: [],
      returns: 'Promise<Object>'
    },
    // TODO: destroy should return Promise
    destroy: {
      args: [],
      returns: 'void'
    }
  }
};
[
  'batchSize',
  'hint',
  'limit',
  'maxTimeMS',
  'max',
  'min',
  'skip',
  'snapshot',
  'sort'
].forEach(function (key) {
  module.exports.methods[key] = {
    args: [{name: 'obj', type: 'Object'}],
    returns: 'this'
  };
});