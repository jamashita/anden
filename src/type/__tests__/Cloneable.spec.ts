import { Cloneable, isCloneable } from '../Cloneable.js';

class MockCloneable implements Cloneable<MockCloneable> {
  public duplicate(): MockCloneable {
    return new MockCloneable();
  }
}

describe('Cloneable', () => {
  describe('isCloneable', () => {
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
      expect(isCloneable(value)).toBe(false);
    });

    it('returns true if the object has duplicate()', () => {
      expect(
        isCloneable({
          duplicate() {
            // NOOP
          }
        })
      ).toBe(true);
      expect(isCloneable(new MockCloneable())).toBe(true);
    });
  });
});
