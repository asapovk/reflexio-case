export type ERRORS = keyof typeof errorsMap;

export const errorsMap = {
  GROUP_UPDATE_FAIL: 'Не удалось обновить группу',
  LOAD_GROUPS_FAIL: 'Не удалось получить спискок групп',
  GROUP_CREATE_FAIL: 'Не удалось создать группу',
  LOAD_USERS_FAIL: 'Не удалось загрузить список пользователей',
};
