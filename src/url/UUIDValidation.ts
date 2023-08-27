import { addRule, Ambiguous } from '../type/index.js';
import { URLValidationRule } from './URLValidationRule.js';

export const URLValidation = (): ParameterDecorator => {
  const v: URLValidationRule = new URLValidationRule();

  return (target: object, key: Ambiguous<string | symbol>, index: number): void => {
    addRule(target, key, index, v);
  };
};
