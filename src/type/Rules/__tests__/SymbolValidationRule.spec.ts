import { SymbolValidationRule } from '../SymbolValidationRule.js';

describe('SymbolValidationRule', () => {
  describe('of', () => {
    it('returns singleton instance', () => {
      expect(SymbolValidationRule.of()).toBe(SymbolValidationRule.of());
    });
  });

  describe('evaluate', () => {
    it.each`
    value
    ${Symbol()}
    ${Symbol('mi')}
    ${Symbol(-6)}
    `('does not throw any Error', ({ value }: { value: symbol; }) => {
      const rule: SymbolValidationRule = SymbolValidationRule.of();

      expect(() => {
        rule.evaluate({}, value);
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
    `('throws TypeError when non-symbol $value given', ({ value }: { value: unknown; }) => {
      const rule: SymbolValidationRule = SymbolValidationRule.of();

      expect(() => {
        rule.evaluate({}, value);
      }).toThrow(TypeError);
    });
  });
});
