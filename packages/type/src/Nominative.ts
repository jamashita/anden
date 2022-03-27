import { Equalable } from './Equalable';
import { Kind } from './Kind';
import { Serializable } from './Serializable';

export interface Nominative extends Equalable, Serializable {
  hashCode(): number;
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
