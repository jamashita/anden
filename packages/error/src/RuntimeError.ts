import { BaseError, fullStack } from 'make-error-cause';

export abstract class RuntimeError extends BaseError {
  protected constructor(message: string, cause?: Error) {
    super(message, cause);
  }

  public override toString(): string {
    return this.getStack();
  }

  public getStack(): string {
    return fullStack(this);
  }
}
