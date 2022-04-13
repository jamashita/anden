import { Ambiguous, Kind } from '@jamashita/anden-type';

const SEPARATOR_TEXT: string = '\n\nThe following exception was the direct cause of the above exception:\n\n';

export abstract class RuntimeError extends Error {
  private readonly cause: Ambiguous<Error>;

  protected constructor(message: string, cause?: Error) {
    super(message);
    this.cause = cause;
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

  public override get name(): string {
    return this.constructor.name;
  }

  public override get stack(): string {
    const chain: Array<Error> = [];

    this.stackErrors(this, chain);

    return chain.map((err: Error): string => {
      return err.message;
    }).join(SEPARATOR_TEXT);
  }
}
