import { SyncAsync, Whatever } from './Value';

export type UnaryFunction<A, R> = (arg: A) => R;
export type BinaryFunction<A1, A2, R> = (arg1: A1, arg2: A2) => R;
export type Predicate<A> = (arg: A) => boolean;
export type BinaryPredicate<A1, A2> = (arg1: A1, args2: A2) => boolean;
export type Consumer<A> = (arg: A) => Whatever;
export type BinaryConsumer<A1, A2> = (arg1: A1, args2: A2) => Whatever;
export type Supplier<R> = () => R;
export type Peek = () => Whatever;
export type Catalogue<K, V> = (value: V, key: K) => Whatever;
export type Mapper<A, R> = (value: A, index: number) => R;
export type Resolve<T> = (arg: SyncAsync<T>) => Whatever;
export type Reject<E = unknown> = (arg: E) => Whatever;
