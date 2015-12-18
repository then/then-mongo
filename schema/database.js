module.exports = {
  eventEmitter: true,
  events: [
    {name: 'error', desc: 'Emitted if there is an error during connection with the error as its argument'},
    {name: 'connect', desc: 'Emitted once the connection has been established'},
    {name: 'close', desc: 'Emitted when the connection is forcibly closed'}
  ],
  properties: [
    {name: 'ObjectId', desc: 'Constructor for making ObjectIds from strings'}
  ],
  methods: {
    collection: {
      args: [{name: 'colName'}],
      returns: 'Collection',
      proxy: true
    },
    close: {
      args: [{name: 'force', default: false}],
      returns: 'Promise'
    },
    runCommand: {
      args: [{name: 'opts'}],
      returns: 'Promise<any>'
    },
    listCollections: {
      args: [],
      returns: 'Promise<Array<Object>>'
    },
    getCollectionNames: {
      args: [],
      returns: 'Promise<Array<string>>'
    },
    createCollection: {
      args: [{name: 'name'}, {name: 'opts', default: {}}],
      returns: 'Promise'
    },
    stats: {
      args: [{name: 'scale', default: 1}],
      returns: 'Promise<Object>'
    },
    dropDatabase: {
      args: [],
      returns: 'Promise'
    },
    createUser: {
      args: [{name: 'usr'}],
      returns: 'Promise',
      aliases: ['addUser']
    },
    dropUser: {
      args: [{name: 'username'}],
      returns: 'Promise',
      aliases: ['removeUser']
    },
    eval: {
      args: [{name: 'fn'}, {name: 'args', rest: true}],
      returns: 'Promise'
    },
    getLastErrorObj: {
      args: [],
      returns: 'Promise<Object>'
    },
    getLastError: {
      args: [],
      returns: 'Promise<string>'
    },
    toString: {
      args: [],
      returns: 'string'
    },
    _getConnection: {
      args: [],
      returns: 'Promise',
      aliases: ['getConnection']
    }
  }
};