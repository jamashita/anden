import { randomBytes } from 'crypto';

const chars: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

export const random = (length: number): string => {
  const charLength: number = chars.length;

  const buf: Buffer = randomBytes(length);
  return buf.reduce<string>((p: string, i: number) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return `${p}${chars[i % charLength]!}`;
  }, '');
};
