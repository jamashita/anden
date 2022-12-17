import { MockEntity } from '../mock/MockEntity.js';
import { MockValueObject } from '../mock/MockValueObject.js';

describe('Entity', () => {
  describe('equals', () => {
    it('returns true when the same instance given', () => {
      const vo: MockValueObject<boolean> = new MockValueObject(true);

      const entity: MockEntity<MockValueObject<boolean>> = new MockEntity(vo, {});

      expect(entity.equals(entity)).toBe(true);
    });

    it('returns false when the different class instance given', () => {
      const vo: MockValueObject<boolean> = new MockValueObject(true);

      const entity: MockEntity<MockValueObject<boolean>> = new MockEntity(vo, {});

      expect(entity.equals(new MockValueObject('mock'))).toBe(false);
    });

    it('returns true when the ids equal', () => {
      const vo1: MockValueObject<boolean> = new MockValueObject(true);
      const vo2: MockValueObject<boolean> = new MockValueObject(false);
      const vo3: MockValueObject<boolean> = new MockValueObject(true);

      const entity1: MockEntity<MockValueObject<boolean>> = new MockEntity(vo1, {});
      const entity2: MockEntity<MockValueObject<boolean>> = new MockEntity(vo2, {});
      const entity3: MockEntity<MockValueObject<boolean>> = new MockEntity(vo3, {});

      expect(entity1.equals(entity2)).toBe(false);
      expect(entity1.equals(entity3)).toBe(true);
    });
  });
});
