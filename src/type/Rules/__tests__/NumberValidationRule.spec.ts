import { NumberValidationRule } from '../NumberValidationRule.js';

describe('NumberValidationRule', () => {
  describe('evaluate', () => {
    it.each`
      value
      ${-1}
      ${0}
      ${1}
      ${Number.NEGATIVE_INFINITY}
      ${Number.NaN}
      ${Number.POSITIVE_INFINITY}
    `('does not throw any Error', ({ value }: { value: number }) => {
      const rule: NumberValidationRule = NumberValidationRule.of();

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
      ${false}
      ${true}
      ${Symbol('p')}
      ${20n}
      ${{}}
      ${[]}
    `('throws TypeError when non-number values given', ({ value }: { value: unknown }) => {
      const rule: NumberValidationRule = NumberValidationRule.of();

      expect(() => {
        rule.evaluate({}, value);
      }).toThrow(TypeError);
    });

    it.each`
      value
      ${Number.NEGATIVE_INFINITY}
      ${-1}
      ${-0.1}
      ${0}
      ${1}
      ${2}
      ${3}
      ${3.5}
    `('does not throw any Error when given value is less than 4', ({ value }: { value: number }) => {
      const rule: NumberValidationRule = NumberValidationRule.of({
        conditions: [
          {
            operator: '<',
            value: 4
          }
        ]
      });

      expect(() => {
        rule.evaluate({}, value);
      }).not.toThrow(TypeError);
    });

    it.each`
      value
      ${4}
    `('throws TypeError when given value is equal to 4', ({ value }: { value: number }) => {
      const rule: NumberValidationRule = NumberValidationRule.of({
        conditions: [
          {
            operator: '<',
            value: 4
          }
        ]
      });

      expect(() => {
        rule.evaluate({}, value);
      }).toThrow(TypeError);
    });

    it.each`
      value
      ${Number.NEGATIVE_INFINITY}
      ${-1}
      ${-0.1}
      ${0}
      ${1}
      ${2}
      ${3}
      ${3.5}
      ${4}
    `('does not throw any Error when given value is less than or equal to 4', ({ value }: { value: number }) => {
      const rule: NumberValidationRule = NumberValidationRule.of({
        conditions: [
          {
            operator: '<=',
            value: 4
          }
        ]
      });

      expect(() => {
        rule.evaluate({}, value);
      }).not.toThrow(TypeError);
    });

    it.each`
      value
      ${5}
    `('throws TypeError when given value is greater than or equal to value', ({ value }: { value: number }) => {
      const rule: NumberValidationRule = NumberValidationRule.of({
        conditions: [
          {
            operator: '<=',
            value: 4
          }
        ]
      });

      expect(() => {
        rule.evaluate({}, value);
      }).toThrow(TypeError);
    });

    it.each`
      value
      ${Number.POSITIVE_INFINITY}
      ${8}
      ${7.1}
      ${7}
      ${6}
      ${5}
      ${4.4}
    `('throws TypeError when given value is greater than value', ({ value }: { value: number }) => {
      const rule: NumberValidationRule = NumberValidationRule.of({
        conditions: [
          {
            operator: '=',
            value: 4
          }
        ]
      });

      expect(() => {
        rule.evaluate({}, value);
      }).toThrow(TypeError);
    });

    it.each`
      value
      ${4}
    `('does not throw any Error when given value is equal to value', ({ value }: { value: number }) => {
      const rule: NumberValidationRule = NumberValidationRule.of({
        conditions: [
          {
            operator: '=',
            value: 4
          }
        ]
      });

      expect(() => {
        rule.evaluate({}, value);
      }).not.toThrow(TypeError);
    });

    it.each`
      value
      ${Number.POSITIVE_INFINITY}
      ${8}
      ${7.1}
      ${7}
      ${6}
      ${5}
      ${4.4}
    `('does not throw any Error when given value is greater than or equal to value', ({ value }: { value: number }) => {
      const rule: NumberValidationRule = NumberValidationRule.of({
        conditions: [
          {
            operator: '>',
            value: 4
          }
        ]
      });

      expect(() => {
        rule.evaluate({}, value);
      }).not.toThrow(TypeError);
    });

    it.each`
      value
      ${4}
    `('throws TypeError when given value is equal to value', ({ value }: { value: number }) => {
      const rule: NumberValidationRule = NumberValidationRule.of({
        conditions: [
          {
            operator: '>',
            value: 4
          }
        ]
      });

      expect(() => {
        rule.evaluate({}, value);
      }).toThrow(TypeError);
    });

    it.each`
      value
      ${Number.POSITIVE_INFINITY}
      ${8}
      ${7.1}
      ${7}
      ${6}
      ${5}
      ${4.4}
      ${4}
    `('does not throw any Error when given value is greater than or equal to value', ({ value }: { value: number }) => {
      const rule: NumberValidationRule = NumberValidationRule.of({
        conditions: [
          {
            operator: '>=',
            value: 4
          }
        ]
      });

      expect(() => {
        rule.evaluate({}, value);
      }).not.toThrow(TypeError);
    });

    it.each`
      value
      ${3}
    `('throws TypeError when given value is equal to value', ({ value }: { value: number }) => {
      const rule: NumberValidationRule = NumberValidationRule.of({
        conditions: [
          {
            operator: '>=',
            value: 4
          }
        ]
      });

      expect(() => {
        rule.evaluate({}, value);
      }).toThrow(TypeError);
    });

    it.each`
      value
      ${Number.POSITIVE_INFINITY}
      ${8}
      ${7.1}
      ${7}
      ${6}
      ${5}
      ${4.4}
    `('does not throw any Error when given value is greater than or equal to value', ({ value }: { value: number }) => {
      const rule: NumberValidationRule = NumberValidationRule.of({
        conditions: [
          {
            operator: '!=',
            value: 4
          }
        ]
      });

      expect(() => {
        rule.evaluate({}, value);
      }).not.toThrow(TypeError);
    });

    it.each`
      value
      ${4}
    `('throws TypeError when given value is equal to value', ({ value }: { value: number }) => {
      const rule: NumberValidationRule = NumberValidationRule.of({
        conditions: [
          {
            operator: '!=',
            value: 4
          }
        ]
      });

      expect(() => {
        rule.evaluate({}, value);
      }).toThrow(TypeError);
    });

    it.each`
      value
      ${4.0}
      ${-2}
    `('does not throw any Error when decimal number given if int is set to true', ({ value }: { value: number }) => {
      const rule: NumberValidationRule = NumberValidationRule.of({
        int: true
      });

      expect(() => {
        rule.evaluate({}, value);
      }).not.toThrow(TypeError);
    });

    it.each`
      value
      ${1.1}
      ${-1.3}
    `('throws TypeError when decimal number given if int is set to true', ({ value }: { value: number }) => {
      const rule: NumberValidationRule = NumberValidationRule.of({
        int: true
      });

      expect(() => {
        rule.evaluate({}, value);
      }).toThrow(TypeError);
    });

    it.each`
      value
      ${1.1}
      ${4.0}
      ${-1.3}
      ${-2}
    `('does not throw any Error when int is set to false', ({ value }: { value: number }) => {
      const rule: NumberValidationRule = NumberValidationRule.of({
        int: false
      });

      expect(() => {
        rule.evaluate({}, value);
      }).not.toThrow(TypeError);
    });

    it.each`
      value
      ${1.1}
      ${4.0}
      ${-1.3}
      ${-2}
    `('will throw the same response if omitted in case of int is set to false', ({ value }: { value: number }) => {
      const rule: NumberValidationRule = NumberValidationRule.of();

      expect(() => {
        rule.evaluate({}, value);
      }).not.toThrow(TypeError);
    });

    it.each`
      value
      ${1.1}
      ${4.0}
      ${-1.3}
    `('does not throw any Error when NaN given if noNaN is set to true', ({ value }: { value: number }) => {
      const rule: NumberValidationRule = NumberValidationRule.of({
        noNaN: true
      });

      expect(() => {
        rule.evaluate({}, value);
      }).not.toThrow(TypeError);
    });

    it.each`
      value
      ${Number.NaN}
    `('throws TypeError when NaN given if noNaN is set to true', ({ value }: { value: number }) => {
      const rule: NumberValidationRule = NumberValidationRule.of({
        noNaN: true
      });

      expect(() => {
        rule.evaluate({}, value);
      }).toThrow(TypeError);
    });

    it('does not throw any Error when noNaN is set to false', () => {
      const rule: NumberValidationRule = NumberValidationRule.of({
        noNaN: false
      });

      expect(() => {
        rule.evaluate({}, Number.NaN);
      }).not.toThrow(TypeError);
    });

    it('will throw the same response if omitted in case of noNaN is set to false', () => {
      const rule: NumberValidationRule = NumberValidationRule.of();

      expect(() => {
        rule.evaluate({}, Number.NaN);
      }).not.toThrow(TypeError);
    });

    it.each`
      value
      ${1.1}
      ${4.0}
      ${-1.3}
      ${-2}
    `('does not throw any Error when Infinity of -Inifinity given if noInfinity is set to true', ({ value }: { value: number }) => {
      const rule: NumberValidationRule = NumberValidationRule.of({
        noInfinity: true
      });

      expect(() => {
        rule.evaluate({}, value);
      }).not.toThrow(TypeError);
    });

    it.each`
      value
      ${Number.POSITIVE_INFINITY}
      ${Number.NEGATIVE_INFINITY}
    `('throws TypeError when Infinity of -Inifinity given if noInfinity is set to true', ({ value }: { value: number }) => {
      const rule: NumberValidationRule = NumberValidationRule.of({
        noInfinity: true
      });

      expect(() => {
        rule.evaluate({}, value);
      }).toThrow(TypeError);
    });

    it.each`
      value
      ${Number.POSITIVE_INFINITY}
      ${Number.NEGATIVE_INFINITY}
    `('does not throw any Error when noInfinity is set to false', ({ value }: { value: number }) => {
      const rule: NumberValidationRule = NumberValidationRule.of({
        noInfinity: false
      });

      expect(() => {
        rule.evaluate({}, value);
      }).not.toThrow(TypeError);
    });

    it.each`
      value
      ${Number.POSITIVE_INFINITY}
      ${Number.NEGATIVE_INFINITY}
    `('will throw the same response if omitted in case of noInfinity is set to false', ({ value }: { value: number }) => {
      const rule: NumberValidationRule = NumberValidationRule.of();

      expect(() => {
        rule.evaluate({}, value);
      }).not.toThrow(TypeError);
    });
  });
});
