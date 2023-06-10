import { RuntimeError } from './RuntimeError.js';

export class ExhaustiveError extends RuntimeError {
  public constructor(value: never, message: string = `Unsupported value: ${value as unknown as string}`) {
    super(message);
  }
}
