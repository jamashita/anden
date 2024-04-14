import { Objet } from '../Objet.js';

describe('Objet', () => {
  describe('identify', () => {
    it.each`
      value                   | expected
      ${undefined}            | ${'undefined'}
      ${null}                 | ${'null'}
      ${false}                | ${'false'}
      ${true}                 | ${'true'}
      ${-100}                 | ${'-100'}
      ${-10.05}               | ${'-10.05'}
      ${0}                    | ${'0'}
      ${10.05}                | ${'10.05'}
      ${100}                  | ${'100'}
      ${'hquHFH'}             | ${'hquHFH'}
      ${Symbol('hquHFH')}     | ${Symbol('hquHFH').toString()}
      ${-100n}                | ${'-100'}
      ${-1n}                  | ${'-1'}
      ${0n}                   | ${'0'}
      ${1n}                   | ${'1'}
      ${100n}                 | ${'100'}
      ${[]}                   | ${''}
      ${[1, 2, 3]}            | ${'1,2,3'}
      ${{}}                   | ${'[object Object]'}
      ${{ a: 1, b: 2, c: 3 }} | ${'[object Object]'}
      ${Object.create(null)}  | ${'[object Object]'}
    `('returns $expected when given $value', ({ value, expected }: { value: unknown; expected: string }) => {
      expect(Objet.identify(value)).toBe(expected);
    });
  });
});
