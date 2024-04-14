import { asyncRandom, sequence } from '../../helper/index.js';
import type { Equatable, Primitive } from '../../type/index.js';
import { MockValueObject } from '../mock/MockValueObject.js';
import { Objet } from '../Objet.js';
import { ValueObject } from '../ValueObject.js';

class SinglePrimitiveValueObject extends ValueObject {
  private readonly value: Primitive;

  public constructor(value: Primitive) {
    super();
    this.value = value;
  }

  protected getEquatableProperties(): Array<Equatable> {
    return [];
  }

  protected getPrimitiveProperties(): Array<Primitive> {
    return [this.value];
  }

  public getValue(): Primitive {
    return this.value;
  }

  public serialize(): string {
    return Objet.identify(this.value);
  }
}

class MultiPrimitiveValueObject extends ValueObject {
  private readonly value1: Primitive;

  private readonly value2: Primitive;

  private readonly value3: Primitive;

  public constructor(value1: Primitive, value2: Primitive, value3: Primitive) {
    super();
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
  }

  protected getEquatableProperties(): Array<Equatable> {
    return [];
  }

  protected getPrimitiveProperties(): Array<Primitive> {
    return [this.value1, this.value2, this.value3];
  }

  public getValue1(): Primitive {
    return this.value1;
  }

  public getValue2(): Primitive {
    return this.value2;
  }

  public getValue3(): Primitive {
    return this.value3;
  }

  public serialize(): string {
    return `${Objet.identify(this.value1)}, ${Objet.identify(this.value2)}, ${Objet.identify(this.value3)}`;
  }
}

class SingleEquatableValueObject extends ValueObject {
  private readonly value: Equatable;

  public constructor(value: Equatable) {
    super();
    this.value = value;
  }

  protected getEquatableProperties(): Array<Equatable> {
    return [this.value];
  }

  protected getPrimitiveProperties(): Array<Primitive> {
    return [];
  }

  public getValue(): Equatable {
    return this.value;
  }

  public serialize(): string {
    return Objet.identify(this.value);
  }
}

class MultipleEquatableValueObject extends ValueObject {
  private readonly value1: Equatable;

  private readonly value2: Equatable;

  private readonly value3: Equatable;

  public constructor(value1: Equatable, value2: Equatable, value3: Equatable) {
    super();
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
  }

  protected getEquatableProperties(): Array<Equatable> {
    return [this.value1, this.value2, this.value3];
  }

  protected getPrimitiveProperties(): Array<Primitive> {
    return [];
  }

  public getValue1(): Equatable {
    return this.value1;
  }

  public getValue2(): Equatable {
    return this.value2;
  }

  public getValue3(): Equatable {
    return this.value3;
  }

  public serialize(): string {
    return `${Objet.identify(this.value1)}, ${Objet.identify(this.value2)}`;
  }
}

class CombinedValueObject extends ValueObject {
  private readonly value1: Primitive;

  private readonly value2: Equatable;

  public constructor(value1: Primitive, value2: Equatable) {
    super();
    this.value1 = value1;
    this.value2 = value2;
  }

  protected getEquatableProperties(): Array<Equatable> {
    return [this.value2];
  }

  protected getPrimitiveProperties(): Array<Primitive> {
    return [this.value1];
  }

  public getValue1(): Primitive {
    return this.value1;
  }

  public getValue2(): Equatable {
    return this.value2;
  }

  public serialize(): string {
    return `${Objet.identify(this.value1)}, ${Objet.identify(this.value2)}`;
  }
}

