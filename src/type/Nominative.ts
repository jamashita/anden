import type { Equatable } from './Equatable.js';
import { Kind } from './Kind.js';
import type { Serializable } from './Serializable.js';

export interface Nominative extends Equatable, Serializable {
  hashCode(): string;
}

export const isNominative = (n: unknown): n is Nominative => {
  if (!Kind.isObject<Nominative>(n)) {
    return false;
  }
  if (!Kind.isFunction(n.hashCode)) {
    return false;
  }
  if (!Kind.isFunction(n.equals)) {
    return false;
  }
  if (!Kind.isFunction(n.serialize)) {
    return false;
  }

  return true;
};
