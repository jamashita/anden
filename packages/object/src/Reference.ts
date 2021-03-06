import { Inconnu } from '@jamashita/anden-type';

export class Reference {
  public static isCircular(value: unknown): boolean {
    return !Reference.isSerializable(value, new WeakSet<object>());
  }

  private static isObject(value: unknown): value is Inconnu {
    if (typeof value !== 'object') {
      return false;
    }
    if (value === null) {
      return false;
    }

    return true;
  }

  private static isSerializable(value: unknown, visitStack: WeakSet<object>): boolean {
    if (!Reference.isObject(value)) {
      return true;
    }
    if (visitStack.has(value)) {
      return false;
    }

    visitStack.add(value);

    return !Object.keys(value).some((key: string) => {
      return !Reference.isSerializable(value[key], visitStack);
    });
  }

  private constructor() {
    // NOOP
  }
}
