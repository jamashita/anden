import { BigIntValidationRule } from '../BigIntValidationRule.js';

describe('BigIntValidationRule', () => {
  describe('evaluate', () => {
    it.each`
    value
    ${20n}
    ${0n}
    ${-19n}
    `('does not throw any Error', ({ value }: { value: bigint; }) => {
      const rule: BigIntValidationRule = BigIntValidationRule.of();

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
    ${Symbol()}
    ${{}}
    ${[]}
    `('throws TypeError when non-bigint $value given', ({ value }: { value: unknown; }) => {
      const rule: BigIntValidationRule = BigIntValidationRule.of();

      expect(() => {
        rule.evaluate({}, value);
      }).toThrow(TypeError);
    });

    it.each`
    value
    ${-1n}
    ${0n}
    ${1n}
    ${2n}
    ${3n}
    `('does not throw TypeError when given $value is less than value', ({ value }: { value: bigint; }) => {
      const rule: BigIntValidationRule = BigIntValidationRule.of({
        conditions: [
          {
            operator: '<',
            value: 4n
          }
        ]
      });

      expect(() => {
        rule.evaluate({}, value);
      }).not.toThrow(TypeError);
    });

    it.each`
    value
    ${4n}
    `('throws TypeError when given $value is less than value', ({ value }: { value: bigint; }) => {
      const rule: BigIntValidationRule = BigIntValidationRule.of({
        conditions: [
          {
            operator: '<',
            value: 4n
          }
        ]
      });

      expect(() => {
        rule.evaluate({}, value);
      }).toThrow(TypeError);
    });

    it.each`
    value
    ${-1n}
    ${0n}
    ${1n}
    ${2n}
    ${3n}
    ${4n}
    `('does not throw TypeError when given $value is less than or equal to value', ({ value }: { value: bigint; }) => {
      const rule: BigIntValidationRule = BigIntValidationRule.of({
        conditions: [
          {
            operator: '<=',
            value: 4n
          }
        ]
      });

      expect(() => {
        rule.evaluate({}, value);
      }).not.toThrow(TypeError);
    });

    it.each`
    value
    ${5n}
    `('does not throw TypeError when given $value is greater than value', ({ value }: { value: bigint; }) => {
      const rule: BigIntValidationRule = BigIntValidationRule.of({
        conditions: [
          {
            operator: '<=',
            value: 4n
          }
        ]
      });

      expect(() => {
        rule.evaluate({}, value);
      }).toThrow(TypeError);
    });

    it.each`
    value
    ${-1n}
    ${0n}
    ${1n}
    ${2n}
    ${3n}
    ${5n}
    `('throws TypeError when given $value is greater than value', ({ value }: { value: bigint; }) => {
      const rule: BigIntValidationRule = BigIntValidationRule.of({
        conditions: [
          {
            operator: '=',
            value: 4n
          }
        ]
      });

      expect(() => {
        rule.evaluate({}, value);
      }).toThrow(TypeError);
    });

    it.each`
    value
    ${4n}
    `('does not throw TypeError when given $value is equal to value', ({ value }: { value: bigint; }) => {
      const rule: BigIntValidationRule = BigIntValidationRule.of({
        conditions: [
          {
            operator: '=',
            value: 4n
          }
        ]
      });

      expect(() => {
        rule.evaluate({}, value);
      }).not.toThrow(TypeError);
    });

    it.each`
    value
    ${8n}
    ${7n}
    ${6n}
    ${5n}
    `('does not throw TypeError when given $value is greater than value', ({ value }: { value: bigint; }) => {
      const rule: BigIntValidationRule = BigIntValidationRule.of({
        conditions: [
          {
            operator: '>',
            value: 4n
          }
        ]
      });

      expect(() => {
        rule.evaluate({}, value);
      }).not.toThrow(TypeError);
    });

    it.each`
    value
    ${4n}
    `('throws TypeError when given $value is greater than value', ({ value }: { value: bigint; }) => {
      const rule: BigIntValidationRule = BigIntValidationRule.of({
        conditions: [
          {
            operator: '>',
            value: 4n
          }
        ]
      });

      expect(() => {
        rule.evaluate({}, value);
      }).toThrow(TypeError);
    });

    it.each`
    value
    ${8n}
    ${7n}
    ${6n}
    ${5n}
    ${4n}
    `('does not throw TypeError when given $value is greater than or equal to value', ({ value }: { value: bigint; }) => {
      const rule: BigIntValidationRule = BigIntValidationRule.of({
        conditions: [
          {
            operator: '>=',
            value: 4n
          }
        ]
      });

      expect(() => {
        rule.evaluate({}, value);
      }).not.toThrow(TypeError);
    });

    it.each`
    value
    ${3n}
    `('does not throw TypeError when given $value is greater than or equal to value', ({ value }: { value: bigint; }) => {
      const rule: BigIntValidationRule = BigIntValidationRule.of({
        conditions: [
          {
            operator: '>=',
            value: 4n
          }
        ]
      });

      expect(() => {
        rule.evaluate({}, value);
      }).toThrow(TypeError);
    });

    it.each`
    value
    ${-1n}
    ${0n}
    ${1n}
    ${2n}
    ${3n}
    ${5n}
    `('does not throw TypeError when given $value is not equal to value', ({ value }: { value: bigint; }) => {
      const rule: BigIntValidationRule = BigIntValidationRule.of({
        conditions: [
          {
            operator: '!=',
            value: 4n
          }
        ]
      });

      expect(() => {
        rule.evaluate({}, value);
      }).not.toThrow(TypeError);
    });

    it.each`
    value
    ${4n}
    `('throws TypeError when given $value is not equal to value', ({ value }: { value: bigint; }) => {
      const rule: BigIntValidationRule = BigIntValidationRule.of({
        conditions: [
          {
            operator: '!=',
            value: 4n
          }
        ]
      });

      expect(() => {
        rule.evaluate({}, value);
      }).toThrow(TypeError);
    });
  });
});
