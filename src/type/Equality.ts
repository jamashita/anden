import { Kind } from './Kind.js';
import { ObjectLiteral, PlainObject, PlainObjectItem, Primitive } from './Value.js';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class Equality {
  public static same(n1: ObjectLiteral, n2: ObjectLiteral): boolean {
    return Equality.sameInternal(n1, n2);
  }

  private static sameArray(arr1: ReadonlyArray<PlainObjectItem>, arr2: ReadonlyArray<PlainObjectItem>): boolean {
    if (arr1.length !== arr2.length) {
      return false;
    }

    return arr1.every((item: PlainObjectItem, index: number) => {
      return Equality.sameInternal(item, arr2[index]);
    });
  }

  private static sameInternal(n1: ObjectLiteral | Primitive, n2: ObjectLiteral | Primitive): boolean {
    if (Equality.sameReference(n1, n2)) {
      return true;
    }
    if (Kind.isArray<PlainObjectItem>(n1)) {
      if (Kind.isArray<PlainObjectItem>(n2)) {
        return Equality.sameArray(n1, n2);
      }

      return false;
    }
    if (Kind.isArray<PlainObjectItem>(n2)) {
      return false;
    }
    if (Kind.isObject<PlainObject>(n1) && Kind.isObject<PlainObject>(n2)) {
      return Equality.sameObject(n1, n2);
    }

    return false;
  }

  private static sameObject(obj1: PlainObject, obj2: PlainObject): boolean {
    const keys1: Array<string> = Object.keys(obj1);
    const keys2: Array<string> = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
      return false;
    }

    return keys1.every((key: string) => {
      if (Object.hasOwn(obj2, key)) {
        return Equality.sameInternal(obj1[key], obj2[key]);
      }

      return false;
    });
  }

  private static sameReference(n1: PlainObjectItem, n2: PlainObjectItem): boolean {
    if (n1 === n2) {
      return true;
    }

    return Kind.isNaN(n1) && Kind.isNaN(n2);
  }

  private constructor() {
    // NOOP
  }
}
