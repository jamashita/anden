import hash from 'object-hash';
import { Kind, Nominative } from '../type/index.js';

export abstract class Objet implements Nominative {
  public static genHashCode(obj: Objet): string {
    return hash(obj);
  }

  public static identify(n: unknown): string {
    if (Kind.isObject<Object>(n)) {
      if (Kind.isFunction(n.toString)) {
        return n.toString.apply(n) as string;
      }

      return Object.prototype.toString.call(n);
    }

    return String(n);
  }

  protected constructor() {
    // NOOP
  }

  public abstract equals(other: unknown): boolean;

  public abstract serialize(): string;

  public hashCode(): string {
    return Objet.genHashCode(this);
  }

  public toString(): string {
    return this.serialize();
  }
}
