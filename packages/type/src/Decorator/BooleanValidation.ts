import { BooleanValidationRule } from '../Rules/BooleanValidationRule.js';
import { addRule } from './Validate.js';

export const BooleanValidation = (): ParameterDecorator => {
  const v: BooleanValidationRule = BooleanValidationRule.of();

  return (target: object, key: string | symbol, index: number) => {
    addRule(target, key, index, v);
  };
};
