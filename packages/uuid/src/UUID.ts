import { ValueObject } from '@jamashita/anden-object';
import { v4, v5 } from 'uuid';
import { UUIDError } from './Error/UUIDError';

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
    return new UUID(v5('ANDEN', '6740811d-e75f-4b29-aa7d-7ff91ac8198d'));
  }

  public static validate(str: string): boolean {
    return UUID.regex().test(str);
  }

  private constructor(id: string) {
    super();
    this.id = id;
  }

  public equals(other: unknown): boolean {
    if (this === other) {
      return true;
    }
    if (!(other instanceof UUID)) {
      return false;
    }
    if (this.id === other.id) {
      return true;
    }

    return false;
  }

  public serialize(): string {
    return this.id;
  }

  public get(): string {
    return this.id;
  }
}
