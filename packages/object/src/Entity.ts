import { Cloneable, Kind } from '@jamashita/anden-type';
import hash from 'hash-it';
import { Objet } from './Objet.js';

export abstract class Entity<I, T extends Entity<I, T, N>, N extends string = string> extends Objet<N> implements Cloneable<T> {
  public abstract getIdentifier(): I;

  public abstract duplicate(): T;

  public abstract override serialize(): string;

  public equals(other: unknown): boolean {
    if (this === other) {
      return true;
    }
    if (!(other instanceof Entity)) {
      return false;
    }
    if (this.hashCode() === other.hashCode()) {
      return true;
    }

    return false;
  }

  public override hashCode(): number {
    const h: I | number = this.hashor<I>(this.getIdentifier());

    if (Kind.isNumber(h)) {
      return h;
    }

    return hash(Objet.identify(h));
  }
}
