export const wait = (timeout: number): Promise<void> => {
  return new Promise((resolve: () => unknown) => {
    setTimeout(() => {
      resolve();
    }, timeout);
  });
};
