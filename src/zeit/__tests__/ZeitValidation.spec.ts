import 'reflect-metadata';
import { Validate } from '../../type/index.js';
import { ZeitValidation } from '../ZeitValidation.js';

class MockValidation {
  @Validate()
  public act1(@ZeitValidation({ format: 'YYYY-MM-DD' }) _s: unknown): void {
    // NOOP
  }

  @Validate()
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
        validation.act1(value);
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
