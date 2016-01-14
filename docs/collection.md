# Collection

## Methods

### collection.find(query = {}, projection = null, opts = null)

Returns [`Cursor`](cursor.md)

### collection.findOne(query = {}, projection = null)

Returns [`Promise<Object>`](https://www.promisejs.org/api/)

### collection.findAndModify(opts)

Returns [`Promise`](https://www.promisejs.org/api/)

### collection.count(query = {})

Returns [`Promise<number>`](https://www.promisejs.org/api/)

### collection.distinct(field, query)

Returns [`Promise<Array<Object>>`](https://www.promisejs.org/api/)

### collection.insert(docOrDocs, opts = {})

Returns [`Promise<Array<Object>|Object>`](https://www.promisejs.org/api/)

### collection.update(query, update, opts = {})

Returns [`Promise<Object>`](https://www.promisejs.org/api/)

### collection.save(doc, opts = {})

Returns [`Promise<Object>`](https://www.promisejs.org/api/)

### collection.remove(query = {}, opts = {"justOne":false})

Returns [`Promise<Object>`](https://www.promisejs.org/api/)

### collection.rename(name, opts = {})

Returns [`Promise`](https://www.promisejs.org/api/)

### collection.drop()

Returns [`Promise`](https://www.promisejs.org/api/)

### collection.stats()

Returns [`Promise`](https://www.promisejs.org/api/)

### collection.mapReduce(map, reduce, opts = {})

Returns [`Promise<any>`](https://www.promisejs.org/api/)

### collection.runCommand(cmd, opts = {})

Returns [`Promise<any>`](https://www.promisejs.org/api/)

### collection.toString()

Returns `string`

### collection.dropIndexes()

Returns [`Promise`](https://www.promisejs.org/api/)

### collection.dropIndex(index)

Returns [`Promise`](https://www.promisejs.org/api/)

### collection.createIndex(index, opts = {})

Returns [`Promise`](https://www.promisejs.org/api/)

### collection.ensureIndex(index, opts = {})

Returns [`Promise`](https://www.promisejs.org/api/)

### collection.getIndexes()

Returns [`Promise<Array>`](https://www.promisejs.org/api/)

### collection.reIndex()

Returns [`Promise`](https://www.promisejs.org/api/)

### collection.isCapped()

Returns [`Promise<boolean>`](https://www.promisejs.org/api/)

### collection.group(doc)

Returns [`Promise<Array<Object>>`](https://www.promisejs.org/api/)

### collection.aggregate(...pipeline)

Returns [`Cursor`](cursor.md)

### collection.initializeOrderedBulkOp()

Returns [`Bulk`](bulk.md)

### collection.initializeUnorderedBulkOp()

Returns [`Bulk`](bulk.md)

