import { StringValidationRule } from '../StringValidationRule';

describe('StringValidationRule', () => {
  describe('evaluate', () => {
    it('does not throw any Error', () => {
      const rule: StringValidationRule = StringValidationRule.of();

      expect(() => {
        rule.evaluate({}, '');
      }).not.toThrow(TypeError);
    });

    it('throws TypeError when non-string values given', () => {
      const rule: StringValidationRule = StringValidationRule.of();

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

    it('does not throw any Error when given string can be converted to number', () => {
      const rule: StringValidationRule = StringValidationRule.of({
        type: 'numerical'
      });

      expect(() => {
        rule.evaluate({}, '123');
      }).not.toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, '-123');
      }).not.toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, '0');
      }).not.toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, '0.18');
      }).not.toThrow(TypeError);
    });

    it('throws TypeError when given string cannot be converted to number', () => {
      const rule: StringValidationRule = StringValidationRule.of({
        type: 'numerical'
      });

      expect(() => {
        rule.evaluate({}, '1.2.3');
      }).toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, '0..');
      }).toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, '0..18');
      }).toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, 'a');
      }).toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, '-Infinity');
      }).toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, 'NaN');
      }).toThrow(TypeError);
    });

    it('throws TypeError when string pattern does not match', () => {
      const rule: StringValidationRule = StringValidationRule.of({
        type: 'pattern',
        pattern: /^a.*b$/iu
      });

      expect(() => {
        rule.evaluate({}, 'a');
      }).toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, 'b');
      }).toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, 'ab');
      }).not.toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, 'ba');
      }).toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, 'aab');
      }).not.toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, 'abb');
      }).not.toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, 'acb');
      }).not.toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, 'abcab');
      }).not.toThrow(TypeError);
    });

    it('throws TypeError when given value is less than min string length given', () => {
      const rule: StringValidationRule = StringValidationRule.of({
        type: 'length',
        min: 4
      });

      expect(() => {
        rule.evaluate({}, '');
      }).toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, 'p');
      }).toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, 'pq');
      }).toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, 'pqw');
      }).toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, 'pqwo');
      }).not.toThrow(TypeError);
    });

    it('throws TypeError when given value is greater than max string length given', () => {
      const rule: StringValidationRule = StringValidationRule.of({
        type: 'length',
        max: 4
      });

      expect(() => {
        rule.evaluate({}, 'pqwo1029');
      }).toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, 'pqwo102');
      }).toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, 'pqwo10');
      }).toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, 'pqwo1');
      }).toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, 'pqwo');
      }).not.toThrow(TypeError);
    });

    it('throws TypeError when given value is less than min and greater than max string length given', () => {
      const rule: StringValidationRule = StringValidationRule.of({
        type: 'length',
        min: 4,
        max: 6
      });

      expect(() => {
        rule.evaluate({}, 'pq');
      }).toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, 'pqw');
      }).toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, 'pqwo');
      }).not.toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, 'pqwo1');
      }).not.toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, 'pqwo10');
      }).not.toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, 'pqwo102');
      }).toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, 'pqwo1029');
      }).toThrow(TypeError);
    });

    it('does not throw any Error when given string is contained by array', () => {
      const rule: StringValidationRule = StringValidationRule.of({
        type: 'contain',
        samples: [
          'po',
          'pu',
          'pe',
          'pi'
        ]
      });

      expect(() => {
        rule.evaluate({}, 'pi');
      }).not.toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, 'pu');
      }).not.toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, 'po');
      }).not.toThrow(TypeError);
      expect(() => {
        rule.evaluate({}, 'pe');
      }).not.toThrow(TypeError);
    });

    it('throws TypeError when given string is not contained by array', () => {
      const rule: StringValidationRule = StringValidationRule.of({
        type: 'contain',
        samples: [
          'po',
          'pu',
          'pe',
          'pi'
        ]
      });

      expect(() => {
        rule.evaluate({}, 'p1');
      }).toThrow(TypeError);
    });
  });
});
