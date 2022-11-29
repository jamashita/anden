import { isEqualable } from '@jamashita/anden-type';
import { Objet } from './Objet';

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
    if (isEqualable(identifier)) {
      return identifier.equals(other.getIdentifier());
    }

    return false;
  }
}
