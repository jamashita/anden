import 'reflect-metadata';
import { BigIntValidation } from '../BigIntValidation.js';
import { Validate } from '../Validate.js';

class MockValidation {
  @Validate()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public act1(@BigIntValidation() _s: unknown): void {
    // NOOP
  }

  @Validate()
  public act2(@BigIntValidation({
    conditions: [
      {
        operator: '>',
        value: 4n
      }
    ]
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  }) _s: unknown): void {
    // NOOP
  }

  @Validate()
  public act3(@BigIntValidation({
    conditions: [
      {
        operator: '>=',
        value: 4n
      }
    ]
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  }) _s: unknown): void {
    // NOOP
  }

  @Validate()
  public act4(@BigIntValidation({
    conditions: [
      {
        operator: '<',
        value: 4n
      }
    ]
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  }) _s: unknown): void {
    // NOOP
  }

  @Validate()
  public act5(@BigIntValidation({
    conditions: [
      {
        operator: '<=',
        value: 4n
      }
    ]
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  }) _s: unknown): void {
    // NOOP
  }

  @Validate()
  public act6(@BigIntValidation({
    conditions: [
      {
        operator: '=',
        value: 4n
      }
    ]
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  }) _s: unknown): void {
    // NOOP
  }

  @Validate()
  public act7(@BigIntValidation({
    conditions: [
      {
        operator: '!=',
        value: 4n
      }
    ]
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  }) _s: unknown): void {
    // NOOP
  }
}

describe('BigIntValidation', () => {
  describe('decorator', () => {
    it('does not throw any Error', () => {
      const validation: MockValidation = new MockValidation();

      expect(() => {
        validation.act1(20n);
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
      const validation: MockValidation = new MockValidation();

      expect(() => {
        validation.act1(value);
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
    `('throws TypeError when given $value is less than value', ({ value }: { value: bigint; }) => {
      const validation: MockValidation = new MockValidation();

      expect(() => {
        validation.act2(value);
      }).toThrow(TypeError);
    });

    it.each`
    value
    ${5n}
    ${6n}
    ${7n}
    ${8n}
    `('does not throw TypeError when given $value is greater than value', ({ value }: { value: bigint; }) => {
      const validation: MockValidation = new MockValidation();

      expect(() => {
        validation.act2(value);
      }).not.toThrow(TypeError);
    });

    it.each`
    value
    ${-1n}
    ${0n}
    ${1n}
    ${2n}
    ${3n}
    `('throws TypeError when given $value is less than value', ({ value }: { value: bigint; }) => {
      const validation: MockValidation = new MockValidation();

      expect(() => {
        validation.act3(value);
      }).toThrow(TypeError);
    });

    it.each`
    value
    ${4n}
    ${5n}
    ${6n}
    ${7n}
    ${8n}
    `('does not throw TypeError when given $value is greater than or equal to value', ({ value }: { value: bigint; }) => {
      const validation: MockValidation = new MockValidation();

      expect(() => {
        validation.act3(value);
      }).not.toThrow(TypeError);
    });

    it.each`
    value
    ${4n}
    ${5n}
    ${6n}
    ${7n}
    ${8n}
    `('throws TypeError when given $value is greater than or equal to value', ({ value }: { value: bigint; }) => {
      const validation: MockValidation = new MockValidation();

      expect(() => {
        validation.act4(value);
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
      const validation: MockValidation = new MockValidation();

      expect(() => {
        validation.act4(value);
      }).not.toThrow(TypeError);
    });

    it.each`
    value
    ${5n}
    ${6n}
    ${7n}
    ${8n}
    `('throws TypeError when given $value is greater than value', ({ value }: { value: bigint; }) => {
      const validation: MockValidation = new MockValidation();

      expect(() => {
        validation.act5(value);
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
      const validation: MockValidation = new MockValidation();

      expect(() => {
        validation.act5(value);
      }).not.toThrow(TypeError);
    });

    it.each`
    value
    ${-1n}
    ${0n}
    ${1n}
    ${2n}
    ${3n}
    ${5n}
    ${6n}
    ${7n}
    ${8n}
    `('throws TypeError when given $value is not equal to value', ({ value }: { value: bigint; }) => {
      const validation: MockValidation = new MockValidation();

      expect(() => {
        validation.act6(value);
      }).toThrow(TypeError);
    });

    it.each`
    value
    ${4n}
    `('does not throw TypeError when given $value is equal to value', ({ value }: { value: bigint; }) => {
      const validation: MockValidation = new MockValidation();

      expect(() => {
        validation.act6(value);
      }).not.toThrow(TypeError);
    });

    it.each`
    value
    ${4n}
    `('throws TypeError when given $value is equal to value', ({ value }: { value: bigint; }) => {
      const validation: MockValidation = new MockValidation();

      expect(() => {
        validation.act7(value);
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
    ${6n}
    ${7n}
    ${8n}
    `('does not throw TypeError when given $value is not equal to value', ({ value }: { value: bigint; }) => {
      const validation: MockValidation = new MockValidation();

      expect(() => {
        validation.act7(value);
      }).not.toThrow(TypeError);
    });
  });
});
