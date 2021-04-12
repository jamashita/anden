import { Reject, Resolve } from './Function';
import { Kind } from './Kind';
import { Suspicious } from './Value';

export interface Thenable<T> extends PromiseLike<T> {
  then<T1 = T, T2 = never>(onfulfilled?: Suspicious<Resolve<T, T1>>, onrejected?: Suspicious<Reject<T2>>): PromiseLike<T1 | T2>;
}

export const isThenable = <T>(n: unknown): n is Thenable<T> => {
  if (n instanceof Promise) {
    return true;
  }
  if (!Kind.isObject<Thenable<T>>(n)) {
    return false;
  }
  if (!Kind.isFunction(n.then)) {
    return false;
  }

  return true;
};
