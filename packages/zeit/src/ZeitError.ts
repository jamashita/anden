import { RuntimeError } from '@jamashita/anden-error';

export class ZeitError extends RuntimeError {
  public constructor(message: string, cause?: Error) {
    super(message, cause);
  }
}
