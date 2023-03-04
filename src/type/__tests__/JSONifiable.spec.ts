import { isJSONifiable, JSONifiable } from '../JSONifiable.js';
import { ObjectLiteral } from '../Value.js';

class MockJSONifiable implements JSONifiable {
  public toJSON(): ObjectLiteral {
    return {};
  }
}

describe('JSONifiable', () => {
  describe('isJSONifiable', () => {
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
      expect(isJSONifiable(value)).toBe(false);
    });

    it('returns true if the object has toJSON()', () => {
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
