'use strict';

var fs = require('fs');
var babylon = require('babylon');
var chalk = require('chalk');
const {codeFrameColumns} = require('@babel/code-frame');

var errored = false;
function error(str, node, src) {
  console.log(chalk.red('   \u2717 ') + str);
  if (node && src) {
    console.log(codeFrameColumns(src, node.loc));
  }
  var err = new Error('whatever');
  err.stack
    .split('\n')
    .slice(1)
    .forEach(function(line) {
      console.log('       ' + line.trim());
    });
  errored = true;
}
function matchPattern(node, pattern) {
  var matched = {};
  var match;
  if (
    typeof pattern === 'string' &&
    (match = /^<([a-zA-Z]+)\>$/.exec(pattern))
  ) {
    matched[match[1]] = node;
    return matched;
  }
  if (typeof node !== typeof pattern) return false;
  if (node === pattern) return matched;
  if (Array.isArray(node) !== Array.isArray(pattern)) {
    return false;
  }
  if (Array.isArray(node)) {
    if (
      node.every(function(n, i) {
        var m = matchPattern(n, pattern[i]);
        if (m) {
          Object.keys(m).forEach(function(key) {
            matched[key] = m[key];
          });
        }
        return m;
      })
    ) {
      return matched;
    } else {
      return false;
    }
  }
  if (node && typeof node === 'object' && pattern) {
    if (
      Object.keys(pattern).every(function(key) {
        var res = matchPattern(node[key], pattern[key]);
        if (res) {
          Object.keys(res).forEach(function(name) {
            matched[name] = res[name];
          });
          return true;
        }
      })
    ) {
      return matched;
    }
    return false;
  }
}
fs.readdirSync(__dirname + '/schema').forEach(function(type) {
  var expectedSchema = require('./schema/' + type);
  var clsName = type[0].toUpperCase() + type.substr(1).replace(/\.js$/, '');
  console.log(chalk.magenta(' \u2022 ') + clsName);
  const src = fs.readFileSync(require.resolve('mongojs/lib/' + type), 'utf8');
  var ast = babylon.parse(src).program;
  var schema = {};
  var methods = [];
  if (clsName === 'Bulk') {
    methods.push('find');
  }
  if (clsName === 'Database') {
    methods.push('_getConnection');
  }
  var arrayName = null;
  var arrayValue = null;
  ast.body.forEach(function(node) {
    var match;
    if (
      (match = matchPattern(node, {
        type: 'ExpressionStatement',
        expression: {
          type: 'AssignmentExpression',
          left: {
            type: 'MemberExpression',
            computed: false,
            object: {
              type: 'MemberExpression',
              computed: false,
              object: {type: 'Identifier', name: clsName},
              property: {type: 'Identifier', name: 'prototype'},
            },
            property: {type: 'Identifier', name: '<alias>'},
          },
          right: {
            type: 'MemberExpression',
            computed: false,
            object: {
              type: 'MemberExpression',
              computed: false,
              object: {type: 'Identifier', name: clsName},
              property: {type: 'Identifier', name: 'prototype'},
            },
            property: {type: 'Identifier', name: '<name>'},
          },
        },
      }))
    ) {
      if (!expectedSchema.methods[match.name]) {
        return error('Missing method ' + clsName + '.' + match.name, node, src);
      }
      if (
        !expectedSchema.methods[match.name].aliases ||
        expectedSchema.methods[match.name].aliases.indexOf(match.alias) === -1
      ) {
        return error('Missing alias ' + clsName + '.' + match.alias, node, src);
      }
    } else if (
      (match = matchPattern(node, {
        type: 'ExpressionStatement',
        expression: {
          type: 'AssignmentExpression',
          left: {
            type: 'MemberExpression',
            computed: false,
            object: {
              type: 'MemberExpression',
              computed: false,
              object: {type: 'Identifier', name: clsName},
              property: {type: 'Identifier', name: 'prototype'},
            },
            property: {type: 'Identifier', name: '<name>'},
          },
          right: '<method>',
        },
      }))
    ) {
      checkMethod(match.name, match.method, expectedSchema.methods[match.name]);
    } else if (
      (match = matchPattern(node, {
        type: 'ExpressionStatement',
        expression: {
          type: 'CallExpression',
          callee: {
            type: 'MemberExpression',
            computed: false,
            object: {
              type: 'Identifier',
              name: 'util',
            },
            property: {
              type: 'Identifier',
              name: 'inherits',
            },
          },
          arguments: [
            {type: 'Identifier', name: clsName},
            {type: 'Identifier', name: '<parent>'},
          ],
        },
      }))
    ) {
      switch (match.parent) {
        case 'Readable':
          schema.readableStream = true;
          break;
        case 'EventEmitter':
          schema.eventEmitter = true;
          break;
        default:
          error('Unexpected inheritance from ' + match.parent, node, src);
      }
    } else if (
      (match = matchPattern(node, {
        type: 'VariableDeclaration',
        declarations: [
          {
            id: {
              type: 'Identifier',
              name: '<name>',
            },
            init: {
              type: 'ArrayExpression',
              elements: '<elements>',
            },
          },
        ],
      })) &&
      match.elements.every(function(element) {
        return element.type === 'StringLiteral';
      })
    ) {
      arrayName = match.name;
      arrayValue = match.elements.map(function(element) {
        return element.value;
      });
    } else if (
      (match = matchPattern(node, {
        type: 'ExpressionStatement',
        expression: {
          type: 'CallExpression',
          callee: {
            type: 'MemberExpression',
            computed: false,
            object: {
              type: 'Identifier',
              name: arrayName,
            },
            property: {
              type: 'Identifier',
              name: 'forEach',
            },
          },
          arguments: [
            {
              type: 'FunctionExpression',
              body: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'ExpressionStatement',
                    expression: {
                      type: 'AssignmentExpression',
                      left: {
                        type: 'MemberExpression',
                        computed: true,
                        property: {type: 'Identifier'},
                        object: {
                          type: 'MemberExpression',
                          computed: false,
                          object: {type: 'Identifier', name: clsName},
                          property: {type: 'Identifier', name: 'prototype'},
                        },
                      },
                      right: '<method>',
                    },
                  },
                ],
              },
            },
          ],
        },
      }))
    ) {
      arrayValue.forEach(function(name) {
        checkMethod(name, match.method, expectedSchema.methods[name]);
      });
    } else if (
      matchPattern(node, {
        // module.exports = ClassName;
        type: 'ExpressionStatement',
        expression: {
          type: 'AssignmentExpression',
          left: {
            type: 'MemberExpression',
            computed: false,
            object: {type: 'Identifier', name: 'module'},
            property: {type: 'Identifier', name: 'exports'},
          },
          right: {
            type: 'Identifier',
            name: clsName,
          },
        },
      }) ||
      matchPattern(node, {
        // var foo = require('foo');
        type: 'VariableDeclaration',
        declarations: [
          {
            init: {
              type: 'CallExpression',
              callee: {type: 'Identifier', name: 'require'},
            },
          },
        ],
      }) ||
      matchPattern(node, {
        // var Foo = require('foo').Foo;
        type: 'VariableDeclaration',
        declarations: [
          {
            init: {
              type: 'MemberExpression',
              object: {
                type: 'CallExpression',
                callee: {type: 'Identifier', name: 'require'},
              },
            },
          },
        ],
      }) ||
      matchPattern(node, {
        // var oid = mongodb.ObjectID.createPk;
        type: 'VariableDeclaration',
        declarations: [
          {
            init: {
              type: 'MemberExpression',
              object: {
                type: 'MemberExpression',
                object: {type: 'Identifier', name: 'mongodb'},
              },
            },
          },
        ],
      }) ||
      matchPattern(node, {
        // var cmdkeys = {insert: 'nInserted', delete: 'nRemoved', update: 'nUpserted'}

        type: 'VariableDeclaration',
        declarations: [
          {
            init: {
              type: 'ObjectExpression',
            },
          },
        ],
      }) ||
      matchPattern(node, {
        // var Foo = function () {};
        type: 'VariableDeclaration',
        declarations: [
          {
            init: {
              type: 'FunctionExpression',
            },
          },
        ],
      }) ||
      matchPattern(node, {
        // function Foo() {};
        type: 'FunctionDeclaration',
      }) ||
      matchPattern(node, {
        // var maxBulkSize = 1000
        type: 'VariableDeclaration',
        declarations: [
          {
            init: {
              type: 'NumericLiteral',
            },
          },
        ],
      }) ||
      matchPattern(node, {
        // try {} catch (ex) {}
        type: 'TryStatement',
      })
    ) {
      // ignore
    } else {
      console.error(node);
      error('Unexpected node of type ' + node.type, node, src);
    }
  });
  if (schema.readableStream && !expectedSchema.readableStream) {
    error('mongojs.' + clsName + ' inherits from ReadableStream');
  }
  if (!schema.readableStream && expectedSchema.readableStream) {
    error('mongojs.' + clsName + ' does not inherit from ReadableStream');
  }
  if (schema.eventEmitter && !expectedSchema.eventEmitter) {
    error('mongojs.' + clsName + ' inherits from EventEmitter');
  }
  if (!schema.eventEmitter && expectedSchema.eventEmitter) {
    error('mongojs.' + clsName + ' does not inherit from EventEmitter');
  }
  Object.keys(expectedSchema.methods).forEach(function(method) {
    if (methods.indexOf(method) === -1) {
      error('mongojs.' + clsName + ' does not have a method ' + method);
    }
  });
  function checkMethod(name, method, expectedSchema) {
    if (!expectedSchema) {
      if (name[0] === '_') return;
      return error(clsName + '.' + name + ' not in schema');
    }
    methods.push(name);
    var expectsPromise = /^Promise/.test(expectedSchema.returns);
    var params = method.params.slice();
    var expectedParams = expectedSchema.args;
    if (
      matchPattern(params[params.length - 1], {
        type: 'Identifier',
        name: 'cb',
      })
    ) {
      params.pop();
      if (
        !expectsPromise &&
        expectedSchema.returns !== 'this' &&
        !expectedSchema.proxy
      ) {
        return error(
          'Async method ' + clsName + '.' + name + ' does not return Promise',
        );
      }
    } else if (
      expectedParams.length &&
      expectedParams[expectedParams.length - 1].rest
    ) {
      expectedParams.pop();
    } else if (expectsPromise) {
      return error(
        'Sync method ' + clsName + '.' + name + ' should not return Promise',
      );
    }

    if (params.length !== expectedParams.length) {
      return error('arg length does not match for ' + clsName + '.' + name);
    }
    console.log(chalk.green('   \u2713 ') + clsName + '.' + name);
  }
});

if (errored) {
  process.exit(1);
}
