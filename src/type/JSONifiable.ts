import { Kind } from './Kind.js';
import { ObjectLiteral } from './Value.js';

export interface JSONifiable<O extends ObjectLiteral = ObjectLiteral> {
  toJSON(): O;
}

export const isJSONifiable = <O extends ObjectLiteral = ObjectLiteral>(n: unknown): n is JSONifiable<O> => {
  if (!Kind.isObject<JSONifiable<O>>(n)) {
    return false;
  }

  return Kind.isFunction(n.toJSON);
};
