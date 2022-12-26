import { Kind } from './Kind.js';

export interface Equatable {
  equals(other: unknown): boolean;
}

export const isEquatable = (n: unknown): n is Equatable => {
  if (!Kind.isObject<Equatable>(n)) {
    return false;
  }

  return Kind.isFunction(n.equals);
};
