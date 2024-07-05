import { ValueObject } from '../object/index.js';
import type { Equatable, Primitive } from '../type/index.js';
import { URLError } from './URLError.js';

export class URL extends ValueObject {
  private readonly url: string;

  public static of(url: string): URL {
    if (URL.validate(url)) {
      return new URL(url);
    }

    throw new URLError(`ILLEGAL URL SPECIFIED: ${url}`);
  }

  public static regex(): RegExp {
    return /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)$/u;
  }

  public static validate(str: string): boolean {
    return URL.regex().test(str);
  }

  public constructor(url: string) {
    super();
    this.url = url;
  }

  public get(): string {
    return this.url;
  }

  protected getEquatableProperties(): Array<Equatable> {
    return [];
  }

  protected getPrimitiveProperties(): Array<Primitive> {
    return [this.url];
  }

  public serialize(): string {
    return this.url;
  }
}
