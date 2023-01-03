import { Kind } from '../type/index.js';
import { Objet } from './Objet.js';

export abstract class ValueObject extends Objet {
  protected $$hash?: string;

  public override equals(other: unknown): boolean {
    if (this === other) {
      return true;
    }
    if (!(other instanceof ValueObject)) {
      return false;
    }

    return this.hashCode() === other.hashCode();
  }

  public override hashCode(): string {
    if (!Kind.isUndefined(this.$$hash)) {
      return this.$$hash;
    }

    this.$$hash = super.hashCode();

    return this.$$hash;
  }
}
