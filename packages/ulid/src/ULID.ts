import { ValueObject } from '@jamashita/anden-object';
import { ulid } from 'ulid';
import { ULIDError } from './Error/ULIDError';

const REGEX: RegExp = /^[0-9A-Z]{26}$/u;

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
    return REGEX;
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

  public equals(other: unknown): boolean {
    if (this === other) {
      return true;
    }
    if (!(other instanceof ULID)) {
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
