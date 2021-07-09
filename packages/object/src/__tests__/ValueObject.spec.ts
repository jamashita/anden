import { asyncRandom, sequence } from '@jamashita/anden-helper';
import { MockValueObject } from '../Mock/MockValueObject.js';

describe('ValueObject', () => {
  describe('hashCode', () => {
    it('generates same ones if all the properties are the same', () => {
      expect.assertions(1_000);

      const dones: Array<Promise<void>> = sequence(1_000).map<Promise<void>>(async (i: number) => {
        const str: string = await asyncRandom(i);

        expect(new MockValueObject(str).hashCode()).toBe(new MockValueObject(str).hashCode());
      });

      return Promise.all<void>(dones);
    }, 30_000);
  });
});
