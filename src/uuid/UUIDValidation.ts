import { addRule, Undefinable } from '../type/index.js';
import { UUIDValidationRule } from './UUIDValidationRule.js';

export const UUIDValidation = (): ParameterDecorator => {
  const v: UUIDValidationRule = new UUIDValidationRule();

  return (target: object, key: Undefinable<string | symbol>, index: number): void => {
    addRule(target, key, index, v);
  };
};
