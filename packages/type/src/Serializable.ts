import { Kind } from './Kind';

export interface Serializable {
  serialize(): string;

  toString(): string;
}

export const isSerializable = (n: unknown): n is Serializable => {
  if (!Kind.isObject<Serializable>(n)) {
    return false;
  }

  return Kind.isFunction(n.serialize);
};
