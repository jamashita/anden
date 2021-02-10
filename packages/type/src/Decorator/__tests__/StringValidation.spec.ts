// eslint-disable-next-line max-classes-per-file
import 'reflect-metadata';
import { StringValidation } from '../StringValidation';
import { Validate } from '../Validate';

class MockValidation {
  @Validate()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public act1(@StringValidation() _s: unknown): void {
    // NOOP
  }

  @Validate()
  public act2(@StringValidation({
    type: 'numerical'
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  }) _s: unknown): void {
    // NOOP
  }

  @Validate()
  public act3(@StringValidation({
    type: 'pattern',
    pattern: /^a.*b$/iu
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  }) _s: unknown): void {
    // NOOP
  }

  @Validate()
  public act4(@StringValidation({
    type: 'length',
    min: 4
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  }) _s: unknown): void {
    // NOOP
  }

  @Validate()
  public act5(@StringValidation({
    type: 'length',
    max: 4
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  }) _s: unknown): void {
    // NOOP
  }

  @Validate()
  public act6(@StringValidation({
    type: 'length',
    min: 4,
    max: 6
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  }) _s: unknown): void {
    // NOOP
  }
}

describe('StringValidation', () => {
  describe('decorator', () => {
    it('does not throw any Error', () => {
      expect.assertions(1);

      const validation: MockValidation = new MockValidation();

      expect(() => {
        validation.act1('');
      }).not.toThrow(TypeError);
    });

    it('throws TypeError when non-string values given', () => {
      expect.assertions(10);

      const validation: MockValidation = new MockValidation();

      expect(() => {
        validation.act1(null);
      }).toThrow(TypeError);
      expect(() => {
        validation.act1(undefined);
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
        validation.act1(20n);
      }).toThrow(TypeError);
      expect(() => {
        validation.act1({});
      }).toThrow(TypeError);
      expect(() => {
        validation.act1([]);
      }).toThrow(TypeError);
    });

    it('does not throw any Error when given string can be converted to number', () => {
      expect.assertions(4);

      const validation: MockValidation = new MockValidation();

      expect(() => {
        validation.act2('123');
      }).not.toThrow(TypeError);
      expect(() => {
        validation.act2('-123');
      }).not.toThrow(TypeError);
      expect(() => {
        validation.act2('0');
      }).not.toThrow(TypeError);
      expect(() => {
        validation.act2('0.18');
      }).not.toThrow(TypeError);
    });

    it('throws TypeError when given string cannot be converted to number', () => {
      expect.assertions(7);

      const validation: MockValidation = new MockValidation();

      expect(() => {
        validation.act2('1.2.3');
      }).toThrow(TypeError);
      expect(() => {
        validation.act2('0..');
      }).toThrow(TypeError);
      expect(() => {
        validation.act2('0..10');
      }).toThrow(TypeError);
      expect(() => {
        validation.act2('a');
      }).toThrow(TypeError);
      expect(() => {
        validation.act2('a');
      }).toThrow(TypeError);
      expect(() => {
        validation.act2('-Infinity');
      }).toThrow(TypeError);
      expect(() => {
        validation.act2('NaN');
      }).toThrow(TypeError);
    });

    it('throws TypeError when string pattern does not match', () => {
      expect.assertions(8);

      const validation: MockValidation = new MockValidation();

      expect(() => {
        validation.act3('a');
      }).toThrow(TypeError);
      expect(() => {
        validation.act3('b');
      }).toThrow(TypeError);
      expect(() => {
        validation.act3('ab');
      }).not.toThrow(TypeError);
      expect(() => {
        validation.act3('ba');
      }).toThrow(TypeError);
      expect(() => {
        validation.act3('aab');
      }).not.toThrow(TypeError);
      expect(() => {
        validation.act3('abb');
      }).not.toThrow(TypeError);
      expect(() => {
        validation.act3('acb');
      }).not.toThrow(TypeError);
      expect(() => {
        validation.act3('abcab');
      }).not.toThrow(TypeError);
    });

    it('throws TypeError when less than min string length given', () => {
      expect.assertions(5);

      const validation: MockValidation = new MockValidation();

      expect(() => {
        validation.act4('');
      }).toThrow(TypeError);
      expect(() => {
        validation.act4('p');
      }).toThrow(TypeError);
      expect(() => {
        validation.act4('pq');
      }).toThrow(TypeError);
      expect(() => {
        validation.act4('pqw');
      }).toThrow(TypeError);
      expect(() => {
        validation.act4('pqwo');
      }).not.toThrow(TypeError);
    });

    it('throws TypeError when greater than max string length given', () => {
      expect.assertions(5);

      const validation: MockValidation = new MockValidation();

      expect(() => {
        validation.act5('pqwo1029');
      }).toThrow(TypeError);
      expect(() => {
        validation.act5('pqwo102');
      }).toThrow(TypeError);
      expect(() => {
        validation.act5('pqwo10');
      }).toThrow(TypeError);
      expect(() => {
        validation.act5('pqwo1');
      }).toThrow(TypeError);
      expect(() => {
        validation.act5('pqwo');
      }).not.toThrow(TypeError);
    });

    it('throws TypeError when given value is less than min and greater than max string length given', () => {
      expect.assertions(7);

      const validation: MockValidation = new MockValidation();

      expect(() => {
        validation.act6('pq');
      }).toThrow(TypeError);
      expect(() => {
        validation.act6('pqw');
      }).toThrow(TypeError);
      expect(() => {
        validation.act6('pqwo');
      }).not.toThrow(TypeError);
      expect(() => {
        validation.act6('pqwo1');
      }).not.toThrow(TypeError);
      expect(() => {
        validation.act6('pqwo10');
      }).not.toThrow(TypeError);
      expect(() => {
        validation.act6('pqwo102');
      }).toThrow(TypeError);
      expect(() => {
        validation.act6('pqwo1029');
      }).toThrow(TypeError);
    });
  });
});
