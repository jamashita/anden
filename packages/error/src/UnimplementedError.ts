import { Ambiguous } from '@jamashita/anden-type/src/index';
import { RuntimeError } from './RuntimeError';

export class UnimplementedError extends RuntimeError {
  public constructor(message: string = 'UNIMPLEMENTED', cause?: Ambiguous<Error>) {
    super(message, cause);
  }
}
