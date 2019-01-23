module.exports = {
  methods: {
    find: {
      args: [
        {name: 'query', default: {}},
        {name: 'projection', default: null},
        {name: 'opts', default: null},
      ],
      returns: 'Cursor',
      proxy: true,
    },
    findOne: {
      args: [{name: 'query', default: {}}, {name: 'projection', default: null}],
      returns: 'Promise<Object>',
    },
    findAndModify: {
      args: [{name: 'opts'}],
      returns: 'Promise<any>',
    },
    count: {
      args: [{name: 'query', default: {}}],
      returns: 'Promise<number>',
    },
    distinct: {
      args: [{name: 'field'}, {name: 'query'}],
      returns: 'Promise<Array<Object>>',
    },
    insert: {
      args: [{name: 'docOrDocs'}, {name: 'opts', default: {}}],
      returns: 'Promise<Array<Object>|Object>',
    },
    update: {
      args: [{name: 'query'}, {name: 'update'}, {name: 'opts', default: {}}],
      returns: 'Promise<Object>',
    },
    save: {
      args: [{name: 'doc'}, {name: 'opts', default: {}}],
      returns: 'Promise<Object>',
    },
    remove: {
      args: [
        {name: 'query', default: {}},
        {name: 'opts', default: {justOne: false}},
      ],
      returns: 'Promise<Object>',
    },
    rename: {
      args: [{name: 'name'}, {name: 'opts', default: {}}],
      returns: 'Promise<void>',
    },
    drop: {
      args: [],
      returns: 'Promise<void>',
    },
    stats: {
      args: [],
      returns: 'Promise<any>',
    },
    mapReduce: {
      args: [{name: 'map'}, {name: 'reduce'}, {name: 'opts', default: {}}],
      returns: 'Promise<any>',
    },
    runCommand: {
      args: [{name: 'cmd'}, {name: 'opts', default: {}}],
      returns: 'Promise<any>',
    },
    toString: {
      args: [],
      returns: 'string',
    },
    dropIndexes: {
      args: [],
      returns: 'Promise<void>',
    },
    dropIndex: {
      args: [{name: 'index'}],
      returns: 'Promise<void>',
    },
    createIndex: {
      args: [{name: 'index'}, {name: 'opts', default: {}}],
      returns: 'Promise<void>',
    },
    ensureIndex: {
      args: [{name: 'index'}, {name: 'opts', default: {}}],
      returns: 'Promise<void>',
    },
    getIndexes: {
      args: [],
      returns: 'Promise<Array<Object>>',
    },
    reIndex: {
      args: [],
      returns: 'Promise<void>',
    },
    isCapped: {
      args: [],
      returns: 'Promise<boolean>',
    },
    group: {
      args: [{name: 'doc'}],
      returns: 'Promise<Array<Object>>',
    },
    aggregate: {
      args: [{name: 'pipeline', rest: true}], // or (pipeline: Array, opts: Object)
      returns: 'Cursor',
      proxy: true,
    },
    initializeOrderedBulkOp: {
      args: [{name: 'opts', default: {}}],
      returns: 'Bulk',
      proxy: true,
    },
    initializeUnorderedBulkOp: {
      args: [{name: 'opts', default: {}}],
      returns: 'Bulk',
      proxy: true,
    },
  },
};
