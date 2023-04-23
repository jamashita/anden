import { addRule, Ambiguous } from '../type/index.js';
import { ULIDValidationRule } from './ULIDValidationRule.js';

export const ULIDValidation = (): ParameterDecorator => {
  const v: ULIDValidationRule = new ULIDValidationRule();

  return (target: object, key: Ambiguous<string | symbol>, index: number): void => {
    addRule(target, key, index, v);
  };
};
