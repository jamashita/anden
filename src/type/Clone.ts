import { Kind } from './Kind.js';
import type { Inconnu, ObjectLiteral, PlainObject, PlainObjectItem } from './Value.js';

const cloneInternal = {
  copyArray(arr: Array<PlainObjectItem>): Array<PlainObjectItem> {
    return arr.map((item: PlainObjectItem) => {
      return this.copyInternal(item);
    });
  },
  copyInternal(obj: ObjectLiteral | PlainObjectItem): ObjectLiteral | PlainObjectItem {
    if (Kind.isArray<PlainObjectItem>(obj)) {
      return this.copyArray(obj);
    }
    if (Kind.isObject<PlainObject>(obj)) {
      return this.copyObject(obj);
    }

    return obj;
  },
  copyObject(obj: PlainObject): PlainObject {
    const p: Inconnu = {};

    for (const [key, value] of Object.entries(obj)) {
      p[key] = this.copyInternal(value);
    }

    return p as PlainObject;
  }
};

export namespace Clone {
  export const copy = <T extends ObjectLiteral = ObjectLiteral>(obj: T): T => {
    return cloneInternal.copyInternal(obj) as T;
  };
}
