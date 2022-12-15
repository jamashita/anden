import { Kind } from '../Kind';
import { Ambiguous } from '../Value';
import { ValidationRule } from './ValidationRule';

type BigIntCondition = Readonly<{
  operator: '!=' | '<' | '<=' | '=' | '>' | '>=';
  value: bigint;
}>;

export type BigIntValidationArgs = Partial<Readonly<{
  conditions: Array<BigIntCondition>;
}>>;

export class BigIntValidationRule implements ValidationRule {
  private readonly conditions: Ambiguous<Array<BigIntCondition>>;

  public static of(args?: BigIntValidationArgs): BigIntValidationRule {
    return new BigIntValidationRule(args);
  }

  protected constructor({ conditions = undefined }: BigIntValidationArgs = {}) {
    this.conditions = conditions;
  }

  public evaluate(_target: object, value: unknown): void {
    if (!Kind.isBigInt(value)) {
      throw new TypeError('VALUE IS NOT BIGINT');
    }
    if (!Kind.isUndefined(this.conditions)) {
      const satisfied: boolean = this.conditions.every((c: BigIntCondition) => {
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
        throw new TypeError(`VALUE IS NOT SATISFIED GIVEN CONDITIONS. GIVEN: ${value}`);
      }
    }
  }
}
