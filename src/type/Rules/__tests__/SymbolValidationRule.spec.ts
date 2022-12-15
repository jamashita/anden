import { SymbolValidationRule } from '../SymbolValidationRule.js';

describe('SymbolValidationRule', () => {
  describe('of', () => {
    it('returns singleton instance', () => {
      expect(SymbolValidationRule.of()).toBe(SymbolValidationRule.of());
    });
  });

  describe('evaluate', () => {
    it('does not throw any Error', () => {
      const rule: SymbolValidationRule = SymbolValidationRule.of();

      expect(() => {
        rule.evaluate({}, Symbol());
      }).not.toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, Symbol('mi'));
      }).not.toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, Symbol(-6));
      }).not.toThrow(TypeError);
    });

    it('throws TypeError when non-symbol values given', () => {
      const rule: SymbolValidationRule = SymbolValidationRule.of();

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
        rule.evaluate({}, false);
      }).toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, true);
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
