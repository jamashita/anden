import { StringValidationRule } from '../StringValidationRule.js';

describe('StringValidationRule', () => {
  describe('evaluate', () => {
    it('does not throw any Error', () => {
      const rule: StringValidationRule = StringValidationRule.of();

      expect(() => {
        rule.evaluate({}, '');
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
    `('throws TypeError when non-string $value given', ({ value }: { value: unknown }) => {
      const rule: StringValidationRule = StringValidationRule.of();

      expect(() => {
        rule.evaluate({}, value);
      }).toThrow(TypeError);
    });

    it.each`
      value
      ${'123'}
      ${'-123'}
      ${'0'}
      ${'0.18'}
    `('does not throw any Error when given string can be converted to number', ({ value }: { value: string }) => {
      const rule: StringValidationRule = StringValidationRule.of({
        type: 'numeric'
      });

      expect(() => {
        rule.evaluate({}, value);
      }).not.toThrow(TypeError);
    });

    it.each`
      value
      ${'1.2.3'}
      ${'0..'}
      ${'0..10'}
      ${'a'}
      ${'-Infinity'}
      ${'NaN'}
    `('throws TypeError when given string cannot be converted to number', ({ value }: { value: string }) => {
      const rule: StringValidationRule = StringValidationRule.of({
        type: 'numeric'
      });

      expect(() => {
        rule.evaluate({}, value);
      }).toThrow(TypeError);
    });

    it.each`
      value
      ${'a'}
      ${'b'}
      ${'ba'}
    `('throws TypeError when string pattern does not match', ({ value }: { value: string }) => {
      const rule: StringValidationRule = StringValidationRule.of({
        type: 'pattern',
        pattern: /^a.*b$/iu
      });

      expect(() => {
        rule.evaluate({}, value);
      }).toThrow(TypeError);
    });

    it.each`
      value
      ${'ab'}
      ${'aab'}
      ${'abb'}
      ${'acb'}
      ${'abcab'}
    `('does not throw any Error when string pattern matches', ({ value }: { value: string }) => {
      const rule: StringValidationRule = StringValidationRule.of({
        type: 'pattern',
        pattern: /^a.*b$/iu
      });

      expect(() => {
        rule.evaluate({}, value);
      }).not.toThrow(TypeError);
    });

    it.each`
      value
      ${''}
      ${'p'}
      ${'pq'}
      ${'pqw'}
    `('throws TypeError when given value is less than min string length given', ({ value }: { value: string }) => {
      const rule: StringValidationRule = StringValidationRule.of({
        type: 'length',
        min: 4
      });

      expect(() => {
        rule.evaluate({}, value);
      }).toThrow(TypeError);
    });

    it.each`
      value
      ${'pqwo'}
    `('does not throw any Error when given value is greater than min string length given', ({ value }: { value: string }) => {
      const rule: StringValidationRule = StringValidationRule.of({
        type: 'length',
        min: 4
      });

      expect(() => {
        rule.evaluate({}, value);
      }).not.toThrow(TypeError);
    });

    it.each`
      value
      ${'pqwo1029'}
      ${'pqwo102'}
      ${'pqwo10'}
      ${'pqwo1'}
    `('throws TypeError when given value is greater than max string length given', ({ value }: { value: string }) => {
      const rule: StringValidationRule = StringValidationRule.of({
        type: 'length',
        max: 4
      });

      expect(() => {
        rule.evaluate({}, value);
      }).toThrow(TypeError);
    });

    it.each`
      value
      ${'pqwo'}
    `('does not throw any Error when given value is less than max string length given', ({ value }: { value: string }) => {
      const rule: StringValidationRule = StringValidationRule.of({
        type: 'length',
        max: 4
      });

      expect(() => {
        rule.evaluate({}, value);
      }).not.toThrow(TypeError);
    });

    it.each`
      value
      ${'pq'}
      ${'pqw'}
      ${'pqwo102'}
      ${'pqwo1029'}
    `('throws TypeError when given value is less than min and greater than max string length given', ({ value }: { value: string }) => {
      const rule: StringValidationRule = StringValidationRule.of({
        type: 'length',
        min: 4,
        max: 6
      });

      expect(() => {
        rule.evaluate({}, value);
      }).toThrow(TypeError);
    });

    it.each`
      value
      ${'pqwo'}
      ${'pqwo1'}
      ${'pqwo10'}
    `('does not throw any Error when given value is greater than min and less than max string length given', ({ value }: { value: string }) => {
      const rule: StringValidationRule = StringValidationRule.of({
        type: 'length',
        min: 4,
        max: 6
      });

      expect(() => {
        rule.evaluate({}, value);
      }).not.toThrow(TypeError);
    });

    it.each`
      value
      ${'pi'}
      ${'pu'}
      ${'po'}
      ${'pe'}
    `('does not throw any Error when given string is contained by array', ({ value }: { value: string }) => {
      const rule: StringValidationRule = StringValidationRule.of({
        type: 'contain',
        samples: ['po', 'pu', 'pe', 'pi']
      });

      expect(() => {
        rule.evaluate({}, value);
      }).not.toThrow(TypeError);
    });

    it('throws TypeError when given string is not contained by array', () => {
      const rule: StringValidationRule = StringValidationRule.of({
        type: 'contain',
        samples: ['po', 'pu', 'pe', 'pi']
      });

      expect(() => {
        rule.evaluate({}, 'p1');
      }).toThrow(TypeError);
    });
  });
});
