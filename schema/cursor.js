module.exports = {
  readableStream: true,
  methods: {
    pipe: {
      args: [{name: 'stream'}, {name: 'opts'}],
      returns: 'Stream'
    },
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
    // TODO: forEach
    // TODO: ['batchSize', 'hint', 'limit', 'maxTimeMS', 'max', 'min', 'skip', 'snapshot', 'sort']
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
    }
    // TODO: destroy
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
    args: [{name: 'obj'}],
    returns: 'this'
  };
});