import { Kind } from '../Kind.js';
import { ValidationRule } from './ValidationRule.js';

type NumberCondition = Readonly<{
  condition: 't' | 'te';
  value: number;
}>;

export type NumberValidationArgs = Partial<Readonly<{
  min: NumberCondition;
  max: NumberCondition;
  int: boolean;
  noNaN: boolean;
  noInfinity: boolean;
}>>;

export class NumberValidationRule implements ValidationRule {
  private readonly min?: NumberCondition;
  private readonly max?: NumberCondition;
  private readonly int: boolean;
  private readonly noNaN: boolean;
  private readonly noInfinity: boolean;

  public static of(args: NumberValidationArgs): NumberValidationRule {
    return new NumberValidationRule(args);
  }

  protected constructor({ min, max, int = false, noNaN = false, noInfinity = false }: NumberValidationArgs) {
    this.min = min;
    this.max = max;
    this.int = int;
    this.noNaN = noNaN;
    this.noInfinity = noInfinity;
  }

  public evaluate(_target: object, value: unknown): void {
    if (!Kind.isNumber(value)) {
      throw new TypeError('VALUE IS NOT NUMBER');
    }

    this.minCondition(value);
    this.maxCondition(value);

    if (this.int) {
      if (!Kind.isInteger(value)) {
        throw new TypeError(`VALUE IS INTEGER. GIVEN: ${value}`);
      }
    }
    if (this.noNaN) {
      if (Kind.isNaN(value)) {
        throw new TypeError('VALUE IS NaN');
      }
    }
    if (this.noInfinity) {
      if (value === Infinity || value === -Infinity) {
        throw new TypeError('VALUE IS Infinity');
      }
    }
  }

  private maxCondition(value: number): void {
    if (Kind.isUndefined(this.max)) {
      return;
    }

    switch (this.max.condition) {
      case 't': {
        if (this.max.value < value) {
          throw new TypeError(`VALUE IS LONGER THAN max. GIVEN: ${value}`);
        }

        return;
      }
      case 'te': {
        if (this.max.value <= value) {
          throw new TypeError(`VALUE IS LONGER THAN OR EQUALS TO max. GIVEN: ${value}`);
        }

        return;
      }
      default: {
        throw new TypeError(`THIS CONDITION IN NOT UNDEFINED. GIVEN: ${this.max.condition as string}`);
      }
    }
  }

  private minCondition(value: number): void {
    if (Kind.isUndefined(this.min)) {
      return;
    }

    switch (this.min.condition) {
      case 't': {
        if (value < this.min.value) {
          throw new TypeError(`VALUE IS SHORTER THAN min. GIVEN: ${value}`);
        }

        return;
      }
      case 'te': {
        if (value <= this.min.value) {
          throw new TypeError(`VALUE IS SHORTER THAN OR EQUALS TO min. GIVEN: ${value}`);
        }

        return;
      }
      default: {
        throw new TypeError(`THIS CONDITION IN NOT UNDEFINED. GIVEN: ${this.min.condition as string}`);
      }
    }
  }
}
