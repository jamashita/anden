import { asyncRandom, sequence } from '@jamashita/anden-helper';
import { MockValueObject } from '../mock/MockValueObject';

describe('ValueObject', () => {
  describe('hashCode', () => {
    it('generates same ones if all the properties are the same', () => {
      const dones: Array<Promise<void>> = sequence(1_000).map(async (i: number): Promise<void> => {
        const str: string = await asyncRandom(i);

        expect(new MockValueObject(str).hashCode()).toBe(new MockValueObject(str).hashCode());
      });

      return Promise.all<void>(dones);
    }, 30_000);
  });
});
