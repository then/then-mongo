/**
 * WARNING: This file is autogenerated by `build.js` from in `/schema/`database.js
 */

import Promise = require("promise");
import Collection from './collection';

export default class Database {
  /**
   * Get a collection by name
   */
  collection(colName: string): Collection
  /**
   * Close the database connection
   */
  close(force?: boolean): Promise<void>
  /**
   * Execute a command
   */
  runCommand(command: string | Object): Promise<any>
  /**
   * Get a list of collections with info about each one
   */
  listCollections(): Promise<Array<Object>>
  /**
   * Get a list of all the collections
   */
  getCollectionNames(): Promise<Array<string>>
  /**
   * Create a collection by name
   */
  createCollection(name: string, opts?: Object): Promise<void>
  stats(scale?: number): Promise<Object>
  dropDatabase(): Promise<void>
  createUser(usr: Object): Promise<void>
  dropUser(username: string): Promise<void>
  eval(fn: Function | string, args: Array<any>): Promise<any>
  getLastErrorObj(): Promise<Object>
  getLastError(): Promise<string>
  toString(): string
}