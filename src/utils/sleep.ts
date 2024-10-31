export const sleep = (secunds: number = 1) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, secunds * 1000);
  });
};
