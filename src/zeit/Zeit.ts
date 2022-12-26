import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';
import minMax from 'dayjs/plugin/minMax.js';
import utc from 'dayjs/plugin/utc.js';
import { ValueObject } from '../object/index.js';
import { ZeitError } from './ZeitError.js';

dayjs.extend(customParseFormat);
dayjs.extend(minMax);
dayjs.extend(utc);

export type ZeitUnitType = 'day' | 'hour' | 'minute' | 'month' | 'second' | 'week' | 'year';

export class Zeit extends ValueObject {
  private readonly zeit: dayjs.Dayjs;

  public static max(zeiten: Iterable<Zeit>): Zeit {
    const z: Array<Zeit> = [...zeiten];

    if (z.length === 0) {
      throw new ZeitError('ZEITEN ARE EMPTY');
    }
    if (z.length === 1) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return z[0]!;
    }

    const dates: Array<dayjs.Dayjs> = z.map<dayjs.Dayjs>((zeit: Zeit) => {
      return zeit.get();
    });

    const max: dayjs.Dayjs = dayjs.max(dates).utc(true);

    return Zeit.of(max);
  }

  public static min(zeiten: Iterable<Zeit>): Zeit {
    const z: Array<Zeit> = [...zeiten];

    if (z.length === 0) {
      throw new ZeitError('ZEITEN ARE EMPTY');
    }
    if (z.length === 1) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return z[0]!;
    }

    const dates: Array<dayjs.Dayjs> = z.map((zeit: Zeit): dayjs.Dayjs => {
      return zeit.get();
    });

    const min: dayjs.Dayjs = dayjs.min(dates).utc(true);

    return Zeit.of(min);
  }

  public static now(): Zeit {
    return Zeit.of(dayjs().utc(false));
  }

  public static of(zeit: dayjs.Dayjs): Zeit {
    return new Zeit(zeit.utc(true));
  }

  public static ofDate(date: Date): Zeit {
    const zeit: dayjs.Dayjs = dayjs(date).utc(true);

    return Zeit.of(zeit);
  }

  public static ofString(str: string, format: string): Zeit {
    const zeit: dayjs.Dayjs = dayjs(str, format, true).utc(true);

    if (zeit.isValid()) {
      return Zeit.of(zeit);
    }

    throw new ZeitError(`ILLEGAL ZEIT SPECIFIED: ${str}`);
  }

  public static validate(str: string, format: string): boolean {
    const zeit: dayjs.Dayjs = dayjs(str, format, true).utc(true);

    return zeit.isValid();
  }

  private constructor(zeit: dayjs.Dayjs) {
    super();
    this.zeit = zeit;
  }

  public equals(other: unknown): boolean {
    if (this === other) {
      return true;
    }
    if (!(other instanceof Zeit)) {
      return false;
    }

    return this.zeit.isSame(other.zeit);
  }

  public future(value: number, unit: ZeitUnitType): Zeit {
    return Zeit.of(this.zeit.add(value, unit));
  }

  public get(): dayjs.Dayjs {
    return this.zeit;
  }

  public isAfter(other: Zeit): boolean {
    return this.zeit.isAfter(other.zeit);
  }

  public isBefore(other: Zeit): boolean {
    return this.zeit.isBefore(other.zeit);
  }

  public isValid(): boolean {
    return this.zeit.isValid();
  }

  public past(value: number, unit: ZeitUnitType): Zeit {
    return Zeit.of(this.zeit.subtract(value, unit));
  }

  public serialize(format?: string): string {
    return this.zeit.format(format);
  }

  public override toString(format?: string): string {
    return this.serialize(format);
  }
}