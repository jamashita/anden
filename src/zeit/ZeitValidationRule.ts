import { Kind, type ValidationRule } from '../type/index.js';
import { Zeit } from './Zeit.js';

export type ZeitValidationArgs = Readonly<{
  format: string;
}>;

export class ZeitValidationRule implements ValidationRule {
  private readonly format: string;

  public constructor({ format }: ZeitValidationArgs) {
    this.format = format;
  }

  public evaluate(_target: object, value: unknown): void {
    if (!Kind.isString(value)) {
      throw new TypeError('VALUE IS NOT STRING');
    }
    if (!Zeit.validate(value, this.format)) {
      throw new TypeError(`THIS STRING IS NOT SUITABLE FOR ZEIT: ${value} ${this.format}`);
    }
  }
}
