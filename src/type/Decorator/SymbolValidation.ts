import { SymbolValidationRule } from '../Rules/SymbolValidationRule.js';
import type { Undefinable } from '../Value.js';
import { addRule } from './Validate.js';

export const SymbolValidation = (): ParameterDecorator => {
  const v: SymbolValidationRule = SymbolValidationRule.of();

  return (target: object, key: Undefinable<string | symbol>, index: number) => {
    addRule(target, key, index, v);
  };
};
