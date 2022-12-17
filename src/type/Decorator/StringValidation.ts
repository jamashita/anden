import { StringValidationArgs, StringValidationRule } from '../Rules/StringValidationRule.js';
import { addRule } from './Validate.js';

export const StringValidation = (args?: StringValidationArgs): ParameterDecorator => {
  const v: StringValidationRule = StringValidationRule.of(args);

  return (target: object, key: string | symbol, index: number) => {
    addRule(target, key, index, v);
  };
};
