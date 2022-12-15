import 'reflect-metadata';
import { BigIntValidation } from '../BigIntValidation';
import { Validate } from '../Validate';

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

    it('throws TypeError when non-bigint values given', () => {
      const validation: MockValidation = new MockValidation();

      expect(() => {
        validation.act1(null);
      }).toThrow(TypeError);
      expect(() => {
        validation.act1(undefined);
      }).toThrow(TypeError);
      expect(() => {
        validation.act1('');
      }).toThrow(TypeError);
      expect(() => {
        validation.act1('123');
      }).toThrow(TypeError);
      expect(() => {
        validation.act1('abcd');
      }).toThrow(TypeError);
      expect(() => {
        validation.act1(123);
      }).toThrow(TypeError);
      expect(() => {
        validation.act1(0);
      }).toThrow(TypeError);
      expect(() => {
        validation.act1(false);
      }).toThrow(TypeError);
      expect(() => {
        validation.act1(true);
      }).toThrow(TypeError);
      expect(() => {
        validation.act1(Symbol('p'));
      }).toThrow(TypeError);
      expect(() => {
        validation.act1({});
      }).toThrow(TypeError);
      expect(() => {
        validation.act1([]);
      }).toThrow(TypeError);
    });

    it('throws TypeError when given value is less than value', () => {
      const validation: MockValidation = new MockValidation();

      expect(() => {
        validation.act2(-1n);
      }).toThrow(TypeError);
      expect(() => {
        validation.act2(0n);
      }).toThrow(TypeError);
      expect(() => {
        validation.act2(1n);
      }).toThrow(TypeError);
      expect(() => {
        validation.act2(2n);
      }).toThrow(TypeError);
      expect(() => {
        validation.act2(3n);
      }).toThrow(TypeError);
      expect(() => {
        validation.act2(4n);
      }).toThrow(TypeError);
      expect(() => {
        validation.act2(5n);
      }).not.toThrow(TypeError);
      expect(() => {
        validation.act2(6n);
      }).not.toThrow(TypeError);
      expect(() => {
        validation.act2(7n);
      }).not.toThrow(TypeError);
      expect(() => {
        validation.act2(8n);
      }).not.toThrow(TypeError);
    });

    it('throws TypeError when given value is less than or equal to value', () => {
      const validation: MockValidation = new MockValidation();

      expect(() => {
        validation.act3(-1n);
      }).toThrow(TypeError);
      expect(() => {
        validation.act3(0n);
      }).toThrow(TypeError);
      expect(() => {
        validation.act3(1n);
      }).toThrow(TypeError);
      expect(() => {
        validation.act3(2n);
      }).toThrow(TypeError);
      expect(() => {
        validation.act3(3n);
      }).toThrow(TypeError);
      expect(() => {
        validation.act3(4n);
      }).not.toThrow(TypeError);
      expect(() => {
        validation.act3(5n);
      }).not.toThrow(TypeError);
      expect(() => {
        validation.act3(6n);
      }).not.toThrow(TypeError);
      expect(() => {
        validation.act3(7n);
      }).not.toThrow(TypeError);
      expect(() => {
        validation.act3(8n);
      }).not.toThrow(TypeError);
    });

    it('throws TypeError when given value is greater than value', () => {
      const validation: MockValidation = new MockValidation();

      expect(() => {
        validation.act4(-1n);
      }).not.toThrow(TypeError);
      expect(() => {
        validation.act4(0n);
      }).not.toThrow(TypeError);
      expect(() => {
        validation.act4(1n);
      }).not.toThrow(TypeError);
      expect(() => {
        validation.act4(2n);
      }).not.toThrow(TypeError);
      expect(() => {
        validation.act4(3n);
      }).not.toThrow(TypeError);
      expect(() => {
        validation.act4(4n);
      }).toThrow(TypeError);
      expect(() => {
        validation.act4(5n);
      }).toThrow(TypeError);
      expect(() => {
        validation.act4(6n);
      }).toThrow(TypeError);
      expect(() => {
        validation.act4(7n);
      }).toThrow(TypeError);
      expect(() => {
        validation.act4(8n);
      }).toThrow(TypeError);
    });

    it('throws TypeError when given value is greater than or equal to value', () => {
      const validation: MockValidation = new MockValidation();

      expect(() => {
        validation.act5(-1n);
      }).not.toThrow(TypeError);
      expect(() => {
        validation.act5(0n);
      }).not.toThrow(TypeError);
      expect(() => {
        validation.act5(1n);
      }).not.toThrow(TypeError);
      expect(() => {
        validation.act5(2n);
      }).not.toThrow(TypeError);
      expect(() => {
        validation.act5(3n);
      }).not.toThrow(TypeError);
      expect(() => {
        validation.act5(4n);
      }).not.toThrow(TypeError);
      expect(() => {
        validation.act5(5n);
      }).toThrow(TypeError);
      expect(() => {
        validation.act5(6n);
      }).toThrow(TypeError);
      expect(() => {
        validation.act5(7n);
      }).toThrow(TypeError);
      expect(() => {
        validation.act5(8n);
      }).toThrow(TypeError);
    });

    it('throws TypeError when given value is not equal to value', () => {
      const validation: MockValidation = new MockValidation();

      expect(() => {
        validation.act6(-1n);
      }).toThrow(TypeError);
      expect(() => {
        validation.act6(0n);
      }).toThrow(TypeError);
      expect(() => {
        validation.act6(1n);
      }).toThrow(TypeError);
      expect(() => {
        validation.act6(2n);
      }).toThrow(TypeError);
      expect(() => {
        validation.act6(3n);
      }).toThrow(TypeError);
      expect(() => {
        validation.act6(4n);
      }).not.toThrow(TypeError);
      expect(() => {
        validation.act6(5n);
      }).toThrow(TypeError);
      expect(() => {
        validation.act6(6n);
      }).toThrow(TypeError);
      expect(() => {
        validation.act6(7n);
      }).toThrow(TypeError);
      expect(() => {
        validation.act6(8n);
      }).toThrow(TypeError);
    });

    it('throws TypeError when given value is equal to value', () => {
      const validation: MockValidation = new MockValidation();

      expect(() => {
        validation.act7(-1n);
      }).not.toThrow(TypeError);
      expect(() => {
        validation.act7(0n);
      }).not.toThrow(TypeError);
      expect(() => {
        validation.act7(1n);
      }).not.toThrow(TypeError);
      expect(() => {
        validation.act7(2n);
      }).not.toThrow(TypeError);
      expect(() => {
        validation.act7(3n);
      }).not.toThrow(TypeError);
      expect(() => {
        validation.act7(4n);
      }).toThrow(TypeError);
      expect(() => {
        validation.act7(5n);
      }).not.toThrow(TypeError);
      expect(() => {
        validation.act7(6n);
      }).not.toThrow(TypeError);
      expect(() => {
        validation.act7(7n);
      }).not.toThrow(TypeError);
      expect(() => {
        validation.act7(8n);
      }).not.toThrow(TypeError);
    });
  });
});
