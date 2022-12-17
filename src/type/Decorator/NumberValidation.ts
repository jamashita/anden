import { NumberValidationArgs, NumberValidationRule } from '../Rules/NumberValidationRule.js';
import { addRule } from './Validate.js';

export const NumberValidation = (args: NumberValidationArgs = {}): ParameterDecorator => {
  const v: NumberValidationRule = NumberValidationRule.of(args);

  return (target: object, key: string | symbol, index: number) => {
    addRule(target, key, index, v);
  };
};
