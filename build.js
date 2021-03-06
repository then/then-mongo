'use strict';

var fs = require('fs');
var rimraf = require('rimraf').sync;
var mkdirp = require('mkdirp').sync;

var EVENT_EMITTER_METHODS = [
  'addListener',
  'emit',
  'getMaxListeners',
  'listenerCount',
  'listeners',
  'on',
  'once',
  'removeAllListeners',
  'removeListener',
  'setMaxListeners',
];
var READABLE_STREAM_METHODS = [
  'isPaused',
  'pause',
  'pipe',
  'read',
  'resume',
  'setEncoding',
  'unpipe',
  'unshift',
];
var PROMISE_METHODS = ['catch', 'done', 'finally', 'nodeify', 'then'];

rimraf(__dirname + '/lib');
mkdirp(__dirname + '/lib');

fs.writeFileSync(
  __dirname + '/lib/README.md',
  '**WARNING:** This folder is autogenerated by `build.js` from the files in `/schema`',
);

const classes = [];
fs.readdirSync(__dirname + '/schema').forEach(function(type) {
  var schema = require('./schema/' + type);
  var proxy = [];
  var typedef = [];
  var both = {
    push(str) {
      proxy.push(str);
      typedef.push(str);
    },
  };
  both.push('/**');
  both.push(
    ' * WARNING: This file is autogenerated by `build.js` from in `/schema/`' +
      type,
  );
  both.push(' */');
  both.push('');
  proxy.push('var Promise = require("promise");');
  typedef.push('import Promise = require("promise");');

  if (schema.methods) {
    Object.keys(schema.methods)
      .filter(function(method) {
        return schema.methods[method].proxy;
      })
      .map(function(method) {
        return schema.methods[method].returns;
      })
      .filter(function(name, index, arr) {
        return arr.indexOf(name) === index;
      })
      .sort()
      .forEach(function(name) {
        proxy.push(
          'var ' + name + ' = require("./' + name.toLowerCase() + '");',
        );
        typedef.push(`import ${name} from './${name.toLowerCase()}';`);
      });
  }

  both.push('');
  var className = type[0].toUpperCase() + type.substr(1).replace(/\.js$/, '');
  classes.push({className, type});
  proxy.push('module.exports = ' + className + ';');
  proxy.push('function ' + className + '(_parent) {');
  proxy.push('  this._parent = _parent;');
  typedef.push(`export default class ${className} {`);
  var defaultValueForLazyPromise = Object.keys(schema.methods).filter(function(
    method,
  ) {
    return schema.methods[method].defaultValueForLazyPromise;
  });
  if (defaultValueForLazyPromise.length > 1) {
    throw new Error(
      'You cannot have multiple default methods for lazy promise',
    );
  }
  if (defaultValueForLazyPromise.length === 1) {
    defaultValueForLazyPromise = defaultValueForLazyPromise[0];
  } else {
    defaultValueForLazyPromise = null;
  }
  if (defaultValueForLazyPromise) {
    proxy.push('  this._promise = null;');
  }
  if (schema.properties) {
    schema.properties.forEach(function(property) {
      if (process.argv.indexOf('--test') !== -1) {
        proxy.push(
          '  if (typeof _parent.' +
            property.name +
            ' === "undefined") throw new Error("Missing required property ' +
            property.name +
            '");',
        );
      }
      proxy.push(
        '  this.' + property.name + ' = _parent.' + property.name + ';',
      );
    });
  }
  if (schema.methods && process.argv.indexOf('--test') !== -1) {
    Object.keys(schema.methods).forEach(function(method) {
      proxy.push(
        '  if (typeof _parent.' +
          method +
          ' !== "function") throw new Error("Missing required method ' +
          method +
          '");',
      );
    });
  }
  if (schema.methods) {
    Object.keys(schema.methods).forEach(function(name) {
      if (name[0] === '_') {
        return;
      }
      const method = schema.methods[name];
      const args = method.args
        .map(arg => {
          return `${arg.name}${'default' in arg ? '?' : ''}: ${arg.type ||
            'any'}`;
        })
        .join(', ');
      if (method.desc) {
        typedef.push(`  /**`);
        typedef.push(`   * ${method.desc}`);
        typedef.push(`   */`);
      }
      typedef.push(`  ${name}(${args}): ${method.returns}`);
    });
  }
  proxy.push('}');
  proxy.push('');
  if (schema.methods) {
    Object.keys(schema.methods).forEach(function(method) {
      var args = schema.methods[method].args.slice();
      var rest;
      if (args.length && args[args.length - 1].rest) {
        rest = args.pop();
      }
      proxy.push(
        className +
          '.prototype.' +
          method +
          ' = function ' +
          method +
          '(' +
          args
            .map(function(arg) {
              return arg.name;
            })
            .join(', ') +
          ') {',
      );
      if (schema.methods[method].proxy) {
        if (rest) {
          proxy.push(
            '  return new ' +
              schema.methods[method].returns +
              '(this._parent.' +
              method +
              '.apply(this._parent, arguments));',
          );
        } else {
          proxy.push(
            '  return new ' +
              schema.methods[method].returns +
              '(this._parent.' +
              method +
              '(' +
              args.map(argValue).join(', ') +
              '));',
          );
        }
      } else if (/^Promise/.test(schema.methods[method].returns)) {
        proxy.push('  var _parent = this._parent');
        if (rest) {
          proxy.push('  var _args = [];');
          proxy.push('  for (var i = 0; i < arguments.length; i++) {');
          proxy.push('    _args.push(arguments[i]);');
          proxy.push('  }');
        }
        if (defaultValueForLazyPromise === method) {
          proxy.push('  if (this._promise) return this._promise;');
          proxy.push(
            '  return this._promise = new Promise(function (resolve, reject) {',
          );
        } else {
          proxy.push('  return new Promise(function (resolve, reject) {');
        }
        var cb = 'function (err, res) { err ? reject(err) : resolve(res) }';
        if (rest) {
          proxy.push('    _args.push(' + cb + ');');
          proxy.push('    _parent.' + method + '.apply(_parent, _args);');
        } else {
          proxy.push(
            '    _parent.' +
              method +
              '(' +
              args
                .map(argValue)
                .concat(cb)
                .join(', ') +
              ');',
          );
        }
        proxy.push('  });');
      } else {
        if (rest) {
          throw new Error('Unexpected rest args for sync function');
        }
        if (schema.methods[method].returns === 'this') {
          proxy.push(
            '  this._parent.' +
              method +
              '(' +
              args.map(argValue).join(', ') +
              ');',
          );
          proxy.push('  return this;');
        } else {
          proxy.push(
            '  return this._parent.' +
              method +
              '(' +
              args.map(argValue).join(', ') +
              ');',
          );
        }
      }
      proxy.push('};');
      if (schema.methods[method].aliases) {
        schema.methods[method].aliases.forEach(function(alias) {
          proxy.push(
            className +
              '.prototype.' +
              alias +
              ' = ' +
              className +
              '.prototype.' +
              method +
              ';',
          );
        });
      }
      proxy.push('');
    });
  }
  if (schema.events || schema.readableStream) {
    proxy.push('// Event Emitter');
    proxy.push('');
    EVENT_EMITTER_METHODS.forEach(function(method) {
      proxy.push(
        className + '.prototype.' + method + ' = function ' + method + '() {',
      );
      proxy.push(
        '  return this._parent.' + method + '.apply(this._parent, arguments);',
      );
      proxy.push('};');
      proxy.push('');
    });
  }
  if (schema.readableStream) {
    proxy.push('// Readable Stream');
    proxy.push('');
    READABLE_STREAM_METHODS.forEach(function(method) {
      proxy.push(
        className + '.prototype.' + method + ' = function ' + method + '() {',
      );
      proxy.push(
        '  return this._parent.' + method + '.apply(this._parent, arguments);',
      );
      proxy.push('};');
      proxy.push('');
    });
  }
  if (defaultValueForLazyPromise) {
    proxy.push('// Promise Methods');
    proxy.push('');
    PROMISE_METHODS.forEach(function(method) {
      proxy.push(className + '.prototype.' + method + ' = function () {');
      proxy.push('  var _promise = this.' + defaultValueForLazyPromise + '();');
      proxy.push(
        '  return _promise.' + method + '.apply(_promise, arguments);',
      );
      proxy.push('};');
      proxy.push('');
    });
  }

  typedef.push('}');
  fs.writeFileSync(__dirname + '/lib/' + type, proxy.join('\n'));
  fs.writeFileSync(
    __dirname + '/lib/' + type.replace(/\.js$/, '.d.ts'),
    typedef.join('\n'),
  );
});

