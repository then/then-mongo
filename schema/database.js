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
      desc: 'Get a collection by name',
      args: [{name: 'colName', type: 'string'}],
      returns: 'Collection',
      proxy: true
    },
    close: {
      desc: 'Close the database connection',
      args: [{name: 'force', type: 'boolean', default: false}],
      returns: 'Promise<void>'
    },
    runCommand: {
      desc: 'Execute a command',
      args: [{name: 'command', type: 'string | Object'}],
      returns: 'Promise<any>'
    },
    listCollections: {
      desc: 'Get a list of collections with info about each one',
      args: [],
      returns: 'Promise<Array<Object>>'
    },
    getCollectionNames: {
      desc: 'Get a list of all the collections',
      args: [],
      returns: 'Promise<Array<string>>'
    },
    createCollection: {
      desc: 'Create a collection by name',
      args: [{name: 'name', type: 'string'}, {name: 'opts', default: {}, type: 'Object'}],
      returns: 'Promise<void>'
    },
    stats: {
      args: [{name: 'scale', default: 1, type: 'number'}],
      returns: 'Promise<Object>'
    },
    dropDatabase: {
      args: [],
      returns: 'Promise<void>'
    },
    createUser: {
      args: [{name: 'usr', type: 'Object'}],
      returns: 'Promise<void>',
      aliases: ['addUser']
    },
    dropUser: {
      args: [{name: 'username', type: 'string'}],
      returns: 'Promise<void>',
      aliases: ['removeUser']
    },
    eval: {
      args: [{name: 'fn', type: 'Function | string'}, {name: 'args', rest: true, type: 'Array<any>'}],
      returns: 'Promise<any>'
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