import { ZeitValidationRule } from '../ZeitValidationRule';

describe('ZeitValidationRule', () => {
  describe('evaluate', () => {
    it('does not throw any Error', () => {
      const rule1: ZeitValidationRule = new ZeitValidationRule({
        format: 'YYYY-MM-DD'
      });
      const rule2: ZeitValidationRule = new ZeitValidationRule({
        format: 'YYYY-MM-DD HH:mm:ss'
      });

      expect(() => {
        rule1.evaluate({}, '2000-01-01');
      }).not.toThrow(TypeError);
      expect(() => {
        rule1.evaluate({}, '2000-01-02');
      }).not.toThrow(TypeError);
      expect(() => {
        rule2.evaluate({}, '2000-01-01 01:02:03');
      }).not.toThrow(TypeError);
      expect(() => {
        rule2.evaluate({}, '2000-01-01 01:02:59');
      }).not.toThrow(TypeError);
    });

    it('throws TypeError when non-string values given', () => {
      const rule: ZeitValidationRule = new ZeitValidationRule({
        format: 'YYYY-MM-DD'
      });

      expect(() => {
        rule.evaluate({}, null);
      }).toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, undefined);
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

    it('throws TypeError when non-datetime string given', () => {
      const rule: ZeitValidationRule = new ZeitValidationRule({
        format: 'YYYY-MM-DD'
      });

      expect(() => {
        rule.evaluate({}, '2000-01-0x');
      }).toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, '2000-01-y1');
      }).toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, '2000-01$01');
      }).toThrow(TypeError);
    });
  });
});
