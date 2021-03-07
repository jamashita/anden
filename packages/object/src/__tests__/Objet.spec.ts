import { random, sequence } from '@jamashita/anden-helper';
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

      sequence(100).forEach(() => {
        const str: string = random(40);

        expect(Objet.identify(str)).toBe(str);
      });
    }, 10000);

    it('describes symbol', () => {
      expect.assertions(100);

      sequence(100).forEach(() => {
        const sym: symbol = Symbol(random(40));

        expect(Objet.identify(sym)).toBe(sym.toString());
      });
    }, 10000);

    it('describes bigint', () => {
      expect.assertions(201);

      for (let i: bigint = -100n; i <= 100n; i++) {
        expect(Objet.identify(i)).toBe(`${i}`);
      }
    });

    it('describes object literal', () => {
      expect.assertions(2);

      expect(Objet.identify({})).toBe('[object Object]');

      const obj: Inconnu = {};

      sequence(100).map<[string, string]>((i: number) => {
        return [random(i), random(i)];
      }).forEach(([key, value]: [string, string]) => {
        obj[key] = value;
      });

      expect(Objet.identify(obj)).toBe('[object Object]');
    }, 10000);

    it('describes object.create(null)', () => {
      expect.assertions(2);

      expect(Objet.identify(Object.create(null))).toBe('[object Object]');

      const obj: Inconnu = {};

      sequence(100).map<[string, string]>((i: number) => {
        return [random(i), random(i)];
      }).forEach(([key, value]: [string, string]) => {
        obj[key] = value;
      });

      expect(Objet.identify(obj)).toBe('[object Object]');
    }, 10000);

    it('returns itself when it has toString()', () => {
      expect.assertions(100);

      sequence(100).forEach(() => {
        const str: string = random(40);

        expect(Objet.identify({
          toString(): string {
            return str;
          }
        })).toBe(str);
      });
    }, 10000);
  });
});