describe('ValueObject', () => {
  describe('equals', () => {
    it('should return true when the same instance is passed', () => {
      const valueObject1: SinglePrimitiveValueObject = new SinglePrimitiveValueObject(1);
      const valueObject2: MultiPrimitiveValueObject = new MultiPrimitiveValueObject(1, 2, 3);
      const valueObject3: SingleEquatableValueObject = new SingleEquatableValueObject(new MockValueObject(1));
      const valueObject4: MultipleEquatableValueObject = new MultipleEquatableValueObject(
        new MockValueObject(1),
        new MockValueObject(2),
        new MockValueObject(3)
      );
      const valueObject5: CombinedValueObject = new CombinedValueObject(1, new MockValueObject(1));

      expect(valueObject1.equals(valueObject1)).toBe(true);
      expect(valueObject2.equals(valueObject2)).toBe(true);
      expect(valueObject3.equals(valueObject3)).toBe(true);
      expect(valueObject4.equals(valueObject4)).toBe(true);
      expect(valueObject5.equals(valueObject5)).toBe(true);
    });

    it('should return false when the different instance is passed', () => {
      const valueObject1: SinglePrimitiveValueObject = new SinglePrimitiveValueObject(1);
      const valueObject2: MultiPrimitiveValueObject = new MultiPrimitiveValueObject(1, 2, 3);
      const valueObject3: SingleEquatableValueObject = new SingleEquatableValueObject(new MockValueObject(1));
      const valueObject4: MultipleEquatableValueObject = new MultipleEquatableValueObject(
        new MockValueObject(1),
        new MockValueObject(2),
        new MockValueObject(3)
      );
      const valueObject5: CombinedValueObject = new CombinedValueObject(1, new MockValueObject(1));

      expect(valueObject1.equals(new MockValueObject(1))).toBe(false);
      expect(valueObject2.equals(new MockValueObject(1))).toBe(false);
      expect(valueObject3.equals(new MockValueObject(1))).toBe(false);
      expect(valueObject4.equals(new MockValueObject(1))).toBe(false);
      expect(valueObject5.equals(new MockValueObject(1))).toBe(false);
      expect(valueObject1.equals(valueObject2)).toBe(false);
      expect(valueObject1.equals(valueObject3)).toBe(false);
      expect(valueObject1.equals(valueObject4)).toBe(false);
      expect(valueObject1.equals(valueObject5)).toBe(false);
      expect(valueObject2.equals(valueObject1)).toBe(false);
      expect(valueObject2.equals(valueObject3)).toBe(false);
      expect(valueObject2.equals(valueObject4)).toBe(false);
      expect(valueObject2.equals(valueObject5)).toBe(false);
      expect(valueObject3.equals(valueObject1)).toBe(false);
      expect(valueObject3.equals(valueObject2)).toBe(false);
      expect(valueObject3.equals(valueObject4)).toBe(false);
      expect(valueObject3.equals(valueObject5)).toBe(false);
      expect(valueObject4.equals(valueObject1)).toBe(false);
      expect(valueObject4.equals(valueObject2)).toBe(false);
      expect(valueObject4.equals(valueObject3)).toBe(false);
      expect(valueObject4.equals(valueObject5)).toBe(false);
      expect(valueObject5.equals(valueObject1)).toBe(false);
      expect(valueObject5.equals(valueObject2)).toBe(false);
      expect(valueObject5.equals(valueObject3)).toBe(false);
      expect(valueObject5.equals(valueObject4)).toBe(false);
    });

    it('should return false when the different values are given', () => {
      const valueObject01: SinglePrimitiveValueObject = new SinglePrimitiveValueObject(1);
      const valueObject02: SinglePrimitiveValueObject = new SinglePrimitiveValueObject(2);
      const valueObject03: MultiPrimitiveValueObject = new MultiPrimitiveValueObject(1, 2, 3);
      const valueObject04: MultiPrimitiveValueObject = new MultiPrimitiveValueObject(1, 2, 4);
      const valueObject05: SingleEquatableValueObject = new SingleEquatableValueObject(new MockValueObject(1));
      const valueObject06: SingleEquatableValueObject = new SingleEquatableValueObject(new MockValueObject(2));
      const valueObject07: MultipleEquatableValueObject = new MultipleEquatableValueObject(
        new MockValueObject(1),
        new MockValueObject(2),
        new MockValueObject(3)
      );
      const valueObject08: MultipleEquatableValueObject = new MultipleEquatableValueObject(
        new MockValueObject(1),
        new MockValueObject(2),
        new MockValueObject(4)
      );
      const valueObject09: CombinedValueObject = new CombinedValueObject(1, new MockValueObject(1));
      const valueObject10: CombinedValueObject = new CombinedValueObject(2, new MockValueObject(1));
      const valueObject11: CombinedValueObject = new CombinedValueObject(1, new MockValueObject(2));

      expect(valueObject01.equals(valueObject02)).toBe(false);
      expect(valueObject01.equals(valueObject03)).toBe(false);
      expect(valueObject01.equals(valueObject04)).toBe(false);
      expect(valueObject01.equals(valueObject05)).toBe(false);
      expect(valueObject01.equals(valueObject06)).toBe(false);
      expect(valueObject01.equals(valueObject07)).toBe(false);
      expect(valueObject01.equals(valueObject08)).toBe(false);
      expect(valueObject01.equals(valueObject09)).toBe(false);
      expect(valueObject01.equals(valueObject10)).toBe(false);
      expect(valueObject01.equals(valueObject11)).toBe(false);
      expect(valueObject02.equals(valueObject01)).toBe(false);
      expect(valueObject02.equals(valueObject03)).toBe(false);
      expect(valueObject02.equals(valueObject04)).toBe(false);
      expect(valueObject02.equals(valueObject05)).toBe(false);
      expect(valueObject02.equals(valueObject06)).toBe(false);
      expect(valueObject02.equals(valueObject07)).toBe(false);
      expect(valueObject02.equals(valueObject08)).toBe(false);
      expect(valueObject02.equals(valueObject09)).toBe(false);
      expect(valueObject02.equals(valueObject10)).toBe(false);
      expect(valueObject02.equals(valueObject11)).toBe(false);
      expect(valueObject03.equals(valueObject01)).toBe(false);
      expect(valueObject03.equals(valueObject02)).toBe(false);
      expect(valueObject03.equals(valueObject04)).toBe(false);
      expect(valueObject03.equals(valueObject05)).toBe(false);
      expect(valueObject03.equals(valueObject06)).toBe(false);
      expect(valueObject03.equals(valueObject07)).toBe(false);
      expect(valueObject03.equals(valueObject08)).toBe(false);
      expect(valueObject03.equals(valueObject09)).toBe(false);
      expect(valueObject03.equals(valueObject10)).toBe(false);
      expect(valueObject03.equals(valueObject11)).toBe(false);
      expect(valueObject04.equals(valueObject01)).toBe(false);
      expect(valueObject04.equals(valueObject02)).toBe(false);
      expect(valueObject04.equals(valueObject03)).toBe(false);
      expect(valueObject04.equals(valueObject05)).toBe(false);
      expect(valueObject04.equals(valueObject06)).toBe(false);
      expect(valueObject04.equals(valueObject07)).toBe(false);
      expect(valueObject04.equals(valueObject08)).toBe(false);
      expect(valueObject04.equals(valueObject09)).toBe(false);
      expect(valueObject04.equals(valueObject10)).toBe(false);
      expect(valueObject04.equals(valueObject11)).toBe(false);
      expect(valueObject05.equals(valueObject01)).toBe(false);
      expect(valueObject05.equals(valueObject02)).toBe(false);
      expect(valueObject05.equals(valueObject03)).toBe(false);
      expect(valueObject05.equals(valueObject04)).toBe(false);
      expect(valueObject05.equals(valueObject06)).toBe(false);
      expect(valueObject05.equals(valueObject07)).toBe(false);
      expect(valueObject05.equals(valueObject08)).toBe(false);
      expect(valueObject05.equals(valueObject09)).toBe(false);
      expect(valueObject05.equals(valueObject10)).toBe(false);
      expect(valueObject05.equals(valueObject11)).toBe(false);
      expect(valueObject06.equals(valueObject01)).toBe(false);
      expect(valueObject06.equals(valueObject02)).toBe(false);
      expect(valueObject06.equals(valueObject03)).toBe(false);
      expect(valueObject06.equals(valueObject04)).toBe(false);
      expect(valueObject06.equals(valueObject05)).toBe(false);
      expect(valueObject06.equals(valueObject07)).toBe(false);
      expect(valueObject06.equals(valueObject08)).toBe(false);
      expect(valueObject06.equals(valueObject09)).toBe(false);
      expect(valueObject06.equals(valueObject10)).toBe(false);
      expect(valueObject06.equals(valueObject11)).toBe(false);
      expect(valueObject07.equals(valueObject01)).toBe(false);
      expect(valueObject07.equals(valueObject02)).toBe(false);
      expect(valueObject07.equals(valueObject03)).toBe(false);
      expect(valueObject07.equals(valueObject04)).toBe(false);
      expect(valueObject07.equals(valueObject05)).toBe(false);
      expect(valueObject07.equals(valueObject06)).toBe(false);
      expect(valueObject07.equals(valueObject08)).toBe(false);
      expect(valueObject07.equals(valueObject09)).toBe(false);
      expect(valueObject07.equals(valueObject10)).toBe(false);
      expect(valueObject07.equals(valueObject11)).toBe(false);
      expect(valueObject08.equals(valueObject01)).toBe(false);
      expect(valueObject08.equals(valueObject02)).toBe(false);
      expect(valueObject08.equals(valueObject03)).toBe(false);
      expect(valueObject08.equals(valueObject04)).toBe(false);
      expect(valueObject08.equals(valueObject05)).toBe(false);
      expect(valueObject08.equals(valueObject06)).toBe(false);
      expect(valueObject08.equals(valueObject07)).toBe(false);
      expect(valueObject08.equals(valueObject09)).toBe(false);
      expect(valueObject08.equals(valueObject10)).toBe(false);
      expect(valueObject08.equals(valueObject11)).toBe(false);
      expect(valueObject09.equals(valueObject01)).toBe(false);
      expect(valueObject09.equals(valueObject02)).toBe(false);
      expect(valueObject09.equals(valueObject03)).toBe(false);
      expect(valueObject09.equals(valueObject04)).toBe(false);
      expect(valueObject09.equals(valueObject05)).toBe(false);
      expect(valueObject09.equals(valueObject06)).toBe(false);
      expect(valueObject09.equals(valueObject07)).toBe(false);
      expect(valueObject09.equals(valueObject08)).toBe(false);
      expect(valueObject09.equals(valueObject10)).toBe(false);
      expect(valueObject09.equals(valueObject11)).toBe(false);
      expect(valueObject10.equals(valueObject01)).toBe(false);
      expect(valueObject10.equals(valueObject02)).toBe(false);
      expect(valueObject10.equals(valueObject03)).toBe(false);
      expect(valueObject10.equals(valueObject04)).toBe(false);
      expect(valueObject10.equals(valueObject05)).toBe(false);
      expect(valueObject10.equals(valueObject06)).toBe(false);
      expect(valueObject10.equals(valueObject07)).toBe(false);
      expect(valueObject10.equals(valueObject08)).toBe(false);
      expect(valueObject10.equals(valueObject09)).toBe(false);
      expect(valueObject10.equals(valueObject11)).toBe(false);
      expect(valueObject11.equals(valueObject01)).toBe(false);
      expect(valueObject11.equals(valueObject02)).toBe(false);
      expect(valueObject11.equals(valueObject03)).toBe(false);
      expect(valueObject11.equals(valueObject04)).toBe(false);
      expect(valueObject11.equals(valueObject05)).toBe(false);
      expect(valueObject11.equals(valueObject06)).toBe(false);
      expect(valueObject11.equals(valueObject07)).toBe(false);
      expect(valueObject11.equals(valueObject08)).toBe(false);
      expect(valueObject11.equals(valueObject09)).toBe(false);
      expect(valueObject11.equals(valueObject10)).toBe(false);
    });

    it('should return true when the same values are given', () => {
      const valueObject01: SinglePrimitiveValueObject = new SinglePrimitiveValueObject(1);
      const valueObject02: SinglePrimitiveValueObject = new SinglePrimitiveValueObject(1);
      const valueObject03: MultiPrimitiveValueObject = new MultiPrimitiveValueObject(1, 2, 3);
      const valueObject04: MultiPrimitiveValueObject = new MultiPrimitiveValueObject(1, 2, 3);
      const valueObject05: SingleEquatableValueObject = new SingleEquatableValueObject(new MockValueObject(1));
      const valueObject06: SingleEquatableValueObject = new SingleEquatableValueObject(new MockValueObject(1));
      const valueObject07: MultipleEquatableValueObject = new MultipleEquatableValueObject(
        new MockValueObject(1),
        new MockValueObject(2),
        new MockValueObject(3)
      );
      const valueObject08: MultipleEquatableValueObject = new MultipleEquatableValueObject(
        new MockValueObject(1),
        new MockValueObject(2),
        new MockValueObject(3)
      );
      const valueObject09: CombinedValueObject = new CombinedValueObject(1, new MockValueObject(1));
      const valueObject10: CombinedValueObject = new CombinedValueObject(1, new MockValueObject(1));

      expect(valueObject01.equals(valueObject02)).toBe(true);
      expect(valueObject03.equals(valueObject04)).toBe(true);
      expect(valueObject05.equals(valueObject06)).toBe(true);
      expect(valueObject07.equals(valueObject08)).toBe(true);
      expect(valueObject09.equals(valueObject10)).toBe(true);
    });
  });

  describe('hashCode', () => {
    it('generates same ones if all the properties are the same', () => {
      const dones: Array<Promise<void>> = sequence(1_000).map(async (i: number) => {
        const str: string = await asyncRandom(i);

        const v1: MockValueObject<string> = new MockValueObject(str);
        const v2: MockValueObject<string> = new MockValueObject(str);

        expect(v1.hashCode()).toBe(v2.hashCode());
      });

      return Promise.all(dones);
    }, 30_000);
  });
});
