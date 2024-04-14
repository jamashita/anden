import 'reflect-metadata';
import { Validate } from '../../type/index.js';
import { URLValidation } from '../URLValidation.js';

class MockValidation {
  @Validate()
  public act(@URLValidation() _s: unknown): void {
    // NOOP
  }
}

describe('URLValidation', () => {
  describe('decorator', () => {
    it.each`
      value
      ${'http://example.com'}
      ${'https://example.com'}
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
      ${'http://'}
      ${'https://'}
      ${'http://example'}
      ${'https://example'}
      ${'http://example.com/ '}
      ${'https://example.com/ '}
      ${'http://example.com/ a'}
      ${'https://example.com/ a'}
      ${'http://example.com/ a '}
      ${'https://example.com/ a '}
      ${'http://example.com/ a b'}
      ${'https://example.com/ a b'}
    `('throws TypeError when non-url string $value given', ({ value }: { value: string }) => {
      const validation: MockValidation = new MockValidation();

      expect(() => {
        validation.act(value);
      }).toThrow(TypeError);
    });
  });
});
