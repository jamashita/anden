import { Cloneable, Kind } from '@jamashita/anden-type';
import { Objet } from './Objet.js';

export abstract class Entity<I, T extends Entity<I, T, N>, N extends string = string> extends Objet<N> implements Cloneable<T> {
  public abstract getIdentifier(): I;

  public abstract duplicate(): T;

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

  public override hashCode(): string {
    const hash: I | string = this.hashor<I>(this.getIdentifier());

    if (Kind.isString(hash)) {
      return hash;
    }

    return Objet.identify(hash);
  }

  public abstract override serialize(): string;
}
