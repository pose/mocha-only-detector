describe('foo', function () {
  describe.only('bar', function () {
    it('should work', function () {
      console.log('here');
    });
  });
});

