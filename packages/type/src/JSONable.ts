import { Kind } from './Kind.js';
import { ObjectLiteral } from './Value.js';

export interface JSONable<O extends ObjectLiteral = ObjectLiteral> {
  toJSON(): O;
}

export const isJSONable = <O extends ObjectLiteral = ObjectLiteral>(n: unknown): n is JSONable<O> => {
  if (!Kind.isObject<JSONable<O>>(n)) {
    return false;
  }
  if (!Kind.isFunction(n.toJSON)) {
    return false;
  }

  return true;
};
