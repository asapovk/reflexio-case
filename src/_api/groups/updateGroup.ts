export const updateGroup = async (args: any) =>
  new Promise((res, rej) => {
    setTimeout(() => {
      res({ updateGroup: true });
    }, 1500);
  });
