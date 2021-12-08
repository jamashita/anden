import { asyncRandom, sequence } from '@jamashita/anden-helper';
import { Inconnu } from '@jamashita/anden-type';
import { Objet } from '../Objet';

describe('Objet', () => {
  describe('identify', () => {
    it('describes undefined', () => {
      expect(Objet.identify(undefined)).toBe('undefined');
    });

    it('describes null', () => {
      expect(Objet.identify(null)).toBe('null');
    });

    it('describes boolean', () => {
      expect(Objet.identify(false)).toBe('false');
      expect(Objet.identify(true)).toBe('true');
    });

    it('describes number', () => {
      for (let i: number = -100; i <= 100; i++) {
        expect(Objet.identify(i)).toBe(`${i}`);
      }
    });

    it('describes string', () => {
      const dones: Array<Promise<void>> = sequence(100).map<Promise<void>>(async () => {
        const str: string = await asyncRandom(40);

        expect(Objet.identify(str)).toBe(str);
      });

      return Promise.all<void>(dones);
    }, 10_000);

    it('describes symbol', () => {
      const dones: Array<Promise<void>> = sequence(100).map<Promise<void>>(async () => {
        const sym: symbol = Symbol(await asyncRandom(40));

        expect(Objet.identify(sym)).toBe(sym.toString());
      });

      return Promise.all<void>(dones);
    }, 10_000);

    it('describes bigint', () => {
      for (let i: bigint = -100n; i <= 100n; i++) {
        expect(Objet.identify(i)).toBe(`${i}`);
      }
    });

    it('describes object literal', async () => {
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
