import { Validate } from '@jamashita/anden-type';
import 'reflect-metadata';
import { ULIDValidation } from '../ULIDValidation';

class MockValidation {
  @Validate()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public act(@ULIDValidation() _s: unknown): void {
    // NOOP
  }
}

describe('ULIDValidation', () => {
  describe('decorator', () => {
    it('does not throw any Error', () => {
      const validation: MockValidation = new MockValidation();

      expect(() => {
        validation.act('01FETH0D504JKQH4N88CC5KNQR');
      }).not.toThrow(TypeError);
      expect(() => {
        validation.act('01FETH0MZYRY857DF04M8MFDYG');
      }).not.toThrow(TypeError);
    });

    it('throws TypeError when non-string values given', () => {
      const validation: MockValidation = new MockValidation();

      expect(() => {
        validation.act(null);
      }).toThrow(TypeError);
      expect(() => {
        validation.act(undefined);
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

    it('throws TypeError when non-ULID string given', () => {
      const validation: MockValidation = new MockValidation();

      expect(() => {
        validation.act('e5f8279c-bbed-45e8-a7d5-7a4fbe5fdef5');
      }).toThrow(TypeError);
      expect(() => {
        validation.act('01FETH1A9JR3XK6K0F8T588CS');
      }).toThrow(TypeError);
    });
  });
});
