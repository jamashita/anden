import { addRule } from '@jamashita/anden-type';
import { ULIDValidationRule } from './ULIDValidationRule';

export const ULIDValidation = (): ParameterDecorator => {
  const v: ULIDValidationRule = new ULIDValidationRule();

  return (target: object, key: string | symbol, index: number): void => {
    addRule(target, key, index, v);
  };
};
