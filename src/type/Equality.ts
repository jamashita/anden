import { Kind } from './Kind.js';
import type { ObjectLiteral, PlainObject, PlainObjectItem, Primitive } from './Value.js';

const equalInternal = {
  sameArray(arr1: ReadonlyArray<PlainObjectItem>, arr2: ReadonlyArray<PlainObjectItem>): boolean {
    if (arr1.length !== arr2.length) {
      return false;
    }

    return arr1.every((item: PlainObjectItem, index: number) => {
      return this.sameInternal(item, arr2[index]);
    });
  },
  sameInternal(n1: ObjectLiteral | Primitive, n2: ObjectLiteral | Primitive): boolean {
    if (this.sameReference(n1, n2)) {
      return true;
    }
    if (Kind.isArray<PlainObjectItem>(n1)) {
      if (Kind.isArray<PlainObjectItem>(n2)) {
        return this.sameArray(n1, n2);
      }

      return false;
    }
    if (Kind.isArray<PlainObjectItem>(n2)) {
      return false;
    }
    if (Kind.isObject<PlainObject>(n1) && Kind.isObject<PlainObject>(n2)) {
      return this.sameObject(n1, n2);
    }

    return false;
  },
  sameObject(obj1: PlainObject, obj2: PlainObject): boolean {
    const keys1: Array<string> = Object.keys(obj1);
    const keys2: Array<string> = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
      return false;
    }

    return keys1.every((key: string) => {
      if (Object.hasOwn(obj2, key)) {
        return this.sameInternal(obj1[key], obj2[key]);
      }

      return false;
    });
  },
  sameReference(n1: PlainObjectItem, n2: PlainObjectItem): boolean {
    if (n1 === n2) {
      return true;
    }

    return Kind.isNaN(n1) && Kind.isNaN(n2);
  }
};

export namespace Equality {
  export const same = (n1: ObjectLiteral, n2: ObjectLiteral): boolean => {
    return equalInternal.sameInternal(n1, n2);
  };
}
