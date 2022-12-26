import { addRule } from '../type/index.js';
import { ZeitValidationArgs, ZeitValidationRule } from './ZeitValidationRule.js';

export const ZeitValidation = (args: ZeitValidationArgs): ParameterDecorator => {
  const v: ZeitValidationRule = new ZeitValidationRule(args);

  return (target: object, key: string | symbol, index: number): void => {
    addRule(target, key, index, v);
  };
};