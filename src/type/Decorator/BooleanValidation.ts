import { BooleanValidationRule } from '../Rules/BooleanValidationRule.js';
import type { Undefinable } from '../Value.js';
import { addRule } from './Validate.js';

export const BooleanValidation = (): ParameterDecorator => {
  const v: BooleanValidationRule = BooleanValidationRule.of();

  return (target: object, key: Undefinable<string | symbol>, index: number) => {
    addRule(target, key, index, v);
  };
};
