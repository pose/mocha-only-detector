describe('foo', function () {
  describe('bar', function () {
    it('should work', function () {
      console.log('here a describe.only or it.only should not be detected');
    });
  });
});

