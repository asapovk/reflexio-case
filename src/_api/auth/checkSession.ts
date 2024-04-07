export const checkSession = async (args: any) =>
  new Promise((res, rej) => {
    setTimeout(() => {
      res({ checkSession: { isAuth: true, isMaster: true } });
    }, 1500);
  });
