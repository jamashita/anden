import { asyncRandom, sequence } from '../../helper/index.js';
import { Inconnu } from '../../type/index.js';
import { Objet } from '../Objet.js';

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
      const dones: Array<Promise<void>> = sequence(100).map(async (): Promise<void> => {
        const str: string = await asyncRandom(40);

        expect(Objet.identify(str)).toBe(str);
      });

      return Promise.all<void>(dones);
    }, 10_000);

    it('describes symbol', () => {
      const dones: Array<Promise<void>> = sequence(100).map(async (): Promise<void> => {
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

      const dones: Array<Promise<void>> = sequence(100).map(async (i: number): Promise<void> => {
        const [key, value]: Array<string> = await Promise.all<string>([
          asyncRandom(i),
          asyncRandom(i)
        ]);

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        obj[key!] = value;
      });

      await Promise.all<void>(dones);

      expect(Objet.identify(obj)).toBe('[object Object]');
    }, 10_000);

    it('describes object.create(null)', async () => {
      expect(Objet.identify(Object.create(null))).toBe('[object Object]');

      const obj: Inconnu = {};

      const dones: Array<Promise<void>> = sequence(100).map(async (i: number): Promise<void> => {
        const [key, value]: Array<string> = await Promise.all<string>([
          asyncRandom(i),
          asyncRandom(i)
        ]);

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        obj[key!] = value;
      });

      await Promise.all<void>(dones);

      expect(Objet.identify(obj)).toBe('[object Object]');
    }, 10_000);

    it('returns itself when it has toString()', () => {
      const dones: Array<Promise<void>> = sequence(100).map(async (): Promise<void> => {
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
