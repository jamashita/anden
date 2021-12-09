import { RuntimeError } from './RuntimeError';

export class UnimplementedError extends RuntimeError {
  public constructor(message: string = 'UNIMPLEMENTED', cause?: Error) {
    super(message, cause);
  }
}
