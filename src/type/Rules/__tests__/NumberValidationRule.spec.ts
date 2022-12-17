import { NumberValidationRule } from '../NumberValidationRule.js';

describe('NumberValidationRule', () => {
  describe('evaluate', () => {
    it('does not throw any Error', () => {
      const rule: NumberValidationRule = NumberValidationRule.of();

      expect(() => {
        rule.evaluate({}, -1);
      }).not.toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, 0);
      }).not.toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, 1);
      }).not.toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, -Infinity);
      }).not.toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, NaN);
      }).not.toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, Infinity);
      }).not.toThrow(TypeError);
    });

    it('throws TypeError when non-number values given', () => {
      const rule: NumberValidationRule = NumberValidationRule.of();

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
        rule.evaluate({}, false);
      }).toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, true);
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

    it('throws TypeError when given value is greater than value', () => {
      const rule: NumberValidationRule = NumberValidationRule.of({
        conditions: [
          {
            operator: '<',
            value: 4
          }
        ]
      });

      expect(() => {
        rule.evaluate({}, -Infinity);
      }).not.toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, -1);
      }).not.toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, -0.1);
      }).not.toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, 0);
      }).not.toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, 1);
      }).not.toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, 2);
      }).not.toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, 3);
      }).not.toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, 3.5);
      }).not.toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, 4);
      }).toThrow(TypeError);
    });

    it('throws TypeError when given value is greater than or equal to value', () => {
      const rule: NumberValidationRule = NumberValidationRule.of({
        conditions: [
          {
            operator: '<=',
            value: 4
          }
        ]
      });

      expect(() => {
        rule.evaluate({}, -Infinity);
      }).not.toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, -1);
      }).not.toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, -0.1);
      }).not.toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, 0);
      }).not.toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, 1);
      }).not.toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, 2);
      }).not.toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, 3);
      }).not.toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, 3.5);
      }).not.toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, 4);
      }).not.toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, 5);
      }).toThrow(TypeError);
    });

    it('throws TypeError when given value is not equal to value', () => {
      const rule: NumberValidationRule = NumberValidationRule.of({
        conditions: [
          {
            operator: '=',
            value: 4
          }
        ]
      });

      expect(() => {
        rule.evaluate({}, Infinity);
      }).toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, 8);
      }).toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, 7.1);
      }).toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, 7);
      }).toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, 6);
      }).toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, 5);
      }).toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, 4.4);
      }).toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, 4);
      }).not.toThrow(TypeError);
    });

    it('throws TypeError when given value is less than value', () => {
      const rule: NumberValidationRule = NumberValidationRule.of({
        conditions: [
          {
            operator: '>',
            value: 4
          }
        ]
      });

      expect(() => {
        rule.evaluate({}, Infinity);
      }).not.toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, 8);
      }).not.toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, 7.1);
      }).not.toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, 7);
      }).not.toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, 6);
      }).not.toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, 5);
      }).not.toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, 4.4);
      }).not.toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, 4);
      }).toThrow(TypeError);
    });

    it('throws TypeError when given value is less than or equal to value', () => {
      const rule: NumberValidationRule = NumberValidationRule.of({
        conditions: [
          {
            operator: '>=',
            value: 4
          }
        ]
      });

      expect(() => {
        rule.evaluate({}, Infinity);
      }).not.toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, 8);
      }).not.toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, 7.1);
      }).not.toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, 7);
      }).not.toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, 6);
      }).not.toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, 5);
      }).not.toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, 4.4);
      }).not.toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, 4);
      }).not.toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, 3);
      }).toThrow(TypeError);
    });

    it('throws TypeError when given value is equal to value', () => {
      const rule: NumberValidationRule = NumberValidationRule.of({
        conditions: [
          {
            operator: '!=',
            value: 4
          }
        ]
      });

      expect(() => {
        rule.evaluate({}, Infinity);
      }).not.toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, 8);
      }).not.toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, 7.1);
      }).not.toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, 7);
      }).not.toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, 6);
      }).not.toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, 5);
      }).not.toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, 4.4);
      }).not.toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, 4);
      }).toThrow(TypeError);
    });

    it('throws TypeError when decimal number given if int is set to true', () => {
      const rule: NumberValidationRule = NumberValidationRule.of({
        int: true
      });

      expect(() => {
        rule.evaluate({}, 1.1);
      }).toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, 4.0);
      }).not.toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, -1.3);
      }).toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, -2);
      }).not.toThrow(TypeError);
    });

    it('does not throw any Error when int is set to false', () => {
      const rule: NumberValidationRule = NumberValidationRule.of({
        int: false
      });

      expect(() => {
        rule.evaluate({}, 1.1);
      }).not.toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, 4.0);
      }).not.toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, -1.3);
      }).not.toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, -2);
      }).not.toThrow(TypeError);
    });

    it('will throw the same response if omitted in case of int is set to false', () => {
      const rule: NumberValidationRule = NumberValidationRule.of();

      expect(() => {
        rule.evaluate({}, 1.1);
      }).not.toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, 4.0);
      }).not.toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, -1.3);
      }).not.toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, -2);
      }).not.toThrow(TypeError);
    });

    it('throws TypeError when NaN given if noNaN is set to true', () => {
      const rule: NumberValidationRule = NumberValidationRule.of({
        noNaN: true
      });

      expect(() => {
        rule.evaluate({}, 1.1);
      }).not.toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, 4.0);
      }).not.toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, -2);
      }).not.toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, NaN);
      }).toThrow(TypeError);
    });

    it('does not throw any Error when noNaN is set to false', () => {
      const rule: NumberValidationRule = NumberValidationRule.of({
        noNaN: false
      });

      expect(() => {
        rule.evaluate({}, NaN);
      }).not.toThrow(TypeError);
    });

    it('will throw the same response if omitted in case of noNaN is set to false', () => {
      const rule: NumberValidationRule = NumberValidationRule.of();

      expect(() => {
        rule.evaluate({}, NaN);
      }).not.toThrow(TypeError);
    });

    it('throws TypeError when Infinity of -Inifinity given if noInfinity is set to true', () => {
      const rule: NumberValidationRule = NumberValidationRule.of({
        noInfinity: true
      });

      expect(() => {
        rule.evaluate({}, 1.1);
      }).not.toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, 4.0);
      }).not.toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, -2);
      }).not.toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, Infinity);
      }).toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, -Infinity);
      }).toThrow(TypeError);
    });

    it('does not throw any Error when noInfinity is set to false', () => {
      const rule: NumberValidationRule = NumberValidationRule.of({
        noInfinity: false
      });

      expect(() => {
        rule.evaluate({}, Infinity);
      }).not.toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, -Infinity);
      }).not.toThrow(TypeError);
    });

    it('will throw the same response if omitted in case of noInfinity is set to false', () => {
      const rule: NumberValidationRule = NumberValidationRule.of();

      expect(() => {
        rule.evaluate({}, Infinity);
      }).not.toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, -Infinity);
      }).not.toThrow(TypeError);
    });
  });
});
