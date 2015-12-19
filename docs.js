'use strict';

var fs = require('fs');
var rimraf = require('rimraf').sync;
var mkdirp = require('mkdirp').sync;

rimraf(__dirname + '/docs');
mkdirp(__dirname + '/docs');

fs.writeFileSync(__dirname + '/docs/README.md', '**WARNING:** This folder is autogenerated by `docs.js` from the files in `/schema`');

fs.readdirSync(__dirname + '/schema').forEach(function (type) {
  var schema = require('./schema/' + type);
  var lines = [];
  var clsName = type[0].toUpperCase() + type.substr(1).replace(/\.js$/, '');
  lines.push(
    '# ' + clsName
  );
  lines.push('');
  if (schema.desc) {
    lines.push(schema.desc);
    lines.push('');
  }
  if (schema.events) {
    lines.push('## Events');
    lines.push('');
    lines.push(
      clsName + ' is an event emitter that emits the following events:'
    );
    schema.events.forEach(function (event) {
      lines.push(' - `' + event.name + '` - ' + event.desc);
    });
    lines.push('');
  }
  if (schema.properties) {
    lines.push('## Properties');
    lines.push('');
    lines.push(
      'Each instance of ' + clsName + ' has the following properties:'
    );
    schema.properties.forEach(function (prop) {
      lines.push(' - `' + prop.name + '` - ' + prop.desc);
    });
    lines.push('');
  }
  if (schema.methods) {
    lines.push('## Methods');
    lines.push('');
    
    Object.keys(schema.methods).forEach(function (name) {
      var method = schema.methods[name];
      var args = method.args.map(function (arg) {
        return (arg.rest ? '...' : '') + arg.name + (('default' in arg) ? ' = ' + JSON.stringify(arg.default) : '');
      });
      lines.push('### ' + clsName.toLowerCase() + '.' + name + '(' + args.join(', ') + ')');
      lines.push('');
      if (method.proxy) {
        lines.push('Returns [`' + method.returns + '`](' + method.returns.toLowerCase() + '.md)');
      } else if (/^Promise/.test(method.returns)) {
        lines.push('Returns [`' + method.returns + '`](https://www.promisejs.org/api/)');
      } else {
        lines.push('Returns `' + method.returns + '`');
      }
      lines.push('');
    });
    lines.push('');
  }
  fs.writeFileSync(
    __dirname + '/docs/' + type.replace(/\.js$/, '.md'),
    lines.join('\n')
  );
});