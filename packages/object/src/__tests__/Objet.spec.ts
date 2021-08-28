import { asyncRandom, sequence } from '@jamashita/anden-helper';
import { Inconnu } from '@jamashita/anden-type';
import { Objet } from '../Objet';

describe('Objet', () => {
  describe('identify', () => {
    it('describes undefined', () => {
      expect.assertions(1);

      expect(Objet.identify(undefined)).toBe('undefined');
    });

    it('describes null', () => {
      expect.assertions(1);

      expect(Objet.identify(null)).toBe('null');
    });

    it('describes boolean', () => {
      expect.assertions(2);

      expect(Objet.identify(false)).toBe('false');
      expect(Objet.identify(true)).toBe('true');
    });

    it('describes number', () => {
      expect.assertions(201);

      for (let i: number = -100; i <= 100; i++) {
        expect(Objet.identify(i)).toBe(`${i}`);
      }
    });

    it('describes string', () => {
      expect.assertions(100);

      const dones: Array<Promise<void>> = sequence(100).map<Promise<void>>(async () => {
        const str: string = await asyncRandom(40);

        expect(Objet.identify(str)).toBe(str);
      });

      return Promise.all<void>(dones);
    }, 10_000);

    it('describes symbol', () => {
      expect.assertions(100);

      const dones: Array<Promise<void>> = sequence(100).map<Promise<void>>(async () => {
        const sym: symbol = Symbol(await asyncRandom(40));

        expect(Objet.identify(sym)).toBe(sym.toString());
      });

      return Promise.all<void>(dones);
    }, 10_000);

    it('describes bigint', () => {
      expect.assertions(201);

      for (let i: bigint = -100n; i <= 100n; i++) {
        expect(Objet.identify(i)).toBe(`${i}`);
      }
    });

    it('describes object literal', async () => {
      expect.assertions(2);

      expect(Objet.identify({})).toBe('[object Object]');

      const obj: Inconnu = {};

      const dones: Array<Promise<void>> = sequence(100).map<Promise<void>>(async (i: number) => {
        const [key, value]: [string, string] = await Promise.all<string, string>([
          asyncRandom(i),
          asyncRandom(i)
        ]);

        obj[key] = value;
      });

      await Promise.all<void>(dones);

      expect(Objet.identify(obj)).toBe('[object Object]');
    }, 10_000);

    it('describes object.create(null)', async () => {
      expect.assertions(2);

      expect(Objet.identify(Object.create(null))).toBe('[object Object]');

      const obj: Inconnu = {};

      const dones: Array<Promise<void>> = sequence(100).map<Promise<void>>(async (i: number) => {
        const [key, value]: [string, string] = await Promise.all<string, string>([
          asyncRandom(i),
          asyncRandom(i)
        ]);

        obj[key] = value;
      });

      await Promise.all<void>(dones);

      expect(Objet.identify(obj)).toBe('[object Object]');
    }, 10_000);

    it('returns itself when it has toString()', () => {
      expect.assertions(100);

      const dones: Array<Promise<void>> = sequence(100).map<Promise<void>>(async () => {
        const str: string = await asyncRandom(40);

        expect(Objet.identify({
          toString(): string {
            return str;
          }
        })).toBe(str);
      });

      return Promise.all<void>(dones);
    }, 10_000);
  });
});
