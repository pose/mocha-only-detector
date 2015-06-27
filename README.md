## mocha-only-detector

Detect forgotten `describe.only` and `it.only` in mocha tests.

### Install

```js
npm i -g mocha-only-detector
```

### Usage

If given two files:

```js
// foo.js
describe.only('Foo', function () {
  it('should foobaz bar', function (done) {
    // ...
    done();
  });
});
```

```js
// bar.js
describe('bar', function () {
  it('should foobar', function (done) {
    // ...
    done();
  });
});
```

Then running:

```
$ mocha-only-detector foo.js bar.js
```

will return the following error output and a non-zero exit code:

```
[Error: Error while checking foo.js: Contains describe.only or it.only]
```
