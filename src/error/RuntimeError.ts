import { Ambiguous, Kind } from '../type/index.js';

const SEPARATOR_TEXT: string = '\nCaused by';

export class RuntimeError extends Error {
  public constructor(message: string, cause?: Error) {
    super(message, { cause });
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

  public override get stack(): string {
    const chain: Array<Error> = [];

    this.stackErrors(this, chain);

    return chain.map((err: Error) => {
      return err.stack;
    }).filter((stack: Ambiguous<string>): stack is string => {
      return Kind.isString(stack);
    }).join(SEPARATOR_TEXT);
  }
}
