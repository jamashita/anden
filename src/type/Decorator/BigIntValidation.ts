import { BigIntValidationArgs, BigIntValidationRule } from '../Rules/BigIntValidationRule.js';
import { Undefinable } from '../Value.js';
import { addRule } from './Validate.js';

export const BigIntValidation = (args: BigIntValidationArgs = {}): ParameterDecorator => {
  const v: BigIntValidationRule = BigIntValidationRule.of(args);

  return (target: object, key: Undefinable<string | symbol>, index: number) => {
    addRule(target, key, index, v);
  };
};
