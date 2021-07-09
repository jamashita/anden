import { Kind } from '../Kind.js';
import { ValidationRule } from './Interface/ValidationRule.js';

export class BooleanValidationRule implements ValidationRule {
  private static readonly INSTANCE: BooleanValidationRule = new BooleanValidationRule();

  public static of(): BooleanValidationRule {
    return BooleanValidationRule.INSTANCE;
  }

  protected constructor() {
    // NOOP
  }

  public evaluate(_target: object, value: unknown): void {
    if (!Kind.isBoolean(value)) {
      throw new TypeError('VALUE IS NOT BOOLEAN');
    }
  }
}
