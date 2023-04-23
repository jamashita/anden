import { SymbolValidationRule } from '../Rules/SymbolValidationRule.js';
import { Ambiguous } from '../Value.js';
import { addRule } from './Validate.js';

export const SymbolValidation = (): ParameterDecorator => {
  const v: SymbolValidationRule = SymbolValidationRule.of();

  return (target: object, key: Ambiguous<string | symbol>, index: number) => {
    addRule(target, key, index, v);
  };
};
