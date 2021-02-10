import { Kind, ValidationRule } from '@jamashita/anden-type';
import { UUID } from './UUID';

export class UUIDValidationRule implements ValidationRule {
  public evaluate(_target: object, value: unknown): void {
    if (!Kind.isString(value)) {
      throw new TypeError('VALUE IS NOT STRING');
    }
    if (!UUID.validate(value)) {
      throw new TypeError(`THIS STRING IS NOT SUITABLE FOR UUID. GIVEN: ${value}`);
    }
  }
}
