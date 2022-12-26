import { Equatable, isEquatable } from '../Equatable.js';

class MockEquatable implements Equatable {
  public equals(other: unknown): boolean {
    return this === other;
  }
}

describe('Equatable', () => {
  describe('isEquatable', () => {
    it('returns true if the object has equals()', () => {
      expect(isEquatable(null)).toBe(false);
      expect(isEquatable(undefined)).toBe(false);
      expect(isEquatable('')).toBe(false);
      expect(isEquatable('123')).toBe(false);
      expect(isEquatable('abcd')).toBe(false);
      expect(isEquatable(123)).toBe(false);
      expect(isEquatable(0)).toBe(false);
      expect(isEquatable(false)).toBe(false);
      expect(isEquatable(true)).toBe(false);
      expect(isEquatable(Symbol())).toBe(false);
      expect(isEquatable(20n)).toBe(false);
      expect(isEquatable({})).toBe(false);
      expect(isEquatable([])).toBe(false);
      expect(
        isEquatable({
          equals() {
            // NOOP
          }
        })
      ).toBe(true);
      expect(isEquatable(new MockEquatable())).toBe(true);
    });
  });
});
