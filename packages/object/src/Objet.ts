import { Kind, Nominative } from '@jamashita/anden-type';
import hash from 'object-hash';

export abstract class Objet implements Nominative {
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
    return hash(this);
  }

  public toString(): string {
    return this.serialize();
  }
}
