import { isNominative, Nominative } from '../Nominative.js';

class MockNominative implements Nominative {
  public equals(other: unknown): boolean {
    return this === other;
  }

  public hashCode(): string {
    return '';
  }

  public serialize(): string {
    return 'uhu';
  }
}

describe('Nominative', () => {
  describe('isNominative', () => {
    it('returns true if the object has hashCode(), equals(), serialize() and toString()', () => {
      expect(isNominative(null)).toBe(false);
      expect(isNominative(undefined)).toBe(false);
      expect(isNominative('')).toBe(false);
      expect(isNominative('123')).toBe(false);
      expect(isNominative('abcd')).toBe(false);
      expect(isNominative(123)).toBe(false);
      expect(isNominative(0)).toBe(false);
      expect(isNominative(false)).toBe(false);
      expect(isNominative(true)).toBe(false);
      expect(isNominative(Symbol())).toBe(false);
      expect(isNominative(20n)).toBe(false);
      expect(isNominative({})).toBe(false);
      expect(isNominative([])).toBe(false);
      expect(
        isNominative({
          hashCode() {
            // NOOP
          }
        })
      ).toBe(false);
      expect(
        isNominative({
          hashCode() {
            // NOOP
          },
          equals() {
            // NOOP
          }
        })
      ).toBe(false);
      expect(
        isNominative({
          hashCode() {
            // NOOP
          },
          equals() {
            // NOOP
          },
          serialize() {
            // NOOP
          }
        })
      ).toBe(true);
      expect(isNominative(new MockNominative())).toBe(true);
    });
  });
});
