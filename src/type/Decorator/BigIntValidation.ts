import { BigIntValidationArgs, BigIntValidationRule } from '../Rules/BigIntValidationRule.js';
import { Ambiguous } from '../Value.js';
import { addRule } from './Validate.js';

export const BigIntValidation = (args: BigIntValidationArgs = {}): ParameterDecorator => {
  const v: BigIntValidationRule = BigIntValidationRule.of(args);

  return (target: object, key: Ambiguous<string | symbol>, index: number) => {
    addRule(target, key, index, v);
  };
};
