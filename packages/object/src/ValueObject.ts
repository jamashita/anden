import { Kind } from '@jamashita/anden-type';
import { Objet } from './Objet';

export abstract class ValueObject extends Objet {
  private hash?: string;

  public abstract override serialize(): string;

  public override hashCode(): string {
    if (!Kind.isUndefined(this.hash)) {
      return this.hash;
    }

    this.hash = super.hashCode();

    return this.hash;
  }
}
