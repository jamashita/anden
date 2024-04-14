import { Kind, type ValidationRule } from '../type/index.js';
import { URL } from './URL.js';

export class URLValidationRule implements ValidationRule {
  public evaluate(_target: object, value: unknown): void {
    if (!Kind.isString(value)) {
      throw new TypeError('VALUE IS NOT STRING');
    }
    if (!URL.validate(value)) {
      throw new TypeError(`THIS STRING IS NOT SUITABLE FOR URL: ${value}`);
    }
  }
}
