export type JSONPrimitive = boolean | number | string | null | undefined;
export type NumericalString = `${number}`;
export type Integer<T extends number = number> = `${T}` extends `${bigint}` ? T : never;
export type Float<T extends number> = T extends Integer<T> ? never : T;
export type Primitive = JSONPrimitive | bigint | symbol;
export type Nullable<T> = T | null;
export type Ambiguous<T> = T | undefined;
export type Omittable<T> = T | void;
export type Suspicious<T> = T | null | undefined;
export type Eliminate<T, U extends T> = Exclude<T, U>;
export type Retain<T, U extends T> = Extract<T, U>;
export type Sync<T> = T extends PromiseLike<infer O> ? O : T;
export type SyncAsync<T> = PromiseLike<T> | T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Constructor<C extends object = object> = new(...args: Array<any>) => C;
export type Freeze<T extends object> = {
  readonly [P in keyof T]: T[P] extends object ? Freeze<T[P]> : T[P];
};
export type Vague<T extends object = object> = {
  readonly [P in keyof T]: unknown;
};
export type Inconnu = Record<string, unknown>;
// eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
export type PlainObject = {
  [key: string]: PlainObjectItem;
};
export type ObjectLiteral = PlainObject | ReadonlyArray<PlainObjectItem>;
export type PlainObjectItem = ObjectLiteral | Primitive;
