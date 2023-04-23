import { addRule, Ambiguous } from '../type/index.js';
import { ZeitValidationArgs, ZeitValidationRule } from './ZeitValidationRule.js';

export const ZeitValidation = (args: ZeitValidationArgs): ParameterDecorator => {
  const v: ZeitValidationRule = new ZeitValidationRule(args);

  return (target: object, key: Ambiguous<string | symbol>, index: number): void => {
    addRule(target, key, index, v);
  };
};
