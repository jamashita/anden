import { ULIDValidationRule } from '../ULIDValidationRule';

describe('ULIDValidationRule', () => {
  describe('evaluate', () => {
    it('does not throw any Error', () => {
            const rule: ULIDValidationRule = new ULIDValidationRule();

      expect(() => {
        rule.evaluate({}, '01FETGX8ZHF4MGGQE438H7WFSD');
      }).not.toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, '01FETGXHJ8Z8G5F74VPY5JJ86E');
      }).not.toThrow(TypeError);
    });

    it('throws TypeError when non-string values given', () => {
            const rule: ULIDValidationRule = new ULIDValidationRule();

      expect(() => {
        rule.evaluate({}, null);
      }).toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, undefined);
      }).toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, '');
      }).toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, '123');
      }).toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, 'abcd');
      }).toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, 123);
      }).toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, 0);
      }).toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, false);
      }).toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, true);
      }).toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, Symbol('p'));
      }).toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, 20n);
      }).toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, {});
      }).toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, []);
      }).toThrow(TypeError);
    });

    it('throws TypeError when non-ULID string given', () => {
            const rule: ULIDValidationRule = new ULIDValidationRule();

      expect(() => {
        rule.evaluate({}, '1894948e-d16d-4bfd-9247-acf621e12aa7');
      }).toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, '01FETGYJGBX4S4X18HN92SV1G');
      }).toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, 'ckt6y8yj70000123839wxcl');
      }).toThrow(TypeError);
    });
  });
});
