import { RuntimeError } from './RuntimeError.js';

export class UnimplementedError extends RuntimeError {
  public constructor(message: string = 'UNIMPLEMENTED', cause?: Error) {
    super(message, cause);
  }
}
