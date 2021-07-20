import { Kind } from '../Kind.js';
import { ValidationRule } from './ValidationRule.js';

export class SymbolValidationRule implements ValidationRule {
  private static readonly INSTANCE: SymbolValidationRule = new SymbolValidationRule();

  public static of(): SymbolValidationRule {
    return SymbolValidationRule.INSTANCE;
  }

  protected constructor() {
    // NOOP
  }

  public evaluate(_target: object, value: unknown): void {
    if (!Kind.isSymbol(value)) {
      throw new TypeError('VALUE IS NOT SYMBOL');
    }
  }
}
