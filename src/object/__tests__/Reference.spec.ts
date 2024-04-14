import type { Inconnu, PlainObject, PlainObjectItem } from '../../type/index.js';
import { Reference } from '../Reference.js';

describe('Reference', () => {
  describe('isCircular', () => {
    it.each`
      object
      ${{ a: null }}
      ${{ a: undefined }}
      ${{ a: true }}
      ${{ a: false }}
      ${{ a: 'picture in picture' }}
      ${{ a: 0.001 }}
      ${{ a: -0.001 }}
      ${{ a: Number.POSITIVE_INFINITY }}
      ${{ a: Number.NaN }}
      ${{ a: Symbol() }}
      ${{ a: 46n }}
      ${{ a: {} }}
      ${{ a: { b: { c: undefined, d: {} } } }}
      ${{ a: [] }}
      ${{ a: [undefined, [undefined]] }}
      ${[]}
      ${[undefined, [undefined]]}
    `('returns false if given objects do not have recursive reference', ({ object }: { object: object }) => {
      expect(Reference.isCircular({})).toBe(false);
      expect(Reference.isCircular(object)).toBe(false);
    });

    it('returns true if objects have recursive references', () => {
      const obj1: Inconnu = {
        a: 'noi'
      };
      const obj2: Inconnu = {
        b: 'voi',
        o: obj1
      };

      // biome-ignore lint/complexity/useLiteralKeys: <explanation>
      obj1['o'] = obj2;

      const arr: Array<PlainObject> = [];
      const obj: PlainObject = {
        arr
      };

      arr.push(obj);

      const arr1: Array<PlainObjectItem> = [];
      const arr2: Array<PlainObjectItem> = [arr1];

      arr1.push(arr2);

      expect(Reference.isCircular(obj1)).toBe(true);
      expect(Reference.isCircular(obj2)).toBe(true);
      expect(Reference.isCircular(arr)).toBe(true);
      expect(Reference.isCircular(obj)).toBe(true);
      expect(Reference.isCircular(arr1)).toBe(true);
      expect(Reference.isCircular(arr2)).toBe(true);
    });
  });
});
