import { BooleanValidationRule } from '../BooleanValidationRule.js';

describe('BooleanValidationRule', () => {
  describe('of', () => {
    it('returns singleton instance', () => {
      expect(BooleanValidationRule.of()).toBe(BooleanValidationRule.of());
    });
  });

  describe('evaluate', () => {
    it.each`
      value
      ${false}
      ${true}
    `('does not throw any Error', ({ value }: { value: boolean }) => {
      const rule: BooleanValidationRule = BooleanValidationRule.of();

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
      ${Symbol()}
      ${20n}
      ${{}}
      ${[]}
    `('throws TypeError when non-boolean $value given', ({ value }: { value: unknown }) => {
      const rule: BooleanValidationRule = BooleanValidationRule.of();

      expect(() => {
        rule.evaluate({}, value);
      }).toThrow(TypeError);
    });
  });
});
