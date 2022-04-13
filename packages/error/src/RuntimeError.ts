import { Ambiguous } from '@jamashita/anden-type/src/index';
import { BaseError, fullStack } from 'make-error-cause';

export abstract class RuntimeError extends BaseError {
  protected constructor(message: string, cause?: Ambiguous<Error>) {
    super(message, cause);
  }

  public getStack(): string {
    return fullStack(this);
  }

  public override toString(): string {
    return this.getStack();
  }
}
