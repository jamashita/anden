import { BigIntValidationRule } from '../BigIntValidationRule';

describe('BigIntValidationRule', () => {
  describe('evaluate', () => {
    it('does not throw any Error', () => {
      const rule: BigIntValidationRule = BigIntValidationRule.of();

      expect(() => {
        rule.evaluate({}, 20n);
      }).not.toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, 0n);
      }).not.toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, -19n);
      }).not.toThrow(TypeError);
    });

    it('throws TypeError when non-bigint values given', () => {
      const rule: BigIntValidationRule = BigIntValidationRule.of();

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
        rule.evaluate({}, Symbol('p'));
      }).toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, {});
      }).toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, []);
      }).toThrow(TypeError);
    });

    it('throws TypeError when given value is less than min', () => {
      const rule: BigIntValidationRule = BigIntValidationRule.of({
        min: {
          condition: 't',
          value: 4n
        }
      });

      expect(() => {
        rule.evaluate({}, -1n);
      }).toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, 0n);
      }).toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, 1n);
      }).toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, 2n);
      }).toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, 3n);
      }).toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, 4n);
      }).not.toThrow(TypeError);
    });

    it('throws TypeError when given value is less than or equals to min', () => {
      const rule: BigIntValidationRule = BigIntValidationRule.of({
        min: {
          condition: 'te',
          value: 4n
        }
      });

      expect(() => {
        rule.evaluate({}, -1n);
      }).toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, 0n);
      }).toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, 1n);
      }).toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, 2n);
      }).toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, 3n);
      }).toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, 4n);
      }).toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, 5n);
      }).not.toThrow(TypeError);
    });

    it('throws TypeError when given value is greater than max', () => {
      const rule: BigIntValidationRule = BigIntValidationRule.of({
        max: {
          condition: 't',
          value: 4n
        }
      });

      expect(() => {
        rule.evaluate({}, 8n);
      }).toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, 7n);
      }).toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, 6n);
      }).toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, 5n);
      }).toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, 4n);
      }).not.toThrow(TypeError);
    });

    it('throws TypeError when given value is greater than or equals to min', () => {
      const rule: BigIntValidationRule = BigIntValidationRule.of({
        max: {
          condition: 'te',
          value: 4n
        }
      });

      expect(() => {
        rule.evaluate({}, 8n);
      }).toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, 7n);
      }).toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, 6n);
      }).toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, 5n);
      }).toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, 4n);
      }).toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, 3n);
      }).not.toThrow(TypeError);
    });
  });
});
