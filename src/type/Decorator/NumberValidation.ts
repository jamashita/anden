import { NumberValidationArgs, NumberValidationRule } from '../Rules/NumberValidationRule.js';
import { Ambiguous } from '../Value.js';
import { addRule } from './Validate.js';

export const NumberValidation = (args: NumberValidationArgs = {}): ParameterDecorator => {
  const v: NumberValidationRule = NumberValidationRule.of(args);

  return (target: object, key: Ambiguous<string | symbol>, index: number) => {
    addRule(target, key, index, v);
  };
};
