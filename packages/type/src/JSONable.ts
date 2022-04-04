import { Kind } from './Kind';
import { ObjectLiteral } from './Value';

export interface JSONable<O extends ObjectLiteral = ObjectLiteral> {
  toJSON(): O;
}

export const isJSONable = <O extends ObjectLiteral = ObjectLiteral>(n: unknown): n is JSONable<O> => {
  if (!Kind.isObject<JSONable<O>>(n)) {
    return false;
  }

  return Kind.isFunction(n.toJSON);
};
