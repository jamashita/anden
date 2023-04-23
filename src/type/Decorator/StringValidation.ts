import { StringValidationArgs, StringValidationRule } from '../Rules/StringValidationRule.js';
import { Ambiguous } from '../Value.js';
import { addRule } from './Validate.js';

export const StringValidation = (args?: StringValidationArgs): ParameterDecorator => {
  const v: StringValidationRule = StringValidationRule.of(args);

  return (target: object, key: Ambiguous<string | symbol>, index: number) => {
    addRule(target, key, index, v);
  };
};
