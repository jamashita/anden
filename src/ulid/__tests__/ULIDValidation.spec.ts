import 'reflect-metadata';
import { Validate } from '../../type/index.js';
import { ULIDValidation } from '../ULIDValidation.js';

class MockValidation {
  @Validate()
  public act(@ULIDValidation() _s: unknown): void {
    // NOOP
  }
}

describe('ULIDValidation', () => {
  describe('decorator', () => {
    it.each`
      value
      ${'01FETH0D504JKQH4N88CC5KNQR'}
      ${'01FETH0MZYRY857DF04M8MFDYG'}
    `('does not throw any Error', ({ value }: { value: string }) => {
      const validation: MockValidation = new MockValidation();

      expect(() => {
        validation.act(value);
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
    `('throws TypeError when $value given', ({ value }: { value: unknown }) => {
      const validation: MockValidation = new MockValidation();

      expect(() => {
        validation.act(value);
      }).toThrow(TypeError);
    });

    it.each`
      value
      ${'e5f8279c-bbed-45e8-a7d5-7a4fbe5fdef5'}
      ${'01FETH1A9JR3XK6K0F8T588CS'}
    `('throws TypeError when non-ULID string given', ({ value }: { value: string }) => {
      const validation: MockValidation = new MockValidation();

      expect(() => {
        validation.act(value);
      }).toThrow(TypeError);
    });
  });
});
