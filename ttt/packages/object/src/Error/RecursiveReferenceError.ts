import { RuntimeError } from '@jamashita/anden-error';

export class RecursiveReferenceError extends RuntimeError<'RecursiveReferenceError'> {
  public readonly noun: 'RecursiveReferenceError' = 'RecursiveReferenceError';

  public constructor(message: string, cause?: Error) {
    super(message, cause);
  }
}
