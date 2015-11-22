var assert = require('assert');

var mochaOnlyDetector = require('../index');

var checkEsprima  = mochaOnlyDetector.checkEsprima;
var checkString   = mochaOnlyDetector.checkString;
var checkFile     = mochaOnlyDetector.checkFile;
var checkFolder   = mochaOnlyDetector.checkFolder;


mochaOnlyDetector.checkString('describe.only(); it.only();', function (err) {
  assert.ok(err);
});

describe('checkEsprima', function () {
  // TODO Write me
});

describe('es6 arrow functions', () => {
  it('should work', () => {
    assert.ok(true);
  });
});

describe('checkString', function () {
  describe('when a string is invalid', function () {
    // TODO Write more cases

    describe('as it cannot be parsed', function () {
      it('should report that error to the callback', function (done) {
        checkString('function () { }asda', function (err) {
          assert.ok(err);
          done();
        });
      });
    });
  });
  describe('when a string contains it.only', function () {
    it('should report that error to the callback', function (done) {
      checkString('module.exports = function () { it.only(); }', function (err) {
        assert.ok(err);
        done();
      });
    });
  });
  describe('when a string contains describe.only', function () {
    it('should report that as an error to the callback', function (done) {
      checkString('module.exports = function () { describe.only(); }', function (err) {
        assert.ok(err);
        done();
      });
    });
  });
  describe('when a string does not contain describe.only or it.only', function () {
    it('should call the callback without error', function (done) {
      checkString('module.exports = function () { }', done);
    });
  });
});

describe('checkFile', function () {
  describe('when a file is invalid', function () {
    describe('because it does not exist', function () {
      it('should report that error to the callback', function (done) {
        checkFile('./foo', function (err) {
          assert.ok(err);
          done();
        });
      });
    });
  });
  // TODO Write more cases

  describe('when a file is empty', function () {
    it('should call the call the callback without error', function (done) {
      checkFile('./test/fixtures/empty.js', done);
    });
  });
  describe('when a file contains it.only', function () {
    it('should report that error to the callback', function (done) {
      checkFile('./test/fixtures/it-only.js', function (err) {
        assert.ok(err);
        done();
      });
    });
  });
  describe('when a file contains describe.only', function () {
    it('should report that as an error to the callback', function (done) {
      checkFile('./test/fixtures/describe-only.js', function (err) {
        assert.ok(err);
        done();
      });
    });
  });
  describe('when a file does not contain describe.only or it.only', function () {
    it('should call the callback without error', function (done) {
      checkFile('./test/fixtures/no-only.js', done);
    });
  });

});

describe('checkFolder', function () {
  describe('when a folder is empty', function () {
    it('should call the callback without error', function (done) {
      checkFolder('./test/fixtures/empty-folder/**/*.js', done);
    });
  });
  describe('when a folder is invalid', function () {
    // TODO Write more cases

    describe('because it does not exist', function () {
      it('should call the callback without error', function (done) {
        checkFolder('test/fixtures/does-not-exist', done);
      });
    });
  });
  describe('when a folder contains it.only', function () {
    it('should report that error to the callback', function (done) {
      checkFolder('test/fixtures/it-only-folder/**/*.js', function (err) {
        assert.ok(err);
        done();
      });
    });
  });
  describe('when a folder contains describe.only', function () {
    it('should report that as an error to the callback', function (done) {
      checkFolder('test/fixtures/describe-only-folder/**/*.js', function (err) {
        assert.ok(err);
        done();
      });
    });
  });
  describe('when a folder does neither contain describe.only nor it.only', function () {
    it('should call the callback without error', function (done) {
      checkFolder('test/fixtures/no-only-folder/**/*.js', done);

    });
  });

});

