/**
 * WARNING: This file is autogenerated by `build.js` from in `/schema/`collection.js
 */

import Promise = require("promise");
import Bulk from './bulk';
import Cursor from './cursor';

export default class Collection {
  find(query?: any, projection?: any, opts?: any): Cursor
  findOne(query?: any, projection?: any): Promise<Object>
  findAndModify(opts: any): Promise<any>
  count(query?: any): Promise<number>
  distinct(field: any, query: any): Promise<Array<Object>>
  insert(docOrDocs: any, opts?: any): Promise<Array<Object>|Object>
  update(query: any, update: any, opts?: any): Promise<Object>
  save(doc: any, opts?: any): Promise<Object>
  remove(query?: any, opts?: any): Promise<Object>
  rename(name: any, opts?: any): Promise<void>
  drop(): Promise<void>
  stats(): Promise<any>
  mapReduce(map: any, reduce: any, opts?: any): Promise<any>
  runCommand(cmd: any, opts?: any): Promise<any>
  toString(): string
  dropIndexes(): Promise<void>
  dropIndex(index: any): Promise<void>
  createIndex(index: any, opts?: any): Promise<void>
  ensureIndex(index: any, opts?: any): Promise<void>
  getIndexes(): Promise<Array<Object>>
  reIndex(): Promise<void>
  isCapped(): Promise<boolean>
  group(doc: any): Promise<Array<Object>>
  aggregate(pipeline: any): Cursor
  initializeOrderedBulkOp(opts?: any): Bulk
  initializeUnorderedBulkOp(opts?: any): Bulk
}