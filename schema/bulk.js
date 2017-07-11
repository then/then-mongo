module.exports = {
  methods: {
    find: {
      args: [{name: 'query'}],
      returns: '{upsert(): any, remove(): any, removeOne(): any, update(updateObj: any): any, updateOne(updateObj: any): any, replaceOne(updObj: any): any}'
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
      returns: 'Promise<any>'
    }
  }
};