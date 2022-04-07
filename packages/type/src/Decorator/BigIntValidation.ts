import { BigIntValidationArgs, BigIntValidationRule } from '../Rules';
import { addRule } from './Validate';

export const BigIntValidation = (args: BigIntValidationArgs = {}): ParameterDecorator => {
  const v: BigIntValidationRule = BigIntValidationRule.of(args);

  return (target: object, key: string | symbol, index: number) => {
    addRule(target, key, index, v);
  };
};
