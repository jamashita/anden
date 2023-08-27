import { URLValidationRule } from '../URLValidationRule.js';

describe('URLValidationRule', () => {
  describe('evaluate', () => {
    it.each`
    value
    ${'https://www.example.com'}
    ${'https://www.example.com/'}
    `('does not throw any Error', ({ value }: { value: string; }) => {
      const rule: URLValidationRule = new URLValidationRule();

      expect(() => {
        rule.evaluate({}, value);
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
    ${false}
    ${true}
    ${Symbol('p')}
    ${20n}
    ${{}}
    ${[]}
    `('throws TypeError when non-uuid $value given', ({ value }: { value: unknown; }) => {
      const rule: URLValidationRule = new URLValidationRule();

      expect(() => {
        rule.evaluate({}, value);
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
    `('throws TypeError when non-url string $value given', ({ value }: { value: string; }) => {
      const rule: URLValidationRule = new URLValidationRule();

      expect(() => {
        rule.evaluate({}, value);
      }).toThrow(TypeError);
    });
  });
});
