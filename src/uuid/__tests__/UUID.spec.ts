import { UUID } from '../UUID.js';
import { UUIDError } from '../UUIDError.js';

const v4 = (): Promise<UUID> => {
  return new Promise((resolve: (value: UUID) => void) => {
    setImmediate(() => {
      resolve(UUID.v4());
    });
  });
};

const v5 = (): Promise<UUID> => {
  return new Promise((resolve: (value: UUID) => void) => {
    setImmediate(() => {
      resolve(UUID.v5());
    });
  });
};

describe('UUID', () => {
  describe('of', () => {
    it('returns instance', () => {
      const uuid: string = '998106de-b2e7-4981-9643-22cd30cd74de';

      expect(UUID.of(uuid).get()).toBe(uuid);
    });

    it('throws UUIDError when the argument is not satisfied UUID format', () => {
      expect(() => {
        UUID.of('cinq');
      }).toThrow(UUIDError);
    });
  });

  describe('size', () => {
    it('returns 36', () => {
      expect(UUID.size()).toStrictEqual(36);
    });
  });

  describe('v4', () => {
    it('always generates 36 length string', async () => {
      const promises: Array<Promise<UUID>> = Array.from(Array(100)).map(() => {
        return v4();
      });
      const ids: Array<UUID> = await Promise.all<UUID>(promises);

      ids.forEach((id: UUID) => {
        expect(id.get()).toHaveLength(UUID.size());
      });
    });
  });

  describe('v5', () => {
    it('always generates 36 length string', async () => {
      const promises: Array<Promise<UUID>> = Array.from(Array(100)).map(() => {
        return v5();
      });
      const ids: Array<UUID> = await Promise.all<UUID>(promises);

      ids.forEach((id: UUID) => {
        expect(id.get()).toHaveLength(UUID.size());
      });
    });
  });

  describe('validate', () => {
    it('returns true if given string is not violated to uuid format', () => {
      const uuid: string = '998106de-b2e7-4981-9643-22cd30cd74de';

      expect(UUID.validate(uuid)).toBe(true);
    });

    it('generates UUID that must pass', async () => {
      const promises: Array<Promise<[UUID, UUID]>> = Array.from(Array(100)).map(async (): Promise<[UUID, UUID]> => {
        const v4id: UUID = await v4();
        const v5id: UUID = await v5();

        return [v4id, v5id];
      });
      const ids: Array<[UUID, UUID]> = await Promise.all<[UUID, UUID]>(promises);

      ids.forEach(([v4id, v5id]: [UUID, UUID]) => {
        expect(UUID.validate(v4id.get())).toBe(true);
        expect(UUID.validate(v5id.get())).toBe(true);
      });
    });
  });

  describe('toString', () => {
    it('returns the original string', () => {
      const id: string = '998106de-b2e7-4981-9643-22cd30cd74de';
      const uuid: UUID = UUID.of(id);

      expect(uuid.toString()).toBe(id);
    });
  });
});
