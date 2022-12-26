import { SyncAsync } from './Value.js';

export type UnaryFunction<A, R> = (arg: A) => R;
export type BinaryFunction<A1, A2, R> = (arg1: A1, arg2: A2) => R;
export type TernaryFunction<A1, A2, A3, R> = (arg1: A1, arg2: A2, arg3: A3) => R;
export type Predicate<A> = (arg: A) => boolean;
export type BinaryPredicate<A1, A2> = (arg1: A1, args2: A2) => boolean;
export type Consumer<A> = (arg: A) => unknown;
export type BinaryConsumer<A1, A2> = (arg1: A1, args2: A2) => unknown;
export type Supplier<R> = () => R;
export type Peek = () => unknown;
export type ForEach<K, V> = (value: V, key: K) => unknown;
export type Mapping<V, R> = (value: V, index: number) => R;
export type Resolve<T> = (arg: SyncAsync<T>) => unknown;
export type Reject<E = unknown> = (arg: E) => unknown;