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

const v6 = (): Promise<UUID> => {
  return new Promise((resolve: (value: UUID) => void) => {
    setImmediate(() => {
      resolve(UUID.v6());
    });
  });
};

const v7 = (): Promise<UUID> => {
  return new Promise((resolve: (value: UUID) => void) => {
    setImmediate(() => {
      resolve(UUID.v7());
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

      // biome-ignore lint/complexity/noForEach: <explanation>
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

      // biome-ignore lint/complexity/noForEach: <explanation>
      ids.forEach((id: UUID) => {
        expect(id.get()).toHaveLength(UUID.size());
      });
    });
  });

  describe('v6', () => {
    it('always generates 36 length string', async () => {
      const promises: Array<Promise<UUID>> = Array.from(Array(100)).map(() => {
        return v6();
      });
      const ids: Array<UUID> = await Promise.all<UUID>(promises);

      // biome-ignore lint/complexity/noForEach: <explanation>
      ids.forEach((id: UUID) => {
        expect(id.get()).toHaveLength(UUID.size());
      });
    });
  });

  describe('v7', () => {
    it('always generates 36 length string', async () => {
      const promises: Array<Promise<UUID>> = Array.from(Array(100)).map(() => {
        return v7();
      });
      const ids: Array<UUID> = await Promise.all<UUID>(promises);

      // biome-ignore lint/complexity/noForEach: <explanation>
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
      const promises: Array<Promise<[UUID, UUID, UUID, UUID]>> = Array.from(Array(100)).map(() => {
        return Promise.all([v4(), v5(), v6(), v7()]);
      });
      const ids: Array<[UUID, UUID, UUID, UUID]> = await Promise.all(promises);

      // biome-ignore lint/complexity/noForEach: <explanation>
      ids.forEach(([v4id, v5id, v6id, v7id]) => {
        expect(UUID.validate(v4id.get())).toBe(true);
        expect(UUID.validate(v5id.get())).toBe(true);
        expect(UUID.validate(v6id.get())).toBe(true);
        expect(UUID.validate(v7id.get())).toBe(true);
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
