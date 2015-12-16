module.exports = {
  methods: {
    find: {
      args: [{name: 'query'}],
      returns: '{upsert(), remove(), removeOne(), update(updateObj), updateOne(updateObj), replaceOne(updObj)}'
    },
    insert: {
      args: [{name: 'doc'}],
      returns: 'void'
    },
    tojson: {
      args: [],
      returns: 'Object'
    },
    toString: {
      args: [],
      returns: 'Object'
    },
    execute: {
      args: [],
      returns: 'Promise'
    }
  }
};