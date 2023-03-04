import { Equatable, isEquatable } from '../Equatable.js';

class MockEquatable implements Equatable {
  public equals(other: unknown): boolean {
    return this === other;
  }
}

describe('Equatable', () => {
  describe('isEquatable', () => {
    it.each`
    value
    ${null}
    ${undefined}
    ${''}
    ${'123'}
    ${'abcd'}
    ${123}
    ${0}
    ${false}
    ${true}
    ${Symbol()}
    ${20n}
    ${{}}
    ${[]}
    `('returns false when $value given', ({ value }: { value: unknown; }) => {
      expect(isEquatable(value)).toBe(false);
    });

    it('returns true if the object has equals()', () => {
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
