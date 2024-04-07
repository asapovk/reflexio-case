export const mapError = (errorCode: string): string => {
  if (errorCode === 'NOT_FOUND') {
    return 'Пользоваетель не найден';
  }

  return 'Неизвестная ошибка';
};
