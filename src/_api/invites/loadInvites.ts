export const loadInvites = async () =>
  new Promise((res, rej) => {
    setTimeout(() => {
      res({
        invites: [
          {
            status: null,
            useCount: 0,
            inviteId: 2,
            dtCreate: '2024-03-17T10:33:55.733Z',
            name: 'newName',
            dtExpire: null,
          },
        ],
      });
    }, 1500);
  });
