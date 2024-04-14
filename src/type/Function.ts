import type { SyncAsync } from './Value.js';

export type AnyFunction = (...args: Array<unknown>) => unknown;
export type UnaryFunction<in A, out R> = (arg: A) => R;
export type BinaryFunction<in A1, in A2, out R> = (arg1: A1, arg2: A2) => R;
export type TernaryFunction<in A1, in A2, in A3, out R> = (arg1: A1, arg2: A2, arg3: A3) => R;
export type Predicate<in A> = (arg: A) => boolean;
export type BinaryPredicate<in A1, in A2> = (arg1: A1, args2: A2) => boolean;
export type Consumer<in A> = (arg: A) => unknown;
export type BinaryConsumer<in A1, in A2> = (arg1: A1, args2: A2) => unknown;
export type Supplier<out R> = () => R;
export type Peek = () => unknown;
export type ForEach<in K, in V> = (value: V, key: K) => unknown;
export type Mapping<in V, out R> = (value: V, index: number) => R;
export type Resolve<in T> = (arg: SyncAsync<T>) => unknown;
export type Reject<in E = unknown> = (arg: E) => unknown;
