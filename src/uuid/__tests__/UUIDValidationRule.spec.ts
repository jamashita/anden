import { UUIDValidationRule } from '../UUIDValidationRule.js';

describe('UUIDValidationRule', () => {
  describe('evaluate', () => {
    it.each`
    value
    ${'f3b7dca2-e07f-47bb-bfac-53efc8abc4e8'}
    ${'f4323f7b-bdf6-40f2-aa7c-91ff339f5704'}
    `('does not throw any Error', ({ value }: { value: string; }) => {
      const rule: UUIDValidationRule = new UUIDValidationRule();

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
      const rule: UUIDValidationRule = new UUIDValidationRule();

      expect(() => {
        rule.evaluate({}, value);
      }).toThrow(TypeError);
    });

    it.each`
    value
    ${'7d03c8c9-8ca1-4616-9285-5125c814a82'}
    ${'a4779dd7-1b6f-4281-a2f0-811e7f924'}
    ${'3d75cc15-aadb-44ba-894e-b0'}
    ${'221343c9-6124-4e43-a16cb6dd311806a0'}
    ${'b916817b-7ea4-476b8c54-13e572af3d61'}
    `('throws TypeError when non-uuid string given', ({ value }: { value: string; }) => {
      const rule: UUIDValidationRule = new UUIDValidationRule();

      expect(() => {
        rule.evaluate({}, value);
      }).toThrow(TypeError);
    });
  });
});
