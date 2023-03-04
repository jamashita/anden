import { ULIDValidationRule } from '../ULIDValidationRule.js';

describe('ULIDValidationRule', () => {
  describe('evaluate', () => {
    it.each`
    value
    ${'01FETGX8ZHF4MGGQE438H7WFSD'}
    ${'01FETGXHJ8Z8G5F74VPY5JJ86E'}
    `('does not throw any Error', ({ value }: { value: string; }) => {
      const rule: ULIDValidationRule = new ULIDValidationRule();

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
    `('throws TypeError when non-ULID $value given', ({ value }: { value: unknown; }) => {
      const rule: ULIDValidationRule = new ULIDValidationRule();

      expect(() => {
        rule.evaluate({}, value);
      }).toThrow(TypeError);
    });

    it.each`
    value
    ${'1894948e-d16d-4bfd-9247-acf621e12aa7'}
    ${'01FETGYJGBX4S4X18HN92SV1G'}
    ${'ckt6y8yj70000123839wxcl'}
    `('throws TypeError when non-ULID $value given', ({ value }: { value: string; }) => {
      const rule: ULIDValidationRule = new ULIDValidationRule();

      expect(() => {
        rule.evaluate({}, value);
      }).toThrow(TypeError);
    });
  });
});
