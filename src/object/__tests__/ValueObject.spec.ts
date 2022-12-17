import { asyncRandom, sequence } from '../../helper/index.js';
import { MockValueObject } from '../mock/MockValueObject.js';

describe('ValueObject', () => {
  describe('hashCode', () => {
    it('generates same ones if all the properties are the same', () => {
      const dones: Array<Promise<void>> = sequence(1_000).map(async (i: number): Promise<void> => {
        const str: string = await asyncRandom(i);

        const v1: MockValueObject<string> = new MockValueObject(str);
        const v2: MockValueObject<string> = new MockValueObject(str);

        expect(v1.hashCode()).toBe(v2.hashCode());
      });

      return Promise.all(dones);
    }, 30_000);
  });
});
