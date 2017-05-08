describe('theme.js', function() {
  // Mocha's before() function runs once before the rest of the tests start
  // Mocha also comes with after, beforeEach and afterEach
  before(function() {

  });

  describe('Type of theme object', function() {
    it('should be object', function() {
      // This test case reads exactly how you would expect
      expect(typeof theme).to.equal("object"); // passes
    });
  });
});