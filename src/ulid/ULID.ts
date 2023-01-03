import { ulid } from 'ulid';
import { ValueObject } from '../object/index.js';
import { ULIDError } from './ULIDError.js';

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
    if (!(other instanceof ULID)) {
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
