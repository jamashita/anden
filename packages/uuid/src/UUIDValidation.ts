import { addRule } from '@jamashita/anden-type';
import { UUIDValidationRule } from './UUIDValidationRule';

export const UUIDValidation = (): ParameterDecorator => {
  const v: UUIDValidationRule = new UUIDValidationRule();

  return (target: object, key: string | symbol, index: number): void => {
    addRule(target, key, index, v);
  };
};
