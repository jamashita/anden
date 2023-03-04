import { Equality } from '../Equality.js';
import { ObjectLiteral } from '../Value.js';

describe('Equality', () => {
  describe('same', () => {
    it.each`
    object1 | object2
    ${{}} | ${{}}
    ${{ a: null }} | ${{ a: null }}
    ${{ a: undefined }} | ${{ a: undefined }}
    ${{ a: true }} | ${{ a: true }}
    ${{ a: false }} | ${{ a: false }}
    ${{ a: 'picture in picture' }} | ${{ a: 'picture in picture' }}
    ${{ a: 0.001 }} | ${{ a: 0.001 }}
    ${{ a: -0.001 }} | ${{ a: -0.001 }}
    ${{ a: Infinity }} | ${{ a: Infinity }}
    ${{ a: NaN }} | ${{ a: NaN }}
    ${{ a: 46n }} | ${{ a: 46n }}
    ${{ a: {} }} | ${{ a: {} }}
    ${{ a: { b: { c: undefined,
d: {} } } }} | ${{ a: { b: { c: undefined,
d: {} } } }}
    ${{ a: [] }} | ${{ a: [] }}
    ${{ a: [undefined, [undefined]] }} | ${{ a: [undefined, [undefined]] }}
    ${[]} | ${[]}
    ${[undefined, [undefined]]} | ${[undefined, [undefined]]}
    `('returns true when the identical objects given', ({
      object1,
      object2
    }: { object1: ObjectLiteral; object2: ObjectLiteral; }) => {
      expect(Equality.same(object1, object2)).toBe(true);
    });

    it.each`
    object1 | object2
    ${{}} | ${[]}
    ${{ a: null }} | ${{ a: undefined }}
    ${{ a: 'colo' }} | ${{ b: 'colo' }}
    ${{ a: true }} | ${{ a: false }}
    ${{ a: 0.001 }} | ${{ a: 0.002 }}
    ${{ a: false }} | ${{ a: '' }}
    ${{ a: 0 }} | ${{ a: false }}
    ${{ a: 0.001 }} | ${{ a: 0.001,
b: 0.002 }}
    ${{ a: Symbol() }} | ${{ a: Symbol() }}
    ${{ a: { b: { c: undefined,
d: {} } } }} | ${{ a: { e: { f: undefined,
g: {} } } }}
    ${{ a: [] }} | ${{ a: [undefined] }}
    ${[]} | ${[undefined]}
    `('returns false when the different two objects are given', ({
      object1,
      object2
    }: { object1: ObjectLiteral; object2: ObjectLiteral; }) => {
      expect(Equality.same(object1, object2)).toBe(false);
      expect(Equality.same([], [undefined])).toBe(false);
    });
  });
});
