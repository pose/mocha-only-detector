var assert = require('assert');
var fs = require('fs');

var glob = require('glob');
var esprima = require('esprima');
var find = require('esprimaq');

function checkEsprima(syntaxTree, cb) {
  var result = find(syntaxTree)
                .callMethod('describe', 'only')
                .callMethod('it', 'only')
                .exec();

  if (result.length > 0) {
    return cb(new Error('Contains describe.only or it.only'));
  }
  return cb();
}

function checkString(code, cb) {
  var syntaxTree;
  try {
    syntaxTree = esprima.parse(code, { tolerant: true, loc: true });
  } catch (e) {
    return cb(e);
  }
  checkEsprima(syntaxTree, cb);
}

function checkFile(file, cb) {
  fs.readFile(file, {encoding: 'utf8'}, function (err, content) {
    if (err) { return cb(err); }
    checkString(content, function (err) {
      if (err) {
        return cb(new Error('Error while checking ' + file + ': ' + err.message));
      }
      return cb();
    });
  });
}

function checkFolder(globExp, cb) {
  glob(globExp, function (err, files) {
    if (err) { return cb(err); }

    var result = [];

    files.forEach(function (file) {
      checkFile(file, function (err) {
        result.push(err);

        if (result.length === files.length) {
          result = result.filter(function (x) { return x; });
          if (result.length === 0) {
            return cb();
          }
          cb(result);
        }
      });
    });

    if (files.length === 0) {
      return cb();
    }
  });
}

module.exports = {
  checkEsprima:   checkEsprima,
  checkString:    checkString,
  checkFile:      checkFile,
  checkFolder:    checkFolder
};
