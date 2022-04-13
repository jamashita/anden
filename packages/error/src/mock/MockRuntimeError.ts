import { Ambiguous } from '@jamashita/anden-type';
import { RuntimeError } from '../RuntimeError';

export class MockRuntimeError extends RuntimeError {
  public constructor(cause?: Ambiguous<Error>) {
    super('failed', cause);
  }
}
