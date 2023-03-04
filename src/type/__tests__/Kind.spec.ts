import { Kind } from '../Kind.js';

class MockError extends Error {
  // NOOP
}

describe('Kind', () => {
  describe('isArray', () => {
    it.each`
      value
      ${null}
      ${undefined}
      ${''}
      ${'123'}
      ${'abcd'}
      ${123}
      ${0}
      ${-12}
      ${0.3}
      ${NaN}
      ${false}
      ${true}
      ${Symbol('p')}
      ${20n}
      ${{}}
      ${Object.create(null)}
    `('returns false when $value given', ({ value }: { value: unknown; }) => {
      expect(Kind.isArray(value)).toBe(false);
    });

    it('returns true when array given', () => {
      expect(Kind.isArray([])).toBe(true);
    });
  });

  describe('isBigInt', () => {
    it.each`
      value
      ${null}
      ${undefined}
      ${''}
      ${'123'}
      ${'abcd'}
      ${123}
      ${0}
      ${-12}
      ${0.3}
      ${NaN}
      ${false}
      ${true}
      ${Symbol('p')}
      ${{}}
      ${[]}
      ${Object.create(null)}
    `('returns false when $value given', ({ value }: { value: unknown; }) => {
      expect(Kind.isBigInt(value)).toBe(false);
    });

    it('returns true only the value is undefined', () => {
      expect(Kind.isBigInt(20n)).toBe(true);
    });
  });

  describe('isBoolean', () => {
    it.each`
      value
      ${null}
      ${undefined}
      ${''}
      ${'123'}
      ${'abcd'}
      ${123}
      ${0}
      ${-12}
      ${0.3}
      ${NaN}
      ${Symbol('p')}
      ${20n}
      ${{}}
      ${[]}
      ${Object.create(null)}
    `('returns false when $value given', ({ value }: { value: unknown; }) => {
      expect(Kind.isBoolean(value)).toBe(false);
    });

    it('returns true when true and false are given', () => {
      expect(Kind.isBoolean(false)).toBe(true);
      expect(Kind.isBoolean(true)).toBe(true);
    });
  });

  describe('isClass', () => {
    it('returns true if class object given', () => {
      expect(Kind.isClass({}, Object)).toBe(true);
      expect(Kind.isClass([], Array)).toBe(true);
      expect(Kind.isClass(Object.create(null), Object)).toBe(false);
      expect(Kind.isClass(new Error(), Error)).toBe(true);
      expect(Kind.isClass(new MockError(), Error)).toBe(true);
      expect(Kind.isClass(new MockError(), MockError)).toBe(true);
    });
  });

  describe('isFunction', () => {
    it.each`
      value
      ${null}
      ${undefined}
      ${''}
      ${'123'}
      ${'abcd'}
      ${123}
      ${0}
      ${-12}
      ${0.3}
      ${NaN}
      ${false}
      ${true}
      ${Symbol('p')}
      ${20n}
      ${{}}
      ${[]}
      ${Object.create(null)}
    `('returns false when $value given', ({ value }: { value: unknown; }) => {
      expect(Kind.isFunction(value)).toBe(false);
    });

    it('returns true only if function given', () => {
      expect(
        Kind.isFunction(() => {
          // NOOP
        })
      ).toBe(true);
    });
  });

  describe('isInteger', () => {
    it.each`
      value
      ${null}
      ${undefined}
      ${''}
      ${'123'}
      ${'abcd'}
      ${0.3}
      ${NaN}
      ${false}
      ${true}
      ${Symbol('p')}
      ${20n}
      ${{}}
      ${[]}
      ${Object.create(null)}
    `('returns false when $value given', ({ value }: { value: unknown; }) => {
      expect(Kind.isInteger(value)).toBe(false);
    });

    it('returns false when the double values are given', () => {
      expect(Kind.isInteger(123)).toBe(true);
      expect(Kind.isInteger(0)).toBe(true);
      expect(Kind.isInteger(-12)).toBe(true);
    });
  });

  describe('isNaN', () => {
    it.each`
      value
      ${null}
      ${undefined}
      ${''}
      ${'123'}
      ${'abcd'}
      ${123}
      ${0}
      ${-12}
      ${0.3}
      ${false}
      ${true}
      ${Symbol('p')}
      ${20n}
      ${{}}
      ${[]}
      ${Object.create(null)}
    `('returns false when $value given', ({ value }: { value: unknown; }) => {
      expect(Kind.isNaN(value)).toBe(false);
    });

    it('returns true when only the value is NaN', () => {
      expect(Kind.isNaN(NaN)).toBe(true);
    });
  });

  describe('isNone', () => {
    it.each`
      value
      ${''}
      ${'123'}
      ${'abcd'}
      ${123}
      ${0}
      ${-12}
      ${0.3}
      ${NaN}
      ${false}
      ${true}
      ${Symbol('p')}
      ${20n}
      ${{}}
      ${[]}
      ${Object.create(null)}
    `('returns false when $value given', ({ value }: { value: unknown; }) => {
      expect(Kind.isNone(value)).toBe(false);
    });

    it('returns true when null or undefined given', () => {
      expect(Kind.isNone(null)).toBe(true);
      expect(Kind.isNone(undefined)).toBe(true);
    });
  });

  describe('isNull', () => {
    it.each`
      value
      ${undefined}
      ${''}
      ${'123'}
      ${'abcd'}
      ${123}
      ${0}
      ${-12}
      ${0.3}
      ${NaN}
      ${false}
      ${true}
      ${Symbol('p')}
      ${20n}
      ${{}}
      ${[]}
      ${Object.create(null)}
    `('returns false when $value given', ({ value }: { value: unknown; }) => {
      expect(Kind.isNull(value)).toBe(false);
    });

    it('returns true only the value is null', () => {
      expect(Kind.isNull(null)).toBe(true);
    });
  });

  describe('isNumber', () => {
    it.each`
      value
      ${null}
      ${undefined}
      ${''}
      ${'123'}
      ${'abcd'}
      ${false}
      ${true}
      ${Symbol('p')}
      ${20n}
      ${{}}
      ${[]}
      ${Object.create(null)}
    `('returns false when $value given', ({ value }: { value: unknown; }) => {
      expect(Kind.isNumber(value)).toBe(false);
    });

    it('returns true even if double values are provided', () => {
      expect(Kind.isNumber(123)).toBe(true);
      expect(Kind.isNumber(0)).toBe(true);
      expect(Kind.isNumber(-12)).toBe(true);
      expect(Kind.isNumber(0.3)).toBe(true);
      expect(Kind.isNumber(NaN)).toBe(true);
    });
  });

  describe('isNumericalString', () => {
    it.each`
      value
      ${null}
      ${undefined}
      ${123}
      ${0}
      ${-12}
      ${0.3}
      ${NaN}
      ${Infinity}
      ${-Infinity}
      ${false}
      ${true}
      ${Symbol('p')}
      ${{}}
      ${[]}
      ${'a'}
      ${'abcd'}
      ${''}
      ${'+'}
      ${'-'}
      ${'.'}
      ${'+.'}
      ${'-.'}
      ${'0.'}
      ${'+0.'}
      ${'-0.'}
      ${'.0'}
      ${'+.0'}
      ${'-.0'}
      ${'.0.'}
      ${'+.0.'}
      ${'-.0.'}
      ${'1..0'}
      ${'+1..0'}
      ${'-1..0'}
      ${'1.0.'}
      ${'+1.0.'}
      ${'-1.0.'}
      ${'001.'}
      ${'+001.'}
      ${'-001.'}
      ${'001..0'}
      ${'+001..0'}
      ${'-001..0'}
      ${'001.0.'}
      ${'+001.0.'}
      ${'-001.0.'}
      ${'NaN'}
      ${'Infinity'}
      ${'-Infinity'}
    `('returns false when $value given', ({ value }: { value: unknown; }) => {
      expect(Kind.isNumericalString(value)).toBe(false);
    });

    it('returns true if the string is able to convert number', () => {
      expect(Kind.isNumericalString('0')).toBe(true);
      expect(Kind.isNumericalString('1.0')).toBe(true);
      expect(Kind.isNumericalString('+1.0')).toBe(true);
      expect(Kind.isNumericalString('-1.0')).toBe(true);
      expect(Kind.isNumericalString('001')).toBe(true);
      expect(Kind.isNumericalString('001.0')).toBe(true);
      expect(Kind.isNumericalString('+001.0')).toBe(true);
      expect(Kind.isNumericalString('-001.0')).toBe(true);
    });
  });

  describe('isObject', () => {
    it.each`
      value
      ${null}
      ${undefined}
      ${''}
      ${'123'}
      ${'abcd'}
      ${123}
      ${0}
      ${-12}
      ${0.3}
      ${NaN}
      ${false}
      ${true}
      ${Symbol('p')}
      ${20n}
    `('returns false if $value is given', ({ value }: { value: unknown; }) => {
      expect(Kind.isObject(value)).toBe(false);
    });

    it('returns true only if object given', () => {
      expect(Kind.isObject({})).toBe(true);
      expect(Kind.isObject([])).toBe(true);
      expect(Kind.isObject(Object.create(null))).toBe(true);
      expect(
        Kind.isObject(() => {
          // NOOP
        })
      ).toBe(false);
    });
  });

  describe('isPrimitive', () => {
    it.each`
      value
      ${{}}
      ${[]}
      ${Object.create(null)}
    `('returns false if $value is given', ({ value }: { value: unknown; }) => {
      expect(Kind.isPrimitive(value)).toBe(false);
    });

    it('returns true if the value is null, undefined, boolean, number, string', () => {
      expect(Kind.isPrimitive(null)).toBe(true);
      expect(Kind.isPrimitive(undefined)).toBe(true);
      expect(Kind.isPrimitive(false)).toBe(true);
      expect(Kind.isPrimitive(true)).toBe(true);
      expect(Kind.isPrimitive(-1)).toBe(true);
      expect(Kind.isPrimitive(0)).toBe(true);
      expect(Kind.isPrimitive(1)).toBe(true);
      expect(Kind.isPrimitive('')).toBe(true);
      expect(Kind.isPrimitive('a')).toBe(true);
      expect(Kind.isPrimitive('0')).toBe(true);
      expect(Kind.isPrimitive('1')).toBe(true);
      expect(Kind.isPrimitive(Symbol('p'))).toBe(true);
      expect(Kind.isPrimitive(20n)).toBe(true);
    });
  });

  describe('isPromiseLike', () => {
    it.each`
      value
      ${null}
      ${undefined}
      ${''}
      ${'123'}
      ${'abcd'}
      ${123}
      ${0}
      ${-12}
      ${0.3}
      ${NaN}
      ${false}
      ${true}
      ${Symbol('p')}
      ${20n}
      ${{}}
      ${[]}
      ${Object.create(null)}
    `('returns false if $value is given', ({ value }: { value: unknown; }) => {
      expect(Kind.isPromiseLike(value)).toBe(false);
    });

    it('returns true only if promise given', () => {
      expect(
        Kind.isPromiseLike(() => {
          // NOOP
        })
      ).toBe(false);
      expect(
        Kind.isPromiseLike(
          new Promise<unknown>(() => {
            // NOOP
          })
        )
      ).toBe(true);
      expect(
        Kind.isPromiseLike({
          then: undefined
        })
      ).toBe(false);
      expect(
        Kind.isPromiseLike({
          then: null
        })
      ).toBe(false);
      expect(
        Kind.isPromiseLike({
          then: ''
        })
      ).toBe(false);
      expect(
        Kind.isPromiseLike({
          then: 123
        })
      ).toBe(false);
      expect(
        Kind.isPromiseLike({
          then: false
        })
      ).toBe(false);
      expect(
        Kind.isPromiseLike({
          then: Symbol('p')
        })
      ).toBe(false);
      expect(
        Kind.isPromiseLike({
          then: 20n
        })
      ).toBe(false);
      expect(
        Kind.isPromiseLike({
          then: {}
        })
      ).toBe(false);
      expect(
        Kind.isPromiseLike({
          then: []
        })
      ).toBe(false);
      expect(
        Kind.isPromiseLike({
          then: () => {
            // NOOP
          }
        })
      ).toBe(true);
    });
  });

  describe('isString', () => {
    it.each`
      value
      ${null}
      ${undefined}
      ${123}
      ${0}
      ${-12}
      ${0.3}
      ${NaN}
      ${false}
      ${true}
      ${Symbol('p')}
      ${20n}
      ${{}}
      ${[]}
      ${Object.create(null)}
    `('returns false if $value is given', ({ value }: { value: unknown; }) => {
      expect(Kind.isString(value)).toBe(false);
    });

    it('return true only if strings given', () => {
      expect(Kind.isString('')).toBe(true);
      expect(Kind.isString('123')).toBe(true);
      expect(Kind.isString('abcd')).toBe(true);
    });
  });

  describe('isSymbol', () => {
    it.each`
      value
      ${null}
      ${undefined}
      ${''}
      ${'123'}
      ${'abcd'}
      ${123}
      ${0}
      ${-12}
      ${0.3}
      ${NaN}
      ${false}
      ${true}
      ${20n}
      ${{}}
      ${[]}
      ${Object.create(null)}
    `('returns false if $value is given', ({ value }: { value: unknown; }) => {
      expect(Kind.isSymbol(value)).toBe(false);
    });

    it('returns true only the value is undefined', () => {
      expect(Kind.isSymbol(Symbol('p'))).toBe(true);
    });
  });

  describe('isUndefined', () => {
    it.each`
      value
      ${null}
      ${''}
      ${'123'}
      ${'abcd'}
      ${123}
      ${0}
      ${-12}
      ${0.3}
      ${NaN}
      ${false}
      ${true}
      ${Symbol('p')}
      ${20n}
      ${{}}
      ${[]}
      ${Object.create(null)}
    `('returns false if $value is given', ({ value }: { value: unknown; }) => {
      expect(Kind.isUndefined(value)).toBe(false);
    });

    it('returns true only the value is undefined', () => {
      expect(Kind.isUndefined(undefined)).toBe(true);
    });
  });
});
