export const loadUsers = () =>
  new Promise((res, rej) => {
    setTimeout(() => {
      res([
        {
          plan: 'Free',
          name: 'Ivan',
          email: 'vasya@mail.ru',
          group: 'first',
          userId: 1,
        },
        {
          plan: 'Free',
          name: 'Vasya',
          email: 'vasya@mail.ru',
          group: 'first',
          userId: 2,
        },
        {
          plan: 'Premium',
          name: 'John',
          email: 'vasya@mail.ru',
          group: 'first',
          userId: 3,
        },
      ]);
    }, 3000);
  });
