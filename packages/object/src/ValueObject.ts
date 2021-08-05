import { Kind } from '@jamashita/anden-type';
import { Objet } from './Objet.js';

export abstract class ValueObject<N extends string = string> extends Objet<N> {
  private code?: string;

  public abstract override serialize(): string;

  public override hashCode(): string {
    if (!Kind.isUndefined(this.code)) {
      return this.code;
    }

    this.code = super.hashCode();

    return this.code;
  }
}
