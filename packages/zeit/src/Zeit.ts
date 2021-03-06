import { ValueObject } from '@jamashita/anden-object';
import { Kind } from '@jamashita/anden-type';
import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';
import utc from 'dayjs/plugin/utc';
import { ZeitError } from './Error/ZeitError.js';

dayjs.extend(utc);
dayjs.extend(minMax);

export type ZeitUnitType = 'day' | 'hour' | 'minute' | 'month' | 'second' | 'week' | 'year';

export class Zeit extends ValueObject<'Zeit'> {
  public readonly noun: 'Zeit' = 'Zeit';
  private readonly zeit: dayjs.Dayjs;
  private readonly format: string;

  public static max(zeiten: Iterable<Zeit>, format: string): Zeit {
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

    const max: dayjs.Dayjs = dayjs.max(dates);

    return Zeit.of(max, format);
  }

  public static min(zeiten: Iterable<Zeit>, format: string): Zeit {
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

    const min: dayjs.Dayjs = dayjs.min(dates);

    return Zeit.of(min, format);
  }

  public static now(format: string): Zeit {
    return Zeit.of(dayjs.utc(), format);
  }

  public static of(zeit: dayjs.Dayjs, format: string): Zeit {
    return new Zeit(zeit, format);
  }

  public static ofString(str: string, format: string): Zeit {
    const zeit: dayjs.Dayjs = dayjs.utc(str, format);

    if (zeit.format(format) === str) {
      return Zeit.of(zeit, format);
    }

    throw new ZeitError(`ILLEGAL ZEIT SPECIFIED: ${str}`);
  }

  public static validate(str: string, format: string): boolean {
    const zeit: dayjs.Dayjs = dayjs.utc(str, format);

    if (zeit.format(format) === str) {
      return true;
    }

    return false;
  }

  private constructor(zeit: dayjs.Dayjs, format: string) {
    super();
    this.zeit = zeit;
    this.format = format;
  }

  public equals(other: unknown): boolean {
    if (this === other) {
      return true;
    }
    if (!(other instanceof Zeit)) {
      return false;
    }
    if (this.format !== other.format) {
      return false;
    }

    return this.zeit.isSame(other.zeit);
  }

  public serialize(format?: string): string {
    if (Kind.isUndefined(format)) {
      return this.zeit.format(this.format);
    }

    return this.zeit.format(format);
  }

  public override toString(format?: string): string {
    return this.serialize(format);
  }

  public future(value: number, unit: ZeitUnitType): Zeit {
    return Zeit.of(this.zeit.add(value, unit), this.format);
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
    return Zeit.of(this.zeit.subtract(value, unit), this.format);
  }
}
