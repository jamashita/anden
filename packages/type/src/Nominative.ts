import { Equalable, isEqualable } from './Equalable.js';
import { Kind } from './Kind.js';
import { isNoun, Noun } from './Noun.js';
import { isSerializable, Serializable } from './Serializable.js';

export interface Nominative<N extends string = string> extends Equalable, Serializable, Noun<N> {
  hashCode(): string;
}

export const isNominative = <N extends string = string>(n: unknown): n is Nominative<N> => {
  if (!Kind.isObject<Nominative<N>>(n)) {
    return false;
  }
  if (!Kind.isFunction(n.hashCode)) {
    return false;
  }
  if (!isEqualable(n)) {
    return false;
  }
  if (!isNoun(n)) {
    return false;
  }
  if (!isSerializable(n)) {
    return false;
  }

  return true;
};
