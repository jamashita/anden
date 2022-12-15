import 'reflect-metadata';
import { Validate } from '../../type/index.js';
import { ZeitValidation } from '../ZeitValidation.js';

class MockValidation {
  @Validate()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public act1(@ZeitValidation({ format: 'YYYY-MM-DD' }) _s: unknown): void {
    // NOOP
  }

  @Validate()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public act2(@ZeitValidation({ format: 'YYYY-MM-DD HH:mm:ss' }) _s: unknown, @ZeitValidation({ format: 'YYYY-MM-DD' }) _ss: unknown): void {
    // NOOP
  }
}

describe('ZeitValidation', () => {
  describe('decorator', () => {
    it('does not throw any Error', () => {
      const validation: MockValidation = new MockValidation();

      expect(() => {
        validation.act1('2000-01-01');
      }).not.toThrow(TypeError);
      expect(() => {
        validation.act1('2000-01-02');
      }).not.toThrow(TypeError);
      expect(() => {
        validation.act2('2000-01-01 01:02:03', '2000-01-02');
      }).not.toThrow(TypeError);
      expect(() => {
        validation.act2('2000-01-01 01:02:59', '2000-01-02');
      }).not.toThrow(TypeError);
    });

    it('throws TypeError when non-string values given', () => {
      const validation: MockValidation = new MockValidation();

      expect(() => {
        validation.act1(null);
      }).toThrow(TypeError);
      expect(() => {
        validation.act1(undefined);
      }).toThrow(TypeError);
      expect(() => {
        validation.act1(123);
      }).toThrow(TypeError);
      expect(() => {
        validation.act1(0);
      }).toThrow(TypeError);
      expect(() => {
        validation.act1(false);
      }).toThrow(TypeError);
      expect(() => {
        validation.act1(true);
      }).toThrow(TypeError);
      expect(() => {
        validation.act1(Symbol('p'));
      }).toThrow(TypeError);
      expect(() => {
        validation.act1(20n);
      }).toThrow(TypeError);
      expect(() => {
        validation.act1({});
      }).toThrow(TypeError);
      expect(() => {
        validation.act1([]);
      }).toThrow(TypeError);
    });

    it('throws TypeError when non-datetime string given', () => {
      const validation: MockValidation = new MockValidation();

      expect(() => {
        validation.act1('2000-01-0x');
      }).toThrow(TypeError);
      expect(() => {
        validation.act1('2000-01-y1');
      }).toThrow(TypeError);
      expect(() => {
        validation.act1('2000-01$01');
      }).toThrow(TypeError);
      expect(() => {
        validation.act2('2000-01-01 01:02:0x', '2000-01-02');
      }).toThrow(TypeError);
      expect(() => {
        validation.act2('2000-01-01 01:02:y3', '2000-01-02');
      }).toThrow(TypeError);
      expect(() => {
        validation.act2('2000-01-01 01:02$03', '2000-01-02');
      }).toThrow(TypeError);
    });
  });
});