function argValue(arg) {
  return 'default' in arg
    ? arg.name +
        ' === undefined ? ' +
        JSON.stringify(arg.default) +
        ' : ' +
        arg.name
    : arg.name;
}

const indexTypeDef = [];
const exportedVariables = [
  'Binary',
  'Code',
  'Double',
  'Long',
  'MinKey',
  'MaxKey',
  'ObjectID',
  'Timestamp',
];

indexTypeDef.push('/**');
indexTypeDef.push(' * WARNING: This file is autogenerated by `build.js`');
indexTypeDef.push(' */');
indexTypeDef.push('');

indexTypeDef.push(`import {${exportedVariables.join(', ')}} from 'mongodb';`);

classes.forEach(c => {
  indexTypeDef.push(
    `import ${c.className} from './lib/${c.type.replace(/\.js$/, '')}';`,
  );
});
indexTypeDef.push(``);
indexTypeDef.push(`export {${classes.map(c => c.className).join(', ')}};`);
indexTypeDef.push(``);
indexTypeDef.push(`/**`);
indexTypeDef.push(` * Connect to a database`);
indexTypeDef.push(` */`);
indexTypeDef.push(
  `declare function connect(connString: string, collectionNames?: Array<string>, options?: Object): Database;`,
);
indexTypeDef.push(`export default connect;`);
indexTypeDef.push(``);
indexTypeDef.push(`export {${exportedVariables.join(', ')}};`);
indexTypeDef.push(``);

fs.writeFileSync(__dirname + '/index.d.ts', indexTypeDef.join('\n'));
