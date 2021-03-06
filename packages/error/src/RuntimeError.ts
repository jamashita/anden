import { Noun } from '@jamashita/anden-type';
import { BaseError, fullStack } from 'make-error-cause';

export abstract class RuntimeError<N extends string = string> extends BaseError implements Noun<N> {
  public abstract readonly noun: N;

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
