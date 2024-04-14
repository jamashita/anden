import type { Constructor, NumericalString, Primitive, Vague } from './Value.js';

const INTEGER_REGEX: RegExp = /^[+-]?\d+$/su;
const DECIMAL_REGEX: RegExp = /^[+-]?\d+\.\d+$/su;

export class Kind {
  public static isArray<T = unknown>(value: unknown): value is Array<T> {
    return Array.isArray(value);
  }

  public static isBigInt(value: unknown): value is bigint {
    return typeof value === 'bigint';
  }

  public static isBoolean(value: unknown): value is boolean {
    return typeof value === 'boolean';
  }

  public static isClass<T extends Constructor>(instance: unknown, klazz: T): instance is T {
    return instance instanceof klazz;
  }

  // biome-ignore lint/complexity/noBannedTypes: <explanation>
  public static isFunction(value: unknown): value is Function {
    return typeof value === 'function';
  }

  public static isInteger(value: unknown): value is number {
    if (!Kind.isNumber(value)) {
      return false;
    }

    return value % 1 === 0;
  }

  public static isNaN(value: unknown): boolean {
    if (!Kind.isNumber(value)) {
      return false;
    }

    // biome-ignore lint/suspicious/noSelfCompare: <explanation>
    return value !== value;
  }

  // biome-ignore lint/suspicious/noConfusingVoidType: <explanation>
  public static isNone(value: unknown): value is null | undefined | void {
    if (Kind.isNull(value)) {
      return true;
    }
    if (Kind.isUndefined(value)) {
      return true;
    }

    return false;
  }

  public static isNull(value: unknown): value is null {
    return value === null;
  }

  public static isNumber(value: unknown): value is number {
    return typeof value === 'number';
  }

  public static isNumericalString(value: unknown): value is NumericalString {
    if (!Kind.isString(value)) {
      return false;
    }
    if (value.endsWith('.')) {
      return false;
    }
    if (INTEGER_REGEX.test(value)) {
      return true;
    }
    if (DECIMAL_REGEX.test(value)) {
      return true;
    }

    return false;
  }

  public static isObject<T extends object = object>(value: unknown): value is Vague<T> {
    if (typeof value !== 'object') {
      return false;
    }

    return !Kind.isNull(value);
  }

  public static isPrimitive(value: unknown): value is Primitive {
    if (Kind.isNull(value)) {
      return true;
    }
    switch (typeof value) {
      case 'undefined':
      case 'boolean':
      case 'number':
      case 'string':
      case 'symbol':
      case 'bigint': {
        return true;
      }
      default: {
        return false;
      }
    }
  }

  public static isPromiseLike<T = unknown>(value: unknown): value is PromiseLike<T> {
    if (value instanceof Promise) {
      return true;
    }
    if (!Kind.isObject<PromiseLike<T>>(value)) {
      return false;
    }
    if (Kind.isFunction(value.then)) {
      return true;
    }

    return false;
  }

  public static isString(value: unknown): value is string {
    return typeof value === 'string';
  }

  public static isSymbol(value: unknown): value is symbol {
    return typeof value === 'symbol';
  }

  public static isUndefined(value: unknown): value is undefined {
    return typeof value === 'undefined';
  }

  private constructor() {
    // NOOP
  }
}
