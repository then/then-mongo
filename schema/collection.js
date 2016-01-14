module.exports = {
  methods: {
    find: {
      args: [{name: 'query', default: {}}, {name: 'projection', default: null}, {name: 'opts', default: null}],
      returns: 'Cursor',
      proxy: true
    },
    findOne: {
      args: [{name: 'query', default: {}}, {name: 'projection', default: null}],
      returns: 'Promise<Object>'
    },
    findAndModify: {
      args: [{name: 'opts'}],
      returns: 'Promise'
    },
    count: {
      args: [{name: 'query', default: {}}],
      returns: 'Promise<number>'
    },
    distinct: {
      args: [{name: 'field'}, {name: 'query'}],
      returns: 'Promise<Array<Object>>'
    },
    insert: {
      args: [{name: 'docOrDocs'}, {name: 'opts', default: {}}],
      returns: 'Promise<Array<Object>|Object>'
    },
    update: {
      args: [{name: 'query'}, {name: 'update'}, {name: 'opts', default: {}}],
      returns: 'Promise<Object>'
    },
    save: {
      args: [{name: 'doc'}, {name: 'opts', default: {}}],
      returns: 'Promise<Object>'
    },
    remove: {
      args: [{name: 'query', default: {}}, {name: 'opts', default: {justOne: false}}],
      returns: 'Promise<Object>'
    },
    rename: {
      args: [{name: 'name'}, {name: 'opts', default: {}}],
      returns: 'Promise'
    },
    drop: {
      args: [],
      returns: 'Promise'
    },
    stats: {
      args: [],
      returns: 'Promise'
    },
    mapReduce: {
      args: [{name: 'map'}, {name: 'reduce'}, {name: 'opts', default: {}}],
      returns: 'Promise<any>'
    },
    runCommand: {
      args: [{name: 'cmd'}, {name: 'opts', default: {}}],
      returns: 'Promise<any>'
    },
    toString: {
      args: [],
      returns: 'string'
    },
    dropIndexes: {
      args: [],
      returns: 'Promise'
    },
    dropIndex: {
      args: [{name: 'index'}],
      returns: 'Promise'
    },
    createIndex: {
      args: [{name: 'index'}, {name: 'opts', default: {}}],
      returns: 'Promise'
    },
    ensureIndex: {
      args: [{name: 'index'}, {name: 'opts', default: {}}],
      returns: 'Promise'
    },
    getIndexes: {
      args: [],
      returns: 'Promise<Array>'
    },
    reIndex: {
      args: [],
      returns: 'Promise'
    },
    isCapped: {
      args: [],
      returns: 'Promise<boolean>'
    },
    group: {
      args: [{name: 'doc'}],
      returns: 'Promise<Array<Object>>'
    },
    aggregate: {
      args: [{name: 'pipeline', rest: true}], // or (pipeline: Array, opts: Object)
      returns: 'Cursor',
      proxy: true
    },
    initializeOrderedBulkOp: {
      args: [],
      returns: 'Bulk',
      proxy: true
    },
    initializeUnorderedBulkOp: {
      args: [],
      returns: 'Bulk',
      proxy: true
    }
  }
};
