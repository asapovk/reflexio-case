/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { Fragment, memo } from 'react';
import { useReflector, useTrigger } from '@reflexio/react-v1';
import { _IState, _ITriggers } from '../../_redux/types';

export const UsersRightColumn = () => {
  const trigger = useTrigger<_ITriggers>('AppContainer');
  const appState = useReflector<_ITriggers, _IState, _IState>(
    (state) => state,
    ['loadUsers', 'usersController']
  );

  return <div></div>;
};
