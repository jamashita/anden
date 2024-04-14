import 'reflect-metadata';
import { NumberValidation } from '../NumberValidation.js';
import { Validate } from '../Validate.js';

class MockValidation {
  @Validate()
  public act1(@NumberValidation() _s: unknown): void {
    // NOOP
  }

  @Validate()
  public act10(@NumberValidation({ noInfinity: true }) _s: unknown): void {
    // NOOP
  }

  @Validate()
  public act2(
    @NumberValidation({
      conditions: [
        {
          operator: '>',
          value: 4
        }
      ]
    })
    _s: unknown
  ): void {
    // NOOP
  }

  @Validate()
  public act3(
    @NumberValidation({
      conditions: [
        {
          operator: '>=',
          value: 4
        }
      ]
    })
    _s: unknown
  ): void {
    // NOOP
  }

  @Validate()
  public act4(
    @NumberValidation({
      conditions: [
        {
          operator: '<',
          value: 4
        }
      ]
    })
    _s: unknown
  ): void {
    // NOOP
  }

  @Validate()
  public act5(
    @NumberValidation({
      conditions: [
        {
          operator: '<=',
          value: 4
        }
      ]
    })
    _s: unknown
  ): void {
    // NOOP
  }

  @Validate()
  public act6(
    @NumberValidation({
      conditions: [
        {
          operator: '=',
          value: 4
        }
      ]
    })
    _s: unknown
  ): void {
    // NOOP
  }

  @Validate()
  public act7(
    @NumberValidation({
      conditions: [
        {
          operator: '!=',
          value: 4
        }
      ]
    })
    _s: unknown
  ): void {
    // NOOP
  }

  @Validate()
  public act8(@NumberValidation({ int: true }) _s: unknown): void {
    // NOOP
  }

  @Validate()
  public act9(@NumberValidation({ noNaN: true }) _s: unknown): void {
    // NOOP
  }
}

