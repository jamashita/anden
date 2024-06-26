import { Kind, type ValidationRule } from '../type/index.js';
import { UUID } from './UUID.js';

export class UUIDValidationRule implements ValidationRule {
  public evaluate(_target: object, value: unknown): void {
    if (!Kind.isString(value)) {
      throw new TypeError('VALUE IS NOT STRING');
    }
    if (!UUID.validate(value)) {
      throw new TypeError(`THIS STRING IS NOT SUITABLE FOR UUID: ${value}`);
    }
  }
}
