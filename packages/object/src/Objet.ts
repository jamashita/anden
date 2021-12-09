import { isNominative, Kind, Nominative } from '@jamashita/anden-type';
import hash from 'hash-it';

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

  public hashCode(): number {
    return hash(this);
  }

  protected hashor<T>(value: T): T | number {
    if (isNominative(value)) {
      return value.hashCode();
    }

    return value;
  }

  public toString(): string {
    return this.serialize();
  }
}
