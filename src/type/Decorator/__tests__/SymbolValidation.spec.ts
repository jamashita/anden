import 'reflect-metadata';
import { SymbolValidation } from '../SymbolValidation.js';
import { Validate } from '../Validate.js';

class MockValidation {
  @Validate()
  public act(@SymbolValidation() _s: unknown): void {
    // NOOP
  }
}

describe('SymbolValidation', () => {
  describe('decorator', () => {
    it('does not throw any Error', () => {
      const validation: MockValidation = new MockValidation();

      expect(() => {
        validation.act(Symbol('p'));
      }).not.toThrow(TypeError);
    });

    it.each`
      value
      ${null}
      ${undefined}
      ${''}
      ${'123'}
      ${'abcd'}
      ${123}
      ${0}
      ${false}
      ${true}
      ${20n}
      ${{}}
      ${[]}
    `('throws TypeError when $value given', ({ value }: { value: unknown }) => {
      const validation: MockValidation = new MockValidation();

      expect(() => {
        validation.act(value);
      }).toThrow(TypeError);
    });
  });
});
