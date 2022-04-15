import { Ambiguous, Kind } from '@jamashita/anden-type';

const SEPARATOR_TEXT: string = '\nCaused by';

export class RuntimeError extends Error {
  public constructor(message: string, cause?: Error) {
    if (Kind.isUndefined(cause)) {
      super(message);
      return;
    }

    super(message, { cause });
  }

  private stackErrors(error: Error, chain: Array<Error>): void {
    chain.push(error);

    if (error instanceof RuntimeError) {
      if (!Kind.isUndefined(error.cause)) {
        this.stackErrors(error.cause, chain);
      }
    }
  }

  public override toString(): string {
    return this.stack;
  }

  public get [Symbol.toStringTag](): string {
    return this.constructor.name;
  }

  public override get name(): string {
    return this.constructor.name;
  }

  public override get stack(): string {
    const chain: Array<Error> = [];

    this.stackErrors(this, chain);

    return chain.map((err: Error): Ambiguous<string> => {
      return err.stack;
    }).filter((stack: Ambiguous<string>): stack is string => {
      return !Kind.isUndefined(stack);
    }).join(SEPARATOR_TEXT);
  }
}
