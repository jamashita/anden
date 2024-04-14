import crypto from 'node:crypto';

const small: string = 'abcdefghijklmnopqrstuvwxyz';
const large: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const digit: string = '0123456789';
const chars: string = `${small}${large}${digit}`;

export const random = (length: number): string => {
  if (length <= 0) {
    return '';
  }

  const charLength: number = chars.length;

  const buf: Buffer = crypto.randomBytes(length);
  return buf.reduce((p: string, i: number) => {
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    return `${p}${chars[i % charLength]!}`;
  }, '');
};

export const asyncRandom = (length: number): Promise<string> => {
  return new Promise((resolve: (ret: string) => void): void => {
    resolve(random(length));
  });
};
