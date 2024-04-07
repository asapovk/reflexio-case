export const loadGroups = async (args: any) =>
  new Promise((res, rej) => {
    setTimeout(() => {
      res({
        groups: [
          {
            groupId: 4,
            groupName: 'Assd',
            dtCreate: '2024-03-22T02:16:45.119Z',
          },
          {
            groupId: 7,
            groupName: 'As1232',
            dtCreate: '2024-04-05T08:21:45.133Z',
          },
          {
            groupId: 10,
            groupName: 'Assds',
            dtCreate: '2024-04-05T09:59:08.889Z',
          },
          {
            groupId: 11,
            groupName: 'As122',
            dtCreate: '2024-04-06T00:27:17.848Z',
          },
          {
            groupId: 14,
            groupName: 'asd',
            dtCreate: '2024-04-06T00:49:05.506Z',
          },
          {
            groupId: 6,
            groupName: 'As3233sd223',
            dtCreate: '2024-03-22T08:16:53.494Z',
          },
          {
            groupId: 3,
            groupName: 'Asasd12sd22',
            dtCreate: '2024-03-22T02:14:32.265Z',
          },
          {
            groupId: 1,
            groupName: 'first_group23',
            dtCreate: '2023-11-29T09:23:23.630Z',
          },
          {
            groupId: 8,
            groupName: 'As22ds',
            dtCreate: '2024-04-05T09:55:58.582Z',
          },
          {
            groupId: 13,
            groupName: 'sdasd23',
            dtCreate: '2024-04-06T00:47:47.268Z',
          },
          {
            groupId: 9,
            groupName: 'Asasdsdsd12',
            dtCreate: '2024-04-05T09:56:58.211Z',
          },
          {
            groupId: 5,
            groupName: 'As123фыв',
            dtCreate: '2024-03-22T08:11:16.862Z',
          },
          {
            groupId: 12,
            groupName: 'As222',
            dtCreate: '2024-04-06T00:44:55.684Z',
          },
          {
            groupId: 2,
            groupName: 'smartGroup223s',
            dtCreate: '2024-03-10T02:18:07.350Z',
          },
        ],
      });
    }, 1500);
  });
