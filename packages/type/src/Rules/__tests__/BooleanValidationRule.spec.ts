import { BooleanValidationRule } from '../BooleanValidationRule';

describe('BooleanValidationRule', () => {
  describe('of', () => {
    it('returns singleton instance', () => {
      expect.assertions(1);

      expect(BooleanValidationRule.of()).toBe(BooleanValidationRule.of());
    });
  });

  describe('evaluate', () => {
    it('does not throw any Error', () => {
      expect.assertions(2);

      const rule: BooleanValidationRule = BooleanValidationRule.of();

      expect(() => {
        rule.evaluate({}, false);
      }).not.toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, true);
      }).not.toThrow(TypeError);
    });

    it('throws TypeError when non-boolean values given', () => {
      expect.assertions(11);

      const rule: BooleanValidationRule = BooleanValidationRule.of();

      expect(() => {
        rule.evaluate({}, null);
      }).toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, undefined);
      }).toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, '');
      }).toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, '123');
      }).toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, 'abcd');
      }).toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, 123);
      }).toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, 0);
      }).toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, Symbol('p'));
      }).toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, 20n);
      }).toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, {});
      }).toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, []);
      }).toThrow(TypeError);
    });
  });
});
