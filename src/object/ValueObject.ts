import { type Equatable, Kind, type Primitive } from '../type/index.js';
import { Objet } from './Objet.js';

export abstract class ValueObject extends Objet {
  protected $$hash?: string;

  protected abstract getEquatableProperties(): Array<Equatable>;

  protected abstract getPrimitiveProperties(): Array<Primitive>;

  public override equals(other: unknown): boolean {
    if (this === other) {
      return true;
    }
    if (!(other instanceof ValueObject)) {
      return false;
    }
    if (this.constructor.name !== other.constructor.name) {
      return false;
    }

    const thisPrimitives: Array<Primitive> = this.getPrimitiveProperties();
    const otherPrimitives: Array<Primitive> = other.getPrimitiveProperties();

    if (thisPrimitives.length !== otherPrimitives.length) {
      return false;
    }

    const totallySame1: boolean = !thisPrimitives.some((v: Primitive, i: number) => {
      return v !== otherPrimitives[i];
    });

    if (!totallySame1) {
      return false;
    }

    const thisEquatables: Array<Equatable> = this.getEquatableProperties();
    const otherEquatables: Array<Equatable> = other.getEquatableProperties();

    if (thisEquatables.length !== otherEquatables.length) {
      return false;
    }

    return !thisEquatables.some((v: Equatable, i: number) => {
      return !v.equals(otherEquatables[i]);
    });
  }

  public override hashCode(): string {
    if (!Kind.isUndefined(this.$$hash)) {
      return this.$$hash;
    }

    this.$$hash = super.hashCode();

    return this.$$hash;
  }
}
