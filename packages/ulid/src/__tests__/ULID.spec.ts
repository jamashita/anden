import { MockValueObject } from '@jamashita/anden-object';
import { ULIDError } from '../Error/ULIDError';
import { ULID } from '../ULID';

const generate = (): Promise<ULID> => {
  return new Promise<ULID>((resolve: (value: ULID) => void) => {
    setImmediate(() => {
      resolve(ULID.generate());
    });
  });
};

describe('ULID', () => {
  describe('of', () => {
    it('returns instance', () => {
      const ulid: string = '01FETH4MENT39GREQDE4FNRMQ7';

      expect(ULID.of(ulid).get()).toBe(ulid);
    });

    it('throws ULIDError when the argument is not satisfied ULID format', () => {
      expect(() => {
        ULID.of('cinq');
      }).toThrow(ULIDError);
    });

    it('throws ULIDError when the argument length is not 26', () => {
      expect(() => {
        ULID.of('01FF2GJM51QP6DYKQFHQ1EAAR');
      }).toThrow(ULIDError);
      expect(() => {
        ULID.of('01FF2GJXXNB4Y71Q2WGP4KGPTRA');
      }).toThrow(ULIDError);
      expect(() => {
        ULID.of('01FF2GK982W2K1GBJMBRF78BBC');
      }).not.toThrow(ULIDError);
    });
  });

  describe('size', () => {
    it('returns 26', () => {
      expect(ULID.size()).toStrictEqual(26);
    });
  });

  describe('validate', () => {
    it('returns true if given string is not violated to ulid format', () => {
      const ulid: string = '01FETH5DXXGSEENNTVM3NANGZA';

      expect(ULID.validate(ulid)).toBe(true);
    });

    it('generates ULID that must pass', async () => {
      const promises: Array<Promise<ULID>> = Array.from(Array(100)).map<Promise<ULID>>(() => {
        return generate();
      });
      const ids: Array<ULID> = await Promise.all<ULID>(promises);

      ids.forEach((id: ULID) => {
        expect(ULID.validate(id.get())).toBe(true);
      });
    });
  });

  describe('generate', () => {
    it('always generates 26 length string', async () => {
      const promises: Array<Promise<ULID>> = Array.from(Array(100)).map<Promise<ULID>>(() => {
        return generate();
      });
      const ids: Array<ULID> = await Promise.all<ULID>(promises);

      ids.forEach((id: ULID) => {
        expect(id.get()).toHaveLength(ULID.size());
      });
    });
  });

  describe('equals', () => {
    it('returns true if the same instance given', () => {
      const ulid1: ULID = ULID.of('01FETHB1JHDVTASRTZMYC624WD');

      expect(ulid1.equals(ulid1)).toBe(true);
    });

    it('returns false if different class instance given', () => {
      const ulid1: ULID = ULID.of('01FETHBG4Y4QQAVVKXQTZR52R6');

      expect(ulid1.equals(new MockValueObject('01FETHBG4Y4QQAVVKXQTZR52R6'))).toBe(false);
    });

    it('returns true if the property is the same', () => {
      const ulid1: ULID = ULID.of('01FETHBG4Y4QQAVVKXQTZR52R6');
      const ulid2: ULID = ULID.of('01FETHCPXBCYDR7WW2RC6M4BMS');
      const ulid3: ULID = ULID.of('01FETHBG4Y4QQAVVKXQTZR52R6');

      expect(ulid1.equals(ulid2)).toBe(false);
      expect(ulid1.equals(ulid3)).toBe(true);
    });
  });

  describe('toString', () => {
    it('returns the original string', () => {
      const id: string = '01FETHD9XZKWWNYNJYSDKVJ5GG';
      const ulid: ULID = ULID.of(id);

      expect(ulid.toString()).toBe(id);
    });
  });
});
