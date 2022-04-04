import { Kind } from './Kind';
import { ObjectLiteral, PlainObject, PlainObjectItem } from './Value';

export class Clone {
  public static copy<T extends ObjectLiteral = ObjectLiteral>(obj: T): T {
    return Clone.copyInternal(obj) as T;
  }

  private static copyArray(arr: Array<PlainObjectItem>): Array<PlainObjectItem> {
    return arr.map((item: PlainObjectItem): PlainObjectItem => {
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
    const p: PlainObject = {};

    Object.keys(obj).forEach((key: string) => {
      p[key] = Clone.copyInternal(obj[key]);
    });

    return p;
  }
}
