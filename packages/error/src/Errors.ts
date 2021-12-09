import { Ambiguous, Kind } from '@jamashita/anden-type';
import { RuntimeError } from './RuntimeError';

export class Errors<E extends Error> extends RuntimeError implements Iterable<E> {
  private readonly errors: ReadonlyArray<E>;

  private static getMessage<E extends Error>(errors: ReadonlyArray<E>): string {
    return errors.map<string>((error: Error) => {
      return error.message;
    }).join('\n');
  }

  public static of<E extends Error>(errors: Iterable<E>): Errors<E> {
    return new Errors<E>([...errors]);
  }

  public static ofSpread<E extends Error>(...errors: ReadonlyArray<E>): Errors<E> {
    return Errors.of<E>(errors);
  }

  public constructor(errors: ReadonlyArray<E>) {
    super(Errors.getMessage(errors));
    this.errors = errors;
  }

  public [Symbol.iterator](): Iterator<E> {
    return this.errors[Symbol.iterator]();
  }

  public override getStack(): string {
    return this.errors.map<Ambiguous<string>>((error: E) => {
      if (error instanceof RuntimeError) {
        return error.getStack();
      }

      return error.stack;
    }).filter((stack: Ambiguous<string>): stack is string => {
      return !Kind.isUndefined(stack);
    }).join('\n');
  }

  public getErrors(): Array<E> {
    return [...this.errors];
  }
}
