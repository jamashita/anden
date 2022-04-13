import { Ambiguous, Kind } from '@jamashita/anden-type';
import { RuntimeError } from './RuntimeError';

export class Errors<E extends Error = Error> extends RuntimeError implements Iterable<E> {
  private readonly errors: ReadonlyArray<E>;

  public constructor(...errors: ReadonlyArray<E>) {
    const message: string = errors.map((error: Error): string => {
      return error.message;
    }).join('\n');

    super(message);
    this.errors = errors;
  }

  public [Symbol.iterator](): Iterator<E> {
    return this.errors[Symbol.iterator]();
  }

  public getErrors(): Array<E> {
    return [...this.errors];
  }

  public override get stack(): string {
    return this.errors.map((error: E): Ambiguous<string> => {
      return error.stack;
    }).filter((stack: Ambiguous<string>): stack is string => {
      return !Kind.isUndefined(stack);
    }).join('\n');
  }
}
