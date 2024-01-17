import { ExhaustiveError } from '../../error/index.js';
import { Kind } from '../Kind.js';
import { ValidationRule } from './ValidationRule.js';

type NumericalStringPattern = Readonly<{
  type: 'numeric';
}>;
type RegExpPattern = Readonly<{
  type: 'pattern';
  pattern: RegExp;
}>;
type StringLengthPattern = Readonly<{
  type: 'length';
  min?: number;
  max?: number;
}>;
type ContainPattern = Readonly<{
  type: 'contain';
  samples: ReadonlyArray<string>;
}>;
type NoPattern = Readonly<{
  type: 'none';
}>;

export type StringValidationArgs = ContainPattern | NumericalStringPattern | RegExpPattern | StringLengthPattern;

const NONE: NoPattern = {
  type: 'none'
};

export class StringValidationRule implements ValidationRule {
  private readonly args: NoPattern | StringValidationArgs;

  public static of(args: NoPattern | StringValidationArgs = NONE): StringValidationRule {
    return new StringValidationRule(args);
  }

  protected constructor(args: NoPattern | StringValidationArgs) {
    this.args = args;
  }

  public evaluate(_target: object, value: unknown): void {
    if (!Kind.isString(value)) {
      throw new TypeError('VALUE IS NOT STRING');
    }

    const { type } = this.args;

    switch (type) {
      case 'numeric': {
        if (!Kind.isNumericalString(value)) {
          throw new TypeError(`VALUE IS NOT NUMERICAL STRING: ${value}`);
        }

        return;
      }
      case 'pattern': {
        if (!this.args.pattern.test(value)) {
          throw new TypeError(`VALUE DOES NOT FOLLOW THE PATTERN: ${value}`);
        }

        return;
      }
      case 'length': {
        if (!Kind.isUndefined(this.args.min)) {
          if (value.length < this.args.min) {
            throw new TypeError(`VALUE IS SHORTER THAN min: ${value}`);
          }
        }
        if (!Kind.isUndefined(this.args.max)) {
          if (this.args.max < value.length) {
            throw new TypeError(`VALUE IS LONGER THAN max: ${value}`);
          }
        }

        return;
      }
      case 'contain': {
        if (!this.args.samples.includes(value)) {
          throw new TypeError(`THIS VALUE IS NOT CONTAINED IN SAMPLES: ${value}`);
        }

        return;
      }
      case 'none': {
        return;
      }
      default: {
        throw new ExhaustiveError(type);
      }
    }
  }
}
