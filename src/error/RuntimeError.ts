import { ValueObject } from '../object/index.js';
import { Ambiguous, Kind } from '../type/index.js';

const SEPARATOR_TEXT: string = '\nCaused by';

export class RuntimeError extends ValueObject implements Error {
  private readonly error: Error;

  public constructor(message: string, cause?: Error) {
    super();

    if (Kind.isUndefined(cause)) {
      this.error = new Error(message);

      return;
    }

    this.error = new Error(message, { cause });
  }

  public equals(other: unknown): boolean {
    if (this === other) {
      return true;
    }
    if (!(other instanceof RuntimeError)) {
      return false;
    }
    if (this.error.name !== other.error.name) {
      return false;
    }
    if (this.error.message !== other.error.message) {
      return false;
    }

    return true;
  }

  public serialize(): string {
    return this.error.message;
  }

  private stackErrors(error: Error, chain: Array<Error>): void {
    chain.push(error);

    if (error.cause instanceof Error) {
      this.stackErrors(error.cause, chain);
    }
  }

  public override toString(): string {
    return this.stack;
  }

  public get [Symbol.toStringTag](): string {
    return this.constructor.name;
  }

  public get message(): string {
    return this.error.message;
  }

  public get name(): string {
    return this.constructor.name;
  }

  public get stack(): string {
    const chain: Array<Error> = [];

    this.stackErrors(this.error, chain);

    return chain.map((err: Error): Ambiguous<string> => {
      return err.stack;
    }).filter((stack: Ambiguous<string>): stack is string => {
      return !Kind.isUndefined(stack);
    }).join(SEPARATOR_TEXT);
  }
}
