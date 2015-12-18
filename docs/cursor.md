# Cursor

The Cursor is both a [ReadableStream](https://nodejs.org/api/stream.html#stream_class_stream_readable) and a [Promise](https://www.promisejs.org/api/).  It won't make any requests until you start reading form it though.  You can call `cursor.toArray()` to make the request immediately and return a [Promise](https://www.promisejs.org/api/) if you want to pre-populate a cache.

## Methods

### cursor.next()

Returns [`Promise<Object>`](https://www.promisejs.org/api/)

### cursor.rewind()

Returns [`Promise<any>`](https://www.promisejs.org/api/)

### cursor.toArray()

Returns [`Promise<Array<Object>>`](https://www.promisejs.org/api/)

### cursor.map(mapfn)

Returns [`Promise<Array<any>>`](https://www.promisejs.org/api/)

### cursor.forEach(fn)

Returns `void`

### cursor.count()

Returns [`Promise<number>`](https://www.promisejs.org/api/)

### cursor.size()

Returns [`Promise<number>`](https://www.promisejs.org/api/)

### cursor.explain()

Returns [`Promise<Object>`](https://www.promisejs.org/api/)

### cursor.destroy()

Returns `void`

### cursor.batchSize(obj)

Returns `this`

### cursor.hint(obj)

Returns `this`

### cursor.limit(obj)

Returns `this`

### cursor.maxTimeMS(obj)

Returns `this`

### cursor.max(obj)

Returns `this`

### cursor.min(obj)

Returns `this`

### cursor.skip(obj)

Returns `this`

### cursor.snapshot(obj)

Returns `this`

### cursor.sort(obj)

Returns `this`

