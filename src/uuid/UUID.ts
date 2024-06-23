import { v4, v5, v6, v7, validate } from 'uuid';
import { ValueObject } from '../object/index.js';
import type { Equatable, Primitive } from '../type/index.js';
import { UUIDError } from './UUIDError.js';

export class UUID extends ValueObject {
  private readonly id: string;

  public static of(id: string): UUID {
    if (UUID.validate(id)) {
      return new UUID(id);
    }

    throw new UUIDError(`ILLEGAL UUID SPECIFIED: ${id}`);
  }

  public static regex(): RegExp {
    return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/u;
  }

  public static size(): number {
    return 36;
  }

  public static v4(): UUID {
    return new UUID(v4());
  }

  public static v5(): UUID {
    return new UUID(v5('ANDEN', '1cf42063-b9c7-4bca-aff9-759dd62995d9'));
  }

  public static v6(): UUID {
    return new UUID(v6());
  }

  public static v7(): UUID {
    return new UUID(v7());
  }

  public static validate(str: string): boolean {
    return validate(str);
  }

  private constructor(id: string) {
    super();
    this.id = id;
  }

  public get(): string {
    return this.id;
  }

  protected getEquatableProperties(): Array<Equatable> {
    return [];
  }

  protected getPrimitiveProperties(): Array<Primitive> {
    return [this.id];
  }

  public serialize(): string {
    return this.id;
  }
}
