import { RuntimeError } from '../RuntimeError';

export class MockRuntimeError extends RuntimeError {
  public constructor(cause?: Error) {
    super('failed', cause);
  }
}
