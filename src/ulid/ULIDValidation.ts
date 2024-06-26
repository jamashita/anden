import { addRule, type Undefinable } from '../type/index.js';
import { ULIDValidationRule } from './ULIDValidationRule.js';

export const ULIDValidation = (): ParameterDecorator => {
  const v: ULIDValidationRule = new ULIDValidationRule();

  return (target: object, key: Undefinable<string | symbol>, index: number): void => {
    addRule(target, key, index, v);
  };
};
