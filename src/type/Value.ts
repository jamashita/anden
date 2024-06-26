export type JSONPrimitive = boolean | number | string | null | undefined;
export type NumericalString = `${number}`;
export type Integer<T extends number = number> = `${T}` extends `${bigint}` ? T : never;
export type Float<T extends number> = T extends Integer<T> ? never : T;
export type Primitive = JSONPrimitive | bigint | symbol;
export type Nullable<T> = T | null;
export type Undefinable<T> = T | undefined;
export type Maybe<T> = T | null | undefined;
export type Eliminate<T, U extends T> = Exclude<T, U>;
export type Retain<T, U extends T> = Extract<T, U>;
export type Sync<T> = T extends PromiseLike<infer O> ? O : T;
export type SyncAsync<T> = PromiseLike<T> | T;
// biome-ignore lint/complexity/noBannedTypes: <explanation>
export type Constructor<C extends object = object> = Function & {
  prototype: C;
};
export type Freeze<T extends object> = {
  readonly [P in keyof T]: T[P] extends object ? Freeze<T[P]> : T[P];
};
export type Vague<T extends object = object> = {
  readonly [P in keyof T]: unknown;
};
export type Inconnu = Record<string, unknown>;
export type PlainObject = {
  readonly [key: string]: PlainObjectItem;
};
export type ObjectLiteral = PlainObject | ReadonlyArray<PlainObjectItem>;
export type PlainObjectItem = ObjectLiteral | Primitive;
