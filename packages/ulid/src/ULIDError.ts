import { RuntimeError } from '@jamashita/anden-error';
import { Ambiguous } from '@jamashita/anden-type';

export class ULIDError extends RuntimeError {
  public constructor(message: string, cause?: Ambiguous<Error>) {
    super(message, cause);
  }
}
