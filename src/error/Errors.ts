import { Kind, type Undefinable } from '../type/index.js';
import { RuntimeError } from './RuntimeError.js';

export class Errors<out E extends Error = Error> extends RuntimeError implements Iterable<E> {
  private readonly errors: ReadonlyArray<E>;

  public constructor(...errors: ReadonlyArray<E>) {
    const message: string = errors
      .map((error: Error) => {
        return error.message;
      })
      .join('\n');

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
    return this.errors
      .map((error: E) => {
        return error.stack;
      })
      .filter((stack: Undefinable<string>): stack is string => {
        return Kind.isString(stack);
      })
      .join('\n');
  }
}
