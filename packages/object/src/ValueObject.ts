import { Kind } from '@jamashita/anden-type';
import { Objet } from './Objet';

export abstract class ValueObject<N extends string = string> extends Objet<N> {
  private code?: string;

  public hashCode(): string {
    if (!Kind.isUndefined(this.code)) {
      return this.code;
    }

    this.code = super.hashCode();

    return this.code;
  }

  public abstract serialize(): string;
}
