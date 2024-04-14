import { type NumberValidationArgs, NumberValidationRule } from '../Rules/NumberValidationRule.js';
import type { Undefinable } from '../Value.js';
import { addRule } from './Validate.js';

export const NumberValidation = (args: NumberValidationArgs = {}): ParameterDecorator => {
  const v: NumberValidationRule = NumberValidationRule.of(args);

  return (target: object, key: Undefinable<string | symbol>, index: number) => {
    addRule(target, key, index, v);
  };
};
