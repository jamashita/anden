import { Kind } from '../Kind.js';
import type { Undefinable } from '../Value.js';
import type { ValidationRule } from './ValidationRule.js';

type NumberCondition = Readonly<{
  operator: '!=' | '<' | '<=' | '=' | '>' | '>=';
  value: number;
}>;

export type NumberValidationArgs = Partial<
  Readonly<{
    conditions: Array<NumberCondition>;
    int: boolean;
    noNaN: boolean;
    noInfinity: boolean;
  }>
>;

export class NumberValidationRule implements ValidationRule {
  private readonly conditions: Undefinable<Array<NumberCondition>>;
  private readonly int: boolean;
  private readonly noNaN: boolean;
  private readonly noInfinity: boolean;

  public static of(args?: NumberValidationArgs): NumberValidationRule {
    return new NumberValidationRule(args);
  }

  protected constructor({ conditions = undefined, int = false, noNaN = false, noInfinity = false }: NumberValidationArgs = {}) {
    this.conditions = conditions;
    this.int = int;
    this.noNaN = noNaN;
    this.noInfinity = noInfinity;
  }

  public evaluate(_target: object, value: unknown): void {
    if (!Kind.isNumber(value)) {
      throw new TypeError('VALUE IS NOT NUMBER');
    }
    if (!Kind.isUndefined(this.conditions)) {
      const satisfied: boolean = this.conditions.every((c: NumberCondition) => {
        switch (c.operator) {
          case '!=': {
            return value !== c.value;
          }
          case '<': {
            return value < c.value;
          }
          case '<=': {
            return value <= c.value;
          }
          case '=': {
            return value === c.value;
          }
          case '>': {
            return value > c.value;
          }
          case '>=': {
            return value >= c.value;
          }
          default: {
            return false;
          }
        }
      });

      if (!satisfied) {
        throw new TypeError(`VALUE IS NOT SATISFIED GIVEN CONDITIONS: ${value}`);
      }
    }
    if (this.int) {
      if (!Kind.isInteger(value)) {
        throw new TypeError('VALUE IS INTEGER');
      }
    }
    if (this.noNaN) {
      if (Kind.isNaN(value)) {
        throw new TypeError('VALUE IS NaN');
      }
    }
    if (this.noInfinity) {
      if (value === Number.POSITIVE_INFINITY || value === Number.NEGATIVE_INFINITY) {
        throw new TypeError('VALUE IS Infinity');
      }
    }
  }
}
