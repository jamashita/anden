import { isEquatable } from '../type/index.js';
import { Objet } from './Objet.js';

export abstract class Entity<I> extends Objet {
  public abstract getIdentifier(): I;

  public abstract override serialize(): string;

  public equals(other: unknown): boolean {
    if (this === other) {
      return true;
    }
    if (!(other instanceof Entity)) {
      return false;
    }

    const identifier: I = this.getIdentifier();

    if (identifier === other.getIdentifier()) {
      return true;
    }
    if (isEquatable(identifier)) {
      return identifier.equals(other.getIdentifier());
    }

    return false;
  }
}