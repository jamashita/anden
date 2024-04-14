import { RuntimeError } from './RuntimeError.js';

export class UnimplementedError extends RuntimeError {
  public constructor(message = 'UNIMPLEMENTED', cause?: Error) {
    super(message, cause);
  }
}
