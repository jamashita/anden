import 'reflect-metadata';
import { SymbolValidation } from '../SymbolValidation.js';
import { Validate } from '../Validate.js';

class MockValidation {
  @Validate()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public act(@SymbolValidation() _s: unknown): void {
    // NOOP
  }
}

describe('SymbolValidation', () => {
  describe('decorator', () => {
    it('does not throw any Error', () => {
      expect.assertions(1);

      const validation: MockValidation = new MockValidation();

      expect(() => {
        validation.act(Symbol('p'));
      }).not.toThrow(TypeError);
    });

    it('throws TypeError when non-symbol values given', () => {
      expect.assertions(12);

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
        validation.act(false);
      }).toThrow(TypeError);
      expect(() => {
        validation.act(true);
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
