export const wait = (timeout: number): Promise<void> => {
  return new Promise<void>((resolve: () => unknown) => {
    setTimeout(() => {
      resolve();
    }, timeout);
  });
};
