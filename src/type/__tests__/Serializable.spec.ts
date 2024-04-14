import { isSerializable, type Serializable } from '../Serializable.js';

class MockSerializable implements Serializable {
  public serialize(): string {
    return 'meme';
  }
}

describe('Serializable', () => {
  describe('isSerializable', () => {
    it('returns true if the object has serialize() and toString()', () => {
      expect(isSerializable(null)).toBe(false);
      expect(isSerializable(undefined)).toBe(false);
      expect(isSerializable('')).toBe(false);
      expect(isSerializable('123')).toBe(false);
      expect(isSerializable('abcd')).toBe(false);
      expect(isSerializable(123)).toBe(false);
      expect(isSerializable(0)).toBe(false);
      expect(isSerializable(false)).toBe(false);
      expect(isSerializable(true)).toBe(false);
      expect(isSerializable(Symbol())).toBe(false);
      expect(isSerializable(20n)).toBe(false);
      expect(isSerializable({})).toBe(false);
      expect(isSerializable([])).toBe(false);
      expect(
        isSerializable({
          serialize() {
            // NOOP
          }
        })
      ).toBe(true);
      expect(isSerializable(new MockSerializable())).toBe(true);
    });
  });
});
