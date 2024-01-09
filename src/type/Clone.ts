import { Kind } from './Kind.js';
import { Inconnu, ObjectLiteral, PlainObject, PlainObjectItem } from './Value.js';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class Clone {
  public static copy<T extends ObjectLiteral = ObjectLiteral>(obj: T): T {
    return Clone.copyInternal(obj) as T;
  }

  private static copyArray(arr: Array<PlainObjectItem>): Array<PlainObjectItem> {
    return arr.map((item: PlainObjectItem) => {
      return Clone.copyInternal(item);
    });
  }

  private static copyInternal(obj: ObjectLiteral | PlainObjectItem): ObjectLiteral | PlainObjectItem {
    if (Kind.isArray<PlainObjectItem>(obj)) {
      return Clone.copyArray(obj);
    }
    if (Kind.isObject<PlainObject>(obj)) {
      return Clone.copyObject(obj);
    }

    return obj;
  }

  private static copyObject(obj: PlainObject): PlainObject {
    const p: Inconnu = {};

    Object.entries(obj).forEach(([key, value]: [string, PlainObjectItem]) => {
      p[key] = Clone.copyInternal(value);
    });

    return p as PlainObject;
  }
}
