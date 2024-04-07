export const loadUsers = async (arg: any) =>
  new Promise((res, rej) => {
    setTimeout(() => {
      res({
        clients: [
          {
            userId: 26,
            username: 'Elizaveta Astapova',
            dtExpire: null,
            invite: null,
            group: {
              groupName: 'first_group23',
              dtCreate: '2023-11-29T09:23:23.630Z',
              groupId: 1,
            },
          },
          {
            userId: 23,
            username: 'Optimus_13',
            dtExpire: null,
            invite: null,
            group: {
              groupName: 'smartGroup223s',
              dtCreate: '2024-03-10T02:18:07.350Z',
              groupId: 2,
            },
          },
        ],
      });
    }, 1500);
  });
