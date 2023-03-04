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
    it.each`
    value
    ${false}
    ${true}
    `('does not throw when $value given', ({ value }: { value: unknown; }) => {
      const validation: MockValidation = new MockValidation();

      expect(() => {
        validation.act(value);
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
    ${Symbol()}
    ${20n}
    ${{}}
    ${[]}
    `('throws TypeError when $value given', ({ value }: { value: unknown; }) => {
      const validation: MockValidation = new MockValidation();

      expect(() => {
        validation.act(value);
      }).toThrow(TypeError);
    });
  });
});
