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

    const thisId: I = this.getIdentifier();
    const otherId: unknown = other.getIdentifier();

    if (thisId === otherId) {
      return true;
    }
    if (isEquatable(thisId)) {
      return thisId.equals(otherId);
    }

    return false;
  }
}
