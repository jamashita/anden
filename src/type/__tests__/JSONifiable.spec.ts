import { isJSONifiable, JSONifiable } from '../JSONifiable.js';
import { ObjectLiteral } from '../Value.js';

class MockJSONifiable implements JSONifiable {
  public toJSON(): ObjectLiteral {
    return {};
  }
}

describe('JSONifiable', () => {
  describe('isJSONifiable', () => {
    it('returns true if the object has toJSON()', () => {
      expect(isJSONifiable(null)).toBe(false);
      expect(isJSONifiable(undefined)).toBe(false);
      expect(isJSONifiable('')).toBe(false);
      expect(isJSONifiable('123')).toBe(false);
      expect(isJSONifiable('abcd')).toBe(false);
      expect(isJSONifiable(123)).toBe(false);
      expect(isJSONifiable(0)).toBe(false);
      expect(isJSONifiable(false)).toBe(false);
      expect(isJSONifiable(true)).toBe(false);
      expect(isJSONifiable(Symbol())).toBe(false);
      expect(isJSONifiable(20n)).toBe(false);
      expect(isJSONifiable({})).toBe(false);
      expect(isJSONifiable([])).toBe(false);
      expect(
        isJSONifiable({
          toJSON() {
            // NOOP
          }
        })
      ).toBe(true);
      expect(isJSONifiable(new MockJSONifiable())).toBe(true);
    });
  });
});
