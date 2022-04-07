import { Kind } from '../Kind';
import { Ambiguous } from '../Value';
import { ValidationRule } from './ValidationRule';

type BigInCondition = Readonly<{
  condition: 't' | 'te';
  value: bigint;
}>;

export type BigIntValidationArgs = Partial<Readonly<{
  min: BigInCondition;
  max: BigInCondition;
}>>;

export class BigIntValidationRule implements ValidationRule {
  private readonly min: Ambiguous<BigInCondition>;
  private readonly max: Ambiguous<BigInCondition>;

  public static of(args: BigIntValidationArgs = {}): BigIntValidationRule {
    return new BigIntValidationRule(args);
  }

  protected constructor({ min = undefined, max = undefined }: BigIntValidationArgs) {
    this.min = min;
    this.max = max;
  }

  public evaluate(_target: object, value: unknown): void {
    if (!Kind.isBigInt(value)) {
      throw new TypeError('VALUE IS NOT BIGINT');
    }

    this.minCondition(value);
    this.maxCondition(value);
  }

  private maxCondition(value: bigint): void {
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

  private minCondition(value: bigint): void {
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
