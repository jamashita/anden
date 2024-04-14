import 'reflect-metadata';
import { Kind } from '../Kind.js';
import type { ValidationRule } from '../Rules/ValidationRule.js';
import type { Undefinable } from '../Value.js';

const INDEX_KEY: symbol = Symbol();
const RULE_KEY: symbol = Symbol();

const getIndex = (target: object, key: string | symbol): Undefinable<Set<number>> => {
  return Reflect.getOwnMetadata(INDEX_KEY, target, key) as Undefinable<Set<number>>;
};

const getRules = (target: object, key: string | symbol): Undefinable<Map<number, ValidationRule>> => {
  return Reflect.getOwnMetadata(RULE_KEY, target, key) as Undefinable<Map<number, ValidationRule>>;
};

export const Validate = (): MethodDecorator => {
  // biome-ignore lint/suspicious/noConfusingVoidType: <explanation>
  return <T>(target: object, key: string | symbol, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T> | void => {
    const indices: Undefinable<Set<number>> = getIndex(target, key);

    if (Kind.isUndefined(indices)) {
      return;
    }

    const rules: Undefinable<Map<number, ValidationRule>> = getRules(target, key);

    if (Kind.isUndefined(rules)) {
      return;
    }

    for (const index of indices) {
      for (const [i, rule] of rules.entries()) {
        if (index !== i) {
          continue;
        }
        if (!Kind.isFunction(descriptor.value)) {
          continue;
        }

        // biome-ignore lint/complexity/noBannedTypes: <explanation>
        const method: Function = descriptor.value;

        // @ts-expect-error
        descriptor.value = (...args: Array<unknown>): T | undefined => {
          rule.evaluate(target, args[i], key);

          return method.apply(method, args) as T;
        };
      }
    }
  };
};

export const addRule = (target: object, key: Undefinable<string | symbol>, index: number, rule: ValidationRule): void => {
  if (Kind.isUndefined(key)) {
    return;
  }

  const indices: Undefinable<Set<number>> = getIndex(target, key);
  const rules: Undefinable<Map<number, ValidationRule>> = getRules(target, key);

  if (Kind.isUndefined(indices)) {
    const s: Set<number> = new Set<number>();

    s.add(index);

    Reflect.defineMetadata(INDEX_KEY, s, target, key);
  } else {
    indices.add(index);
  }

  if (Kind.isUndefined(rules)) {
    const r: Map<number, ValidationRule> = new Map();

    r.set(index, rule);

    Reflect.defineMetadata(RULE_KEY, r, target, key);
  } else {
    rules.set(index, rule);
  }
};
