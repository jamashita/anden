import 'reflect-metadata';
import { StringValidation } from '../StringValidation.js';
import { Validate } from '../Validate.js';

class MockValidation {
  @Validate()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public act1(@StringValidation() _s: unknown): void {
    // NOOP
  }

  @Validate()
  public act2(@StringValidation({
    type: 'numeric'
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
      const validation: MockValidation = new MockValidation();

      expect(() => {
        validation.act1('');
      }).not.toThrow(TypeError);
    });

    it.each`
    value
    ${null}
    ${undefined}
    ${123}
    ${0}
    ${false}
    ${true}
    ${Symbol('p')}
    ${20n}
    ${{}}
    ${[]}
    `('throws TypeError when non-string values given', ({ value }: { value: unknown; }) => {
      const validation: MockValidation = new MockValidation();

      expect(() => {
        validation.act1(value);
      }).toThrow(TypeError);
    });

    it.each`
    value
    ${'123'}
    ${'-123'}
    ${'0'}
    ${'0.18'}
    `('does not throw any Error when given string can be converted to number', ({ value }: { value: unknown; }) => {
      const validation: MockValidation = new MockValidation();

      expect(() => {
        validation.act2(value);
      }).not.toThrow(TypeError);
    });

    it.each`
    value
    ${'1.2.3'}
    ${'0..'}
    ${'0..10'}
    ${'a'}
    ${'-Infinity'}
    ${'NaN'}
    `('throws TypeError when given string cannot be converted to number', ({ value }: { value: unknown; }) => {
      const validation: MockValidation = new MockValidation();

      expect(() => {
        validation.act2(value);
      }).toThrow(TypeError);
    });

    it.each`
    value
    ${'ab'}
    ${'aab'}
    ${'abb'}
    ${'acb'}
    ${'abcab'}
    `('does not throw any Error when string pattern matches', ({ value }: { value: unknown; }) => {
      const validation: MockValidation = new MockValidation();

      expect(() => {
        validation.act3(value);
      }).not.toThrow(TypeError);
    });

    it.each`
    value
    ${'a'}
    ${'b'}
    ${'ba'}
    `('does not throw any Error when string pattern matches', ({ value }: { value: unknown; }) => {
      const validation: MockValidation = new MockValidation();

      expect(() => {
        validation.act3(value);
      }).toThrow(TypeError);
    });

    it.each`
    value
    ${''}
    ${'p'}
    ${'pq'}
    ${'pqw'}
    `('throws TypeError when less than min string length given', ({ value }: { value: unknown; }) => {
      const validation: MockValidation = new MockValidation();

      expect(() => {
        validation.act4(value);
      }).toThrow(TypeError);
    });

    it.each`
    value
    ${'pqwo'}
    `('does not throw any Error when greater than min string length given', ({ value }: { value: unknown; }) => {
      const validation: MockValidation = new MockValidation();

      expect(() => {
        validation.act4(value);
      }).not.toThrow(TypeError);
    });

    it.each`
    value
    ${'pqwo1029'}
    ${'pqwo102'}
    ${'pqwo10'}
    ${'pqwo1'}
    `('throws TypeError when greater than max string length given', ({ value }: { value: unknown; }) => {
      const validation: MockValidation = new MockValidation();

      expect(() => {
        validation.act5(value);
      }).toThrow(TypeError);
    });

    it.each`
    value
    ${'pqwo'}
    `('does not throw any Error when greater than max string length given', ({ value }: { value: unknown; }) => {
      const validation: MockValidation = new MockValidation();

      expect(() => {
        validation.act5(value);
      }).not.toThrow(TypeError);
    });

    it.each`
    value
    ${'pq'}
    ${'pqw'}
    ${'pqwo102'}
    ${'pqwo1029'}
    `('throws TypeError when given value is less than min and greater than max string length given', ({ value }: { value: unknown; }) => {
      const validation: MockValidation = new MockValidation();

      expect(() => {
        validation.act6(value);
      }).toThrow(TypeError);
    });

    it.each`
    value
    ${'pqwo'}
    ${'pqwo1'}
    ${'pqwo10'}
    `('does not throw any Error when given value is less than min and greater than max string length given', ({ value }: { value: unknown; }) => {
      const validation: MockValidation = new MockValidation();

      expect(() => {
        validation.act6(value);
      }).not.toThrow(TypeError);
    });
  });
});
