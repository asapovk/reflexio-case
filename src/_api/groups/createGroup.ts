export const createGroup = async (args: any) =>
  new Promise((res, rej) => {
    setTimeout(() => {
      res({ createGroup: 10 });
    }, 1500);
  });