describe('StringValidation', () => {
  describe('decorator', () => {
    it.each`
      value
      ${-1}
      ${-1.01}
      ${0}
      ${1}
      ${1.09}
      ${Number.NEGATIVE_INFINITY}
      ${Number.NaN}
      ${Number.POSITIVE_INFINITY}
    `('does not throw any Error', ({ value }: { value: unknown }) => {
      const validation: MockValidation = new MockValidation();

      expect(() => {
        validation.act1(value);
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
      const validation: MockValidation = new MockValidation();

      expect(() => {
        validation.act1(value);
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
    `('throws TypeError when given value is less than 4', ({ value }: { value: unknown }) => {
      const validation: MockValidation = new MockValidation();

      expect(() => {
        validation.act2(value);
      }).toThrow(TypeError);
    });

    it.each`
      value
      ${4.4}
      ${5}
      ${6}
      ${7}
      ${7.1}
      ${8}
      ${Number.POSITIVE_INFINITY}
    `('does not throw any Error when given value is greater than 4', ({ value }: { value: unknown }) => {
      const validation: MockValidation = new MockValidation();

      expect(() => {
        validation.act2(value);
      }).not.toThrow(TypeError);
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
    `('throws TypeError when given value is less than or equal to 4', ({ value }: { value: unknown }) => {
      const validation: MockValidation = new MockValidation();

      expect(() => {
        validation.act3(value);
      }).toThrow(TypeError);
    });

    it.each`
      value
      ${4}
      ${4.4}
      ${5}
      ${6}
      ${7}
      ${7.1}
      ${8}
      ${Number.POSITIVE_INFINITY}
    `('does not throw any Error when given value is greater than or equal to 4', ({ value }: { value: unknown }) => {
      const validation: MockValidation = new MockValidation();

      expect(() => {
        validation.act3(value);
      }).not.toThrow(TypeError);
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
    `('does not throw any Error when given value is less than 4', ({ value }: { value: unknown }) => {
      const validation: MockValidation = new MockValidation();

      expect(() => {
        validation.act4(value);
      }).not.toThrow(TypeError);
    });

    it.each`
      value
      ${4}
      ${4.4}
      ${5}
      ${6}
      ${7}
      ${7.1}
      ${8}
      ${Number.POSITIVE_INFINITY}
    `('throws TypeError when given value is greater than 4', ({ value }: { value: unknown }) => {
      const validation: MockValidation = new MockValidation();

      expect(() => {
        validation.act4(value);
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
    `('does not throw TypeError when given value is less than or equal to 4', ({ value }: { value: unknown }) => {
      const validation: MockValidation = new MockValidation();

      expect(() => {
        validation.act5(value);
      }).not.toThrow(TypeError);
    });

    it.each`
      value
      ${4.4}
      ${5}
      ${6}
      ${7}
      ${7.1}
      ${8}
      ${Number.POSITIVE_INFINITY}
    `('does not throw any Error when given value is greater than or equal to 4', ({ value }: { value: unknown }) => {
      const validation: MockValidation = new MockValidation();

      expect(() => {
        validation.act5(value);
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
      ${4.4}
      ${5}
      ${6}
      ${7}
      ${7.1}
      ${8}
      ${Number.POSITIVE_INFINITY}
    `('throws TypeError when given value is not equal to 4', ({ value }: { value: unknown }) => {
      const validation: MockValidation = new MockValidation();

      expect(() => {
        validation.act6(value);
      }).toThrow(TypeError);
    });

    it.each`
      value
      ${4}
    `('does not throw TypeError when given value is not equal to 4', ({ value }: { value: unknown }) => {
      const validation: MockValidation = new MockValidation();

      expect(() => {
        validation.act6(value);
      }).not.toThrow(TypeError);
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
      ${4.4}
      ${5}
      ${6}
      ${7}
      ${7.1}
      ${8}
      ${Number.POSITIVE_INFINITY}
    `('does not throw TypeError when given value is equal to 4', ({ value }: { value: unknown }) => {
      const validation: MockValidation = new MockValidation();

      expect(() => {
        validation.act7(value);
      }).not.toThrow(TypeError);
    });

    it.each`
      value
      ${4}
    `('throws TypeError when given value is equal to 4', ({ value }: { value: unknown }) => {
      const validation: MockValidation = new MockValidation();

      expect(() => {
        validation.act7(value);
      }).toThrow(TypeError);
    });

    it.each`
      value
      ${1.1}
      ${-1.3}
    `('throws TypeError when decimal number given if int is set to true', ({ value }: { value: unknown }) => {
      const validation: MockValidation = new MockValidation();

      expect(() => {
        validation.act8(value);
      }).toThrow(TypeError);
    });

    it.each`
      value
      ${4.0}
      ${-2}
    `('does not throw TypeError when decimal number given if int is set to true', ({ value }: { value: unknown }) => {
      const validation: MockValidation = new MockValidation();

      expect(() => {
        validation.act8(value);
      }).not.toThrow(TypeError);
    });

    it.each`
      value
      ${1.1}
      ${4.0}
      ${-2}
    `('does not throw TypeError when NaN given if noNaN is set to true', ({ value }: { value: unknown }) => {
      const validation: MockValidation = new MockValidation();

      expect(() => {
        validation.act9(value);
      }).not.toThrow(TypeError);
    });

    it.each`
      value
      ${Number.NaN}
    `('throws TypeError when NaN given if noNaN is set to true', ({ value }: { value: unknown }) => {
      const validation: MockValidation = new MockValidation();

      expect(() => {
        validation.act9(value);
      }).toThrow(TypeError);
    });

    it.each`
      value
      ${1.1}
      ${4.0}
      ${-2}
    `('does not throw TypeError when Infinity of -Infinity given if noInfinity is set to true', ({ value }: { value: unknown }) => {
      const validation: MockValidation = new MockValidation();

      expect(() => {
        validation.act10(value);
      }).not.toThrow(TypeError);
    });

    it.each`
      value
      ${Number.POSITIVE_INFINITY}
      ${Number.NEGATIVE_INFINITY}
    `('throws TypeError when Infinity of -Infinity given if noInfinity is set to true', ({ value }: { value: unknown }) => {
      const validation: MockValidation = new MockValidation();

      expect(() => {
        validation.act10(value);
      }).toThrow(TypeError);
    });
  });
});
