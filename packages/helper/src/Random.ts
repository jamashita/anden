import crypto from 'crypto';

const chars: string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

export const random = (length: number): string => {
  const charLength: number = chars.length;

  const buf: Buffer = crypto.randomBytes(length);
  return buf.reduce<string>((p: string, i: number) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return `${p}${chars[i % charLength]!}`;
  }, '');
};

export const asyncRandom = (length: number): Promise<string> => {
  return new Promise<string>((resolve: (ret: string) => void): void => {
    resolve(random(length));
  });
};
