import dayjs, { type Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';
import minMax from 'dayjs/plugin/minMax.js';
import utc from 'dayjs/plugin/utc.js';
import { ValueObject } from '../object/index.js';
import { type Equatable, Kind, type Nullable, type Primitive } from '../type/index.js';
import { ZeitError } from './ZeitError.js';

dayjs.extend(customParseFormat);
dayjs.extend(minMax);
dayjs.extend(utc);

export type ZeitUnitType = 'day' | 'hour' | 'minute' | 'month' | 'second' | 'week' | 'year';

export class Zeit extends ValueObject {
  private readonly zeit: Dayjs;

  public static earliest(zeiten: Iterable<Zeit>): Zeit {
    const z: Array<Zeit> = [...zeiten];

    if (z.length === 0) {
      throw new ZeitError('ZEITEN ARE EMPTY');
    }
    if (z.length === 1) {
      // biome-ignore lint/style/noNonNullAssertion: <explanation>
      return z[0]!;
    }

    const dates: Array<Dayjs> = z.map((zeit: Zeit) => {
      return zeit.get();
    });

    const min: Nullable<Dayjs> = dayjs.min(dates);

    if (Kind.isNull(min)) {
      throw new ZeitError('NO MINIMUM DATE FOUND');
    }

    return Zeit.of(min.utc(true));
  }

  public static latest(zeiten: Iterable<Zeit>): Zeit {
    const z: Array<Zeit> = [...zeiten];

    if (z.length === 0) {
      throw new ZeitError('ZEITEN ARE EMPTY');
    }
    if (z.length === 1) {
      // biome-ignore lint/style/noNonNullAssertion: <explanation>
      return z[0]!;
    }

    const dates: Array<Dayjs> = z.map((zeit: Zeit) => {
      return zeit.get();
    });

    const max: Nullable<Dayjs> = dayjs.max(dates);

    if (Kind.isNull(max)) {
      throw new ZeitError('NO MAXIMUM DATE FOUND');
    }

    return Zeit.of(max.utc(true));
  }

  public static now(): Zeit {
    return Zeit.of(dayjs().utc(false));
  }

  public static of(zeit: Dayjs): Zeit {
    return new Zeit(zeit.utc(true));
  }

  public static ofDate(date: Date): Zeit {
    const zeit: Dayjs = dayjs(date).utc(true);

    return Zeit.of(zeit);
  }

  public static ofString(str: string, format: string): Zeit {
    const zeit: Dayjs = dayjs(str, format, true).utc(true);

    if (zeit.isValid()) {
      return Zeit.of(zeit);
    }

    throw new ZeitError(`ILLEGAL ZEIT SPECIFIED: ${str}`);
  }

  public static validate(str: string, format: string): boolean {
    const zeit: Dayjs = dayjs(str, format, true).utc(true);

    return zeit.isValid();
  }

  public constructor(zeit: Dayjs) {
    super();
    this.zeit = zeit;
  }

  public advance(value: number, unit: ZeitUnitType): Zeit {
    return Zeit.of(this.zeit.subtract(value, unit));
  }

  public override equals(other: unknown): boolean {
    if (this === other) {
      return true;
    }
    if (!(other instanceof Zeit)) {
      return false;
    }

    return this.zeit.isSame(other.zeit);
  }

  public get(): Dayjs {
    return this.zeit;
  }

  protected getEquatableProperties(): Array<Equatable> {
    return [];
  }

  protected getPrimitiveProperties(): Array<Primitive> {
    return [];
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

  public postpone(value: number, unit: ZeitUnitType): Zeit {
    return Zeit.of(this.zeit.add(value, unit));
  }

  public serialize(format?: string): string {
    return this.zeit.format(format);
  }

  public override toString(format?: string): string {
    return this.serialize(format);
  }
}
