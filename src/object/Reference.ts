import { type Inconnu, Kind } from '../type/index.js';

const refInternal = {
  isSerializable(value: unknown, visitStack: WeakSet<object>): boolean {
    if (!Kind.isObject<Inconnu>(value)) {
      return true;
    }
    if (visitStack.has(value)) {
      return false;
    }

    visitStack.add(value);

    return !Object.keys(value).some((key: string) => {
      return !this.isSerializable(value[key], visitStack);
    });
  }
};

export namespace Reference {
  export const isCircular = (value: unknown): boolean => {
    return !refInternal.isSerializable(value, new WeakSet<object>());
  };
}
