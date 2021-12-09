import { Kind } from '@jamashita/anden-type';
import { Objet } from './Objet';

export abstract class ValueObject extends Objet {
  private code?: number;

  public override hashCode(): number {
    if (!Kind.isUndefined(this.code)) {
      return this.code;
    }

    this.code = super.hashCode();

    return this.code;
  }

  public abstract override serialize(): string;
}
