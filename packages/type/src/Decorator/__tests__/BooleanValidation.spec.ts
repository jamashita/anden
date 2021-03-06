import 'reflect-metadata';
import { BooleanValidation } from '../BooleanValidation.js';
import { Validate } from '../Validate.js';

class MockValidation {
  @Validate()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public act(@BooleanValidation() _s: unknown): void {
    // NOOP
  }
}

describe('BooleanValidation', () => {
  describe('decorator', () => {
    it('does not throw any Error', () => {
      expect.assertions(2);

      const validation: MockValidation = new MockValidation();

      expect(() => {
        validation.act(false);
      }).not.toThrow(TypeError);
      expect(() => {
        validation.act(true);
      }).not.toThrow(TypeError);
    });

    it('throws TypeError when non-boolean values given', () => {
      expect.assertions(11);

      const validation: MockValidation = new MockValidation();

      expect(() => {
        validation.act(null);
      }).toThrow(TypeError);
      expect(() => {
        validation.act(undefined);
      }).toThrow(TypeError);
      expect(() => {
        validation.act('');
      }).toThrow(TypeError);
      expect(() => {
        validation.act('123');
      }).toThrow(TypeError);
      expect(() => {
        validation.act('abcd');
      }).toThrow(TypeError);
      expect(() => {
        validation.act(123);
      }).toThrow(TypeError);
      expect(() => {
        validation.act(0);
      }).toThrow(TypeError);
      expect(() => {
        validation.act(Symbol('p'));
      }).toThrow(TypeError);
      expect(() => {
        validation.act(20n);
      }).toThrow(TypeError);
      expect(() => {
        validation.act({});
      }).toThrow(TypeError);
      expect(() => {
        validation.act([]);
      }).toThrow(TypeError);
    });
  });
});
