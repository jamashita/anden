import { Equalable, isEqualable } from './Equalable';
import { Kind } from './Kind';
import { isSerializable, Serializable } from './Serializable';

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
  if (!isEqualable(n)) {
    return false;
  }
  if (!isSerializable(n)) {
    return false;
  }

  return true;
};
