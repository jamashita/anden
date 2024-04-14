import { ulid } from 'ulid';
import { ValueObject } from '../object/index.js';
import type { Equatable, Primitive } from '../type/index.js';
import { ULIDError } from './ULIDError.js';

export class ULID extends ValueObject {
  private readonly id: string;

  public static generate(): ULID {
    return new ULID(ulid());
  }

  public static of(id: string): ULID {
    if (ULID.validate(id)) {
      return new ULID(id);
    }

    throw new ULIDError(`ILLEGAL ID SPECIFIED: ${id}`);
  }

  public static regex(): RegExp {
    return /^[0-9A-Z]{26}$/u;
  }

  public static size(): number {
    return 26;
  }

  public static validate(str: string): boolean {
    return ULID.regex().test(str);
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
