import { v4, v5 } from 'uuid';
import { ValueObject } from '../object/index.js';
import { UUIDError } from './UUIDError.js';

const REGEX: RegExp = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/u;

export class UUID extends ValueObject {
  private readonly id: string;

  public static of(id: string): UUID {
    if (UUID.validate(id)) {
      return new UUID(id);
    }

    throw new UUIDError(`ILLEGAL ID SPECIFIED: ${id}`);
  }

  public static regex(): RegExp {
    return REGEX;
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

  public static validate(str: string): boolean {
    return REGEX.test(str);
  }

  private constructor(id: string) {
    super();
    this.id = id;
  }

  public override equals(other: unknown): boolean {
    if (this === other) {
      return true;
    }
    if (!(other instanceof UUID)) {
      return false;
    }

    return this.id === other.id;
  }

  public get(): string {
    return this.id;
  }

  public serialize(): string {
    return this.id;
  }
}
