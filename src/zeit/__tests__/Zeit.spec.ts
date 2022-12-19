import dayjs from 'dayjs';
import { MockValueObject } from '../../object/index.js';
import { Zeit } from '../Zeit.js';
import { ZeitError } from '../ZeitError.js';

describe('Zeit', () => {
  describe('max', () => {
    it('returns maximum Zeit', () => {
      const format: string = 'YYYY-MM-DD';
      const zeiten: Array<Zeit> = [
        Zeit.ofString('2000-01-03', format),
        Zeit.ofString('2000-01-01', format),
        Zeit.ofString('2000-01-02', format),
        Zeit.ofString('2000-01-03', format)
      ];

      const max: Zeit = Zeit.max(zeiten);

      expect(max.toString('YYYY-MM-DD')).toBe('2000-01-03');
    });

    it('returns itself when the only one Zeit given', () => {
      const format: string = 'YYYY-MM-DD';
      const zeiten: Array<Zeit> = [Zeit.ofString('2000-01-01', format)];

      const max: Zeit = Zeit.max(zeiten);

      expect(max).toBe(zeiten[0]);
    });

    it('throws ZeitError when empty array given', () => {
      const zeiten: Array<Zeit> = [];

      expect(() => {
        Zeit.max(zeiten);
      }).toThrow(ZeitError);
    });
  });

  describe('min', () => {
    it('returns minimum Zeit', () => {
      const format: string = 'YYYY-MM-DD';
      const zeiten: Array<Zeit> = [
        Zeit.ofString('2000-01-03', format),
        Zeit.ofString('2000-01-02', format),
        Zeit.ofString('2000-01-01', format),
        Zeit.ofString('2000-01-02', format)
      ];

      const min: Zeit = Zeit.min(zeiten);

      expect(min.toString('YYYY-MM-DD')).toBe('2000-01-01');
    });

    it('returns itself when the only one Zeit given', () => {
      const format: string = 'YYYY-MM-DD';
      const zeiten: Array<Zeit> = [Zeit.ofString('2000-01-01', format)];

      const min: Zeit = Zeit.min(zeiten);

      expect(min).toBe(zeiten[0]);
    });

    it('throws ZeitError when empty array given', () => {
      const zeiten: Array<Zeit> = [];

      expect(() => {
        Zeit.min(zeiten);
      }).toThrow(ZeitError);
    });
  });

  describe('now', () => {
    it('returns current timestamp', () => {
      vi.useFakeTimers().setSystemTime(946684800000);

      expect(Zeit.now().toString('YYYY-MM-DD HH:mm:ss')).toBe('2000-01-01 00:00:00');

      vi.useRealTimers();
    });
  });

  describe('ofDate', () => {
    it('returns instance', () => {
      const date1: Date = new Date(2000, 0, 1, 1, 2, 3);
      const date2: Date = new Date(2000, 0, 1, 1, 2, 3);

      const zeit1: Zeit = Zeit.ofDate(date1);
      const zeit2: Zeit = Zeit.ofDate(date2);

      expect(zeit1.isValid()).toBe(true);
      expect(zeit2.isValid()).toBe(true);
      expect(zeit1.toString('YYYY-MM-DD')).toBe('2000-01-01');
      expect(zeit2.toString('YYYY-MM-DD HH:mm:ss')).toBe('2000-01-01 01:02:03');
    });
  });

  describe('ofString', () => {
    it('returns instance', () => {
      const zeit1: Zeit = Zeit.ofString('2000-01-01', 'YYYY-MM-DD');
      const zeit2: Zeit = Zeit.ofString('2000-01-01 01:02:03', 'YYYY-MM-DD HH:mm:ss');

      expect(zeit1.isValid()).toBe(true);
      expect(zeit2.isValid()).toBe(true);
      expect(zeit1.toString('YYYY-MM-DD')).toBe('2000-01-01');
      expect(zeit2.toString('YYYY-MM-DD HH:mm:ss')).toBe('2000-01-01 01:02:03');
    });

    it('throws ZeitError when the format is incorrect', () => {
      expect(() => {
        Zeit.ofString('2000-01-01', 'YYYY-MM-DD HH:mm:ss');
      }).toThrow(ZeitError);

      expect(() => {
        Zeit.ofString('2000-01-01 01:02:03', 'YYYY-MM-DD');
      }).toThrow(ZeitError);
    });
  });

  describe('validate', () => {
    it('returns true when the string is suitable date for format', () => {
      expect(Zeit.validate('2000-01-01', 'YYYY-MM-DD')).toBe(true);
      expect(Zeit.validate('2000-01-01 01:02:03', 'YYYY-MM-DD HH:mm:ss')).toBe(true);
    });

    it('returns false when the string is not suitable for format', () => {
      expect(Zeit.validate('2000-01-01', 'YYYY-MM-DD HH:mm:ss')).toBe(false);
      expect(Zeit.validate('2000-01-01 01:02:03', 'YYYY-MM-DD')).toBe(false);
    });
  });

  describe('equals', () => {
    it('returns true if they are the same instance', () => {
      const zeit1: Zeit = Zeit.ofString('2000-01-01', 'YYYY-MM-DD');

      expect(zeit1.equals(zeit1)).toBe(true);
    });

    it('returns false if different instance given', () => {
      const zeit1: Zeit = Zeit.ofString('2000-01-01', 'YYYY-MM-DD');

      expect(zeit1.equals(new MockValueObject('2000-01-01'))).toBe(false);
    });

    it('returns true if all the properties are the same', () => {
      const zeit1: Zeit = Zeit.ofString('2000-01-01', 'YYYY-MM-DD');
      const zeit2: Zeit = Zeit.ofString('2000-01-02', 'YYYY-MM-DD');
      const zeit3: Zeit = Zeit.ofString('2000-01-01', 'YYYY-MM-DD');

      expect(zeit1.equals(zeit2)).toBe(false);
      expect(zeit1.equals(zeit3)).toBe(true);
    });
  });

  describe('future', () => {
    it('goes forward by second', () => {
      const zeit: Zeit = Zeit.ofString('2000-01-01 00:00:00', 'YYYY-MM-DD HH:mm:ss');
      const newZeit: Zeit = zeit.future(5, 'second');

      expect(zeit.toString('YYYY-MM-DD HH:mm:ss')).toBe('2000-01-01 00:00:00');
      expect(newZeit.toString('YYYY-MM-DD HH:mm:ss')).toBe('2000-01-01 00:00:05');
    });

    it('goes forward by minute', () => {
      const zeit: Zeit = Zeit.ofString('2000-01-01 00:00:00', 'YYYY-MM-DD HH:mm:ss');
      const newZeit: Zeit = zeit.future(5, 'minute');

      expect(zeit.toString('YYYY-MM-DD HH:mm:ss')).toBe('2000-01-01 00:00:00');
      expect(newZeit.toString('YYYY-MM-DD HH:mm:ss')).toBe('2000-01-01 00:05:00');
    });

    it('goes forward by hour', () => {
      const zeit: Zeit = Zeit.ofString('2000-01-01 00:00:00', 'YYYY-MM-DD HH:mm:ss');
      const newZeit: Zeit = zeit.future(5, 'hour');

      expect(zeit.toString('YYYY-MM-DD HH:mm:ss')).toBe('2000-01-01 00:00:00');
      expect(newZeit.toString('YYYY-MM-DD HH:mm:ss')).toBe('2000-01-01 05:00:00');
    });

    it('goes forward by day', () => {
      const zeit: Zeit = Zeit.ofString('2000-01-01 00:00:00', 'YYYY-MM-DD HH:mm:ss');
      const newZeit: Zeit = zeit.future(5, 'day');

      expect(zeit.toString('YYYY-MM-DD HH:mm:ss')).toBe('2000-01-01 00:00:00');
      expect(newZeit.toString('YYYY-MM-DD HH:mm:ss')).toBe('2000-01-06 00:00:00');
    });

    it('goes forward by week', () => {
      const zeit: Zeit = Zeit.ofString('2000-01-01 00:00:00', 'YYYY-MM-DD HH:mm:ss');
      const newZeit: Zeit = zeit.future(5, 'week');

      expect(zeit.toString('YYYY-MM-DD HH:mm:ss')).toBe('2000-01-01 00:00:00');
      expect(newZeit.toString('YYYY-MM-DD HH:mm:ss')).toBe('2000-02-05 00:00:00');
    });

    it('goes forward by month', () => {
      const zeit: Zeit = Zeit.ofString('2000-01-01 00:00:00', 'YYYY-MM-DD HH:mm:ss');
      const newZeit: Zeit = zeit.future(5, 'month');

      expect(zeit.toString('YYYY-MM-DD HH:mm:ss')).toBe('2000-01-01 00:00:00');
      expect(newZeit.toString('YYYY-MM-DD HH:mm:ss')).toBe('2000-06-01 00:00:00');
    });

    it('goes forward by year', () => {
      const zeit: Zeit = Zeit.ofString('2000-01-01 00:00:00', 'YYYY-MM-DD HH:mm:ss');
      const newZeit: Zeit = zeit.future(5, 'year');

      expect(zeit.toString('YYYY-MM-DD HH:mm:ss')).toBe('2000-01-01 00:00:00');
      expect(newZeit.toString('YYYY-MM-DD HH:mm:ss')).toBe('2005-01-01 00:00:00');
    });
  });

  describe('isAfter', () => {
    it('returns true if the value is after than the other', () => {
      const zeit1: Zeit = Zeit.ofString('2000-01-02', 'YYYY-MM-DD');
      const zeit2: Zeit = Zeit.ofString('2000-01-03', 'YYYY-MM-DD');
      const zeit3: Zeit = Zeit.ofString('2000-01-04', 'YYYY-MM-DD');

      expect(zeit2.isAfter(zeit1)).toBe(true);
      expect(zeit2.isAfter(zeit2)).toBe(false);
      expect(zeit2.isAfter(zeit3)).toBe(false);
    });
  });

  describe('isBefore', () => {
    it('returns true if the value is before than the other', () => {
      const zeit1: Zeit = Zeit.ofString('2000-01-02', 'YYYY-MM-DD');
      const zeit2: Zeit = Zeit.ofString('2000-01-03', 'YYYY-MM-DD');
      const zeit3: Zeit = Zeit.ofString('2000-01-04', 'YYYY-MM-DD');

      expect(zeit2.isBefore(zeit1)).toBe(false);
      expect(zeit2.isBefore(zeit2)).toBe(false);
      expect(zeit2.isBefore(zeit3)).toBe(true);
    });
  });

  describe('isValid', () => {
    it('returns dayjs result itself', () => {
      expect(Zeit.ofString('2000-01-01', 'YYYY-MM-DD').isValid()).toBe(true);
      expect(Zeit.ofString('2000-01-01 01:02:03', 'YYYY-MM-DD HH:mm:ss').isValid()).toBe(true);
      expect(Zeit.of(dayjs('2000-YY-01 YY:02:03', 'YYYY-MM-DD', true)).isValid()).toBe(false);
    });
  });

  describe('past', () => {
    it('goes back by second', () => {
      const zeit: Zeit = Zeit.ofString('2000-01-01 00:00:00', 'YYYY-MM-DD HH:mm:ss');
      const newZeit: Zeit = zeit.past(5, 'second');

      expect(zeit.toString('YYYY-MM-DD HH:mm:ss')).toBe('2000-01-01 00:00:00');
      expect(newZeit.toString('YYYY-MM-DD HH:mm:ss')).toBe('1999-12-31 23:59:55');
    });

    it('goes back by minute', () => {
      const zeit: Zeit = Zeit.ofString('2000-01-01 00:00:00', 'YYYY-MM-DD HH:mm:ss');
      const newZeit: Zeit = zeit.past(5, 'minute');

      expect(zeit.toString('YYYY-MM-DD HH:mm:ss')).toBe('2000-01-01 00:00:00');
      expect(newZeit.toString('YYYY-MM-DD HH:mm:ss')).toBe('1999-12-31 23:55:00');
    });

    it('goes back by hour', () => {
      const zeit: Zeit = Zeit.ofString('2000-01-01 00:00:00', 'YYYY-MM-DD HH:mm:ss');
      const newZeit: Zeit = zeit.past(5, 'hour');

      expect(zeit.toString('YYYY-MM-DD HH:mm:ss')).toBe('2000-01-01 00:00:00');
      expect(newZeit.toString('YYYY-MM-DD HH:mm:ss')).toBe('1999-12-31 19:00:00');
    });

    it('goes back by day', () => {
      const zeit: Zeit = Zeit.ofString('2000-01-01 00:00:00', 'YYYY-MM-DD HH:mm:ss');
      const newZeit: Zeit = zeit.past(5, 'day');

      expect(zeit.toString('YYYY-MM-DD HH:mm:ss')).toBe('2000-01-01 00:00:00');
      expect(newZeit.toString('YYYY-MM-DD HH:mm:ss')).toBe('1999-12-27 00:00:00');
    });

    it('goes back by week', () => {
      const zeit: Zeit = Zeit.ofString('2000-01-01 00:00:00', 'YYYY-MM-DD HH:mm:ss');
      const newZeit: Zeit = zeit.past(5, 'week');

      expect(zeit.toString('YYYY-MM-DD HH:mm:ss')).toBe('2000-01-01 00:00:00');
      expect(newZeit.toString('YYYY-MM-DD HH:mm:ss')).toBe('1999-11-27 00:00:00');
    });

    it('goes back by month', () => {
      const zeit: Zeit = Zeit.ofString('2000-01-01 00:00:00', 'YYYY-MM-DD HH:mm:ss');
      const newZeit: Zeit = zeit.past(5, 'month');

      expect(zeit.toString('YYYY-MM-DD HH:mm:ss')).toBe('2000-01-01 00:00:00');
      expect(newZeit.toString('YYYY-MM-DD HH:mm:ss')).toBe('1999-08-01 00:00:00');
    });

    it('goes back by year', () => {
      const zeit: Zeit = Zeit.ofString('2000-01-01 00:00:00', 'YYYY-MM-DD HH:mm:ss');
      const newZeit: Zeit = zeit.past(5, 'year');

      expect(zeit.toString('YYYY-MM-DD HH:mm:ss')).toBe('2000-01-01 00:00:00');
      expect(newZeit.toString('YYYY-MM-DD HH:mm:ss')).toBe('1995-01-01 00:00:00');
    });
  });

  describe('toString', () => {
    it('would like with shorthand format', () => {
      expect(Zeit.ofString('2000-01-01', 'YYYY-MM-DD').toString('YYYY-MM-DD')).toBe('2000-01-01');
      expect(Zeit.ofString('2001-01-01', 'YYYY-MM-DD').toString('YYYY-MM-DD')).toBe('2001-01-01');
      expect(Zeit.ofString('2000-02-01', 'YYYY-MM-DD').toString('YYYY-MM-DD')).toBe('2000-02-01');
      expect(Zeit.ofString('2000-01-03', 'YYYY-MM-DD').toString('YYYY-MM-DD')).toBe('2000-01-03');
    });

    it('would like with longhand format', () => {
      expect(Zeit.ofString('2000-01-01 00:00:00', 'YYYY-MM-DD HH:mm:ss').toString('YYYY-MM-DD HH:mm:ss')).toBe('2000-01-01 00:00:00');
      expect(Zeit.ofString('3000-01-01 00:00:00', 'YYYY-MM-DD HH:mm:ss').toString('YYYY-MM-DD HH:mm:ss')).toBe('3000-01-01 00:00:00');
      expect(Zeit.ofString('2000-01-05 00:00:00', 'YYYY-MM-DD HH:mm:ss').toString('YYYY-MM-DD HH:mm:ss')).toBe('2000-01-05 00:00:00');
      expect(Zeit.ofString('2000-01-01 06:00:00', 'YYYY-MM-DD HH:mm:ss').toString('YYYY-MM-DD HH:mm:ss')).toBe('2000-01-01 06:00:00');
      expect(Zeit.ofString('2000-01-01 00:07:00', 'YYYY-MM-DD HH:mm:ss').toString('YYYY-MM-DD HH:mm:ss')).toBe('2000-01-01 00:07:00');
      expect(Zeit.ofString('2000-01-01 00:00:08', 'YYYY-MM-DD HH:mm:ss').toString('YYYY-MM-DD HH:mm:ss')).toBe('2000-01-01 00:00:08');
    });
  });
});
