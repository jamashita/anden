import { ULID } from '../ULID.js';
import { ULIDError } from '../ULIDError.js';

const generate = (): Promise<ULID> => {
  return new Promise((resolve: (value: ULID) => void) => {
    setImmediate(() => {
      resolve(ULID.generate());
    });
  });
};

describe('ULID', () => {
  describe('generate', () => {
    it('always generates 26 length string', async () => {
      const promises: Array<Promise<ULID>> = Array.from(Array(100)).map(() => {
        return generate();
      });
      const ids: Array<ULID> = await Promise.all<ULID>(promises);

      // biome-ignore lint/complexity/noForEach: <explanation>
      ids.forEach((id: ULID) => {
        expect(id.get()).toHaveLength(ULID.size());
      });
    });
  });

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

    it.each`
      value
      ${'01FF2GJM51QP6DYKQFHQ1EAAR'}
      ${'01FF2GJXXNB4Y71Q2WGP4KGPTRA'}
    `('throws ULIDError when the argument length is not 26', ({ value }: { value: string }) => {
      expect(() => {
        ULID.of(value);
      }).toThrow(ULIDError);
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
      const promises: Array<Promise<ULID>> = Array.from(Array(100)).map(() => {
        return generate();
      });
      const ids: Array<ULID> = await Promise.all<ULID>(promises);

      // biome-ignore lint/complexity/noForEach: <explanation>
      ids.forEach((id: ULID) => {
        expect(ULID.validate(id.get())).toBe(true);
      });
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
