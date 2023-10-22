import { addRule, Undefinable } from '../type/index.js';
import { URLValidationRule } from './URLValidationRule.js';

export const URLValidation = (): ParameterDecorator => {
  const v: URLValidationRule = new URLValidationRule();

  return (target: object, key: Undefinable<string | symbol>, index: number): void => {
    addRule(target, key, index, v);
  };
};
