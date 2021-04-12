import { isThenable } from '../Thenable';

describe('Thenable', () => {
  describe('isThenable', () => {
    it('returns true only if the Thenable given', () => {
      expect.assertions(28);

      expect(isThenable(null)).toBe(false);
      expect(isThenable(undefined)).toBe(false);
      expect(isThenable('')).toBe(false);
      expect(isThenable('123')).toBe(false);
      expect(isThenable('abcd')).toBe(false);
      expect(isThenable(123)).toBe(false);
      expect(isThenable(0)).toBe(false);
      expect(isThenable(-12)).toBe(false);
      expect(isThenable(0.3)).toBe(false);
      expect(isThenable(false)).toBe(false);
      expect(isThenable(true)).toBe(false);
      expect(isThenable(Symbol('p'))).toBe(false);
      expect(isThenable(20n)).toBe(false);
      expect(isThenable({})).toBe(false);
      expect(isThenable([])).toBe(false);
      expect(isThenable(Object.create(null))).toBe(false);
      expect(
        isThenable(() => {
          // NOOP
        })
      ).toBe(false);
      expect(
        isThenable(
          new Promise<unknown>(() => {
            // NOOP
          })
        )
      ).toBe(true);
      expect(
        isThenable({
          then: undefined
        })
      ).toBe(false);
      expect(
        isThenable({
          then: null
        })
      ).toBe(false);
      expect(
        isThenable({
          then: ''
        })
      ).toBe(false);
      expect(
        isThenable({
          then: 123
        })
      ).toBe(false);
      expect(
        isThenable({
          then: false
        })
      ).toBe(false);
      expect(
        isThenable({
          then: Symbol('p')
        })
      ).toBe(false);
      expect(
        isThenable({
          then: 20n
        })
      ).toBe(false);
      expect(
        isThenable({
          then: {}
        })
      ).toBe(false);
      expect(
        isThenable({
          then: []
        })
      ).toBe(false);
      expect(
        isThenable({
          then: () => {
            // NOOP
          }
        })
      ).toBe(true);
    });
  });
});
