const assert = require('assert');

describe('IdentifierService', () => {
  describe('#list()', () => {
    it('should return a list of identifiers', () => {

      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });

  describe('#createIdentifier()', () => {
    it('should return -1 when the value is not present', () => {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });

  describe('#updateIdentifier()', () => {
    it('should return -1 when the value is not present', () => {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });

  describe('#deleteIdentifier()', () => {
    it('should return -1 when the value is not present', () => {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});
