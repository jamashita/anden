import { isEquatable } from '../type/index.js';
import { Objet } from './Objet.js';

export abstract class Entity<I> extends Objet {
  public abstract getIdentifier(): I;

  public abstract override serialize(): string;

  public override equals(other: unknown): boolean {
    if (this === other) {
      return true;
    }
    if (!(other instanceof Entity)) {
      return false;
    }

    const thisID: I = this.getIdentifier();
    const otherID: unknown = other.getIdentifier();

    if (thisID === otherID) {
      return true;
    }
    if (isEquatable(thisID)) {
      return thisID.equals(otherID);
    }

    return false;
  }
}
