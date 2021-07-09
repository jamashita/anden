import { Kind } from './Kind.js';

export interface Noun<N extends string = string> {
  readonly noun: N;
}

export const isNoun = (n: unknown): n is Noun => {
  if (!Kind.isObject<Noun>(n)) {
    return false;
  }
  if (!Kind.isString(n.noun)) {
    return false;
  }

  return true;
};
