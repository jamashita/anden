import { Objet } from '../Objet.js';
import { ValueObject } from '../ValueObject.js';

export class MockValueObject<V> extends ValueObject {
  private readonly value: V;

  public constructor(value: V) {
    super();
    this.value = value;
  }

  public equals(other: unknown): boolean {
    if (this === other) {
      return true;
    }
    if (!(other instanceof MockValueObject)) {
      return false;
    }

    return this.value === other.value;
  }

  public get(): V {
    return this.value;
  }

  public serialize(): string {
    return Objet.identify(this.value);
  }
}
