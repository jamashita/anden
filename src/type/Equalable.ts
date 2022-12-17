import { Kind } from './Kind.js';

export interface Equalable {
  equals(other: unknown): boolean;
}

export const isEqualable = (n: unknown): n is Equalable => {
  if (!Kind.isObject<Equalable>(n)) {
    return false;
  }

  return Kind.isFunction(n.equals);
};
