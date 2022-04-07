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
    min: {
      condition: 't',
      value: 4n
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  }) _s: unknown): void {
    // NOOP
  }

  @Validate()
  public act3(@BigIntValidation({
    min: {
      condition: 'te',
      value: 4n
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  }) _s: unknown): void {
    // NOOP
  }

  @Validate()
  public act4(@BigIntValidation({
    max: {
      condition: 't',
      value: 4n
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  }) _s: unknown): void {
    // NOOP
  }

  @Validate()
  public act5(@BigIntValidation({
    max: {
      condition: 'te',
      value: 4n
    }
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

    it('throws TypeError when given value is less than min', () => {
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
      }).not.toThrow(TypeError);
    });

    it('throws TypeError when given value is less than or equals to min', () => {
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
        validation.act3(4);
      }).toThrow(TypeError);
    });

    it('throws TypeError when given value is greater than min', () => {
      const validation: MockValidation = new MockValidation();

      expect(() => {
        validation.act4(8n);
      }).toThrow(TypeError);
      expect(() => {
        validation.act4(7n);
      }).toThrow(TypeError);
      expect(() => {
        validation.act4(6n);
      }).toThrow(TypeError);
      expect(() => {
        validation.act4(5n);
      }).toThrow(TypeError);
      expect(() => {
        validation.act4(4n);
      }).not.toThrow(TypeError);
    });

    it('throws TypeError when given value is greater than or equals to min', () => {
      const validation: MockValidation = new MockValidation();

      expect(() => {
        validation.act5(8n);
      }).toThrow(TypeError);
      expect(() => {
        validation.act5(7n);
      }).toThrow(TypeError);
      expect(() => {
        validation.act5(6n);
      }).toThrow(TypeError);
      expect(() => {
        validation.act5(5n);
      }).toThrow(TypeError);
      expect(() => {
        validation.act5(4n);
      }).toThrow(TypeError);
    });
  });
});
