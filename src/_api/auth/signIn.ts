export const signIn = async (args: any) =>
  new Promise((res, rej) => {
    setTimeout(() => {
      res({ signIn: { isAuth: true, isMaster: true } });
    }, 1500);
  });
