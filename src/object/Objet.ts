import hash from 'object-hash';
import { Kind, type Nominative } from '../type/index.js';

export abstract class Objet implements Nominative {
  public static genHashCode(obj: object): string {
    return hash(obj);
  }

  public static identify(n: unknown): string {
    if (Kind.isObject<object>(n)) {
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

  public abstract serialize(): string;

  public equals(other: unknown): boolean {
    if (this === other) {
      return true;
    }
    if (!(other instanceof Objet)) {
      return false;
    }

    return this.hashCode() === other.hashCode();
  }

  public hashCode(): string {
    return Objet.genHashCode(this);
  }

  public toString(): string {
    return this.serialize();
  }
}
