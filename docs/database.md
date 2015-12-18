# Database

## Events

Database is an event emitter that emits the following events:
 - `error` - Emitted if there is an error during connection with the error as its argument
 - `connect` - Emitted once the connection has been established
 - `close` - Emitted when the connection is forcibly closed

## Properties

Each instance of Database has the following properties:
 - `ObjectId` - Constructor for making ObjectIds from strings

## Methods

### database.collection(colName)

Returns [`Collection`](collection.md)

### database.close(force = false)

Returns [`Promise`](https://www.promisejs.org/api/)

### database.runCommand(opts)

Returns [`Promise<any>`](https://www.promisejs.org/api/)

### database.listCollections()

Returns [`Promise<Array<Object>>`](https://www.promisejs.org/api/)

### database.getCollectionNames()

Returns [`Promise<Array<string>>`](https://www.promisejs.org/api/)

### database.createCollection(name, opts = {})

Returns [`Promise`](https://www.promisejs.org/api/)

### database.stats(scale = 1)

Returns [`Promise<Object>`](https://www.promisejs.org/api/)

### database.dropDatabase()

Returns [`Promise`](https://www.promisejs.org/api/)

### database.createUser(usr)

Returns [`Promise`](https://www.promisejs.org/api/)

### database.dropUser(username)

Returns [`Promise`](https://www.promisejs.org/api/)

### database.eval(fn, ...args)

Returns [`Promise`](https://www.promisejs.org/api/)

### database.getLastErrorObj()

Returns [`Promise<Object>`](https://www.promisejs.org/api/)

### database.getLastError()

Returns [`Promise<string>`](https://www.promisejs.org/api/)

### database.toString()

Returns `string`

### database._getConnection()

Returns [`Promise`](https://www.promisejs.org/api/)

