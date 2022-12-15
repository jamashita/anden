import { Kind, ValidationRule } from '@jamashita/anden-type';
import { ULID } from './ULID';

export class ULIDValidationRule implements ValidationRule {
  public evaluate(_target: object, value: unknown): void {
    if (!Kind.isString(value)) {
      throw new TypeError('VALUE IS NOT STRING');
    }
    if (!ULID.validate(value)) {
      throw new TypeError(`THIS STRING IS NOT SUITABLE FOR ULID. GIVEN: ${value}`);
    }
  }
}
