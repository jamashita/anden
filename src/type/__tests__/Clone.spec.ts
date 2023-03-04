import { Clone } from '../Clone.js';
import { ObjectLiteral } from '../Value.js';

describe('Clone', () => {
  describe('copy', () => {
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
    `('can copy ObjectLiterals', ({ object1, object2 }: { object1: ObjectLiteral; object2: ObjectLiteral; }) => {
      expect(Clone.copy(object1)).toEqual(object2);
    });
  });
});
