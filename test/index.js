'use strict';

var assert = require('assert');
var test = require('testit');
const withContainer = require('@databases/with-container');
var mongo = require('../');

const images = {
  MONGO_3: 'mongo:3.6.10-stretch',
  MONGO_4: 'mongo:4.1.7-xenial',
};
const versions = {
  MONGO_3: [3, 6, 10, 0],
  MONGO_4: [4, 1, 7, 0],
};
const DEFAULT_PORT = 27017;
const MONGO_INITDB_DATABASE = 'database';

async function getConnectionString(envName, image) {
  if (process.env[envName]) {
    return {CONNECTION_STRING: process.env[envName], kill: async () => {}};
  }
  const {kill, externalPort} = await withContainer.default({
    image,
    containerName: 'then-mongo-test',
    defaultExternalPort: DEFAULT_PORT,
    internalPort: DEFAULT_PORT,
    connectTimeoutSeconds: 30,
    environment: {
      MONGO_INITDB_DATABASE,
    },
  });
  const CONNECTION_STRING = `mongodb://localhost:${externalPort}/${MONGO_INITDB_DATABASE}`;
  await new Promise(resolve => setTimeout(resolve, 5000));
  return {CONNECTION_STRING, kill};
}

Object.keys(images).forEach(async envName => {
  const image = images[envName];
  test(
    image,
    async () => {
      const {CONNECTION_STRING, kill} = await getConnectionString(
        envName,
        image,
      );
      var db;
      test(
        'connect',
        async () => {
          db = mongo(CONNECTION_STRING, ['values']);
          await db.getConnection();
        },
        {timeout: '10 seconds'},
      );

      test('add some records', async () => {
        await db.values.insert({value: 'a'});
        await db.values.insert({value: 'b'});
        await db.values.insert({value: 'c'});
        await db.values.insert({value: 'd'});
      });

      test('query some records', async () => {
        const results = await db.values.find();
        assert.deepEqual(results.map(r => r.value), ['a', 'b', 'c', 'd']);
      });

      test('getCollectionNames', async () => {
        const collectionNames = await db.getCollectionNames();
        assert(Array.isArray(collectionNames));
        assert(collectionNames.includes('values'));
      });
      test('limit', async () => {
        const results = await db.values.find().limit(2);
        assert.deepEqual(results.map(r => r.value), ['a', 'b']);
      });
      test('count', async () => {
        const count = await db.values.find().count();
        assert.strictEqual(count, 4);
      });

      test('version=' + versions[envName].slice(0, 3).join('.'), async () => {
        const {versionArray} = await db.runCommand({buildInfo: 1});
        assert.deepEqual(versionArray, versions[envName]);
      });

      test('db.close()', async () => {
        await db.close();
      });

      test('kill', () => kill());
    },
    {timeout: '4 minutes'},
  );
});
