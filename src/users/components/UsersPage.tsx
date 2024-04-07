/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { Fragment, memo } from 'react';
import { CreateUserDialog } from './CreateProfileDialog';
import cn from 'classnames';
import { useTrigger } from '@reflexio/react-v1/lib/useTrigger';
import { useReflector } from '@reflexio/react-v1/lib/useReflector';
import { _IState, _ITriggers } from '../../_redux/types';
import '../styles/users-table.less';
import { IUsersRow } from '../../_interfaces/users/IUsersRow.interface';
import { UsersPageLoading } from './Loader';
import { Text } from '../../_ui/Text';

export const UsersTableHeader = () => (
  <div className='table-header'>
    <div className='table-column'>User ID</div>
    <div className='table-column'>Username</div>
    <div className='table-column'>Email</div>
    <div className='table-column'>Group</div>
    <div className='table-column'>Plan</div>
  </div>
);
export const UsersTableRow = (props: {
  user: IUsersRow;
  onClick: () => void;
}) => (
  <div onClick={() => props.onClick()} className='table-row'>
    <div className='table-column'>{props.user.userId}</div>
    <div className='table-column'>{props.user.name}</div>
    <div className='table-column'>{props.user.email}</div>
    <div className='table-column'>{props.user.group}</div>
    <div className='table-column'>{props.user.plan}</div>
  </div>
);

export const UsersPage = () => {
  const trigger = useTrigger<_ITriggers>('UsersPage');
  const appState = useReflector<_ITriggers, _IState, _IState>(
    (state) => state,
    ['usersController']
  );
  const list = appState.users.usersComponent.usersList;
  const isLoading = !appState.users.usersController?.isReady;

  return (
    <div>
      <Text size='l'>Users</Text>
      {isLoading ? <UsersPageLoading /> : null}
      {!isLoading ? (
        <div className='users-table'>
          <UsersTableHeader />
          {list.map((u) => (
            <UsersTableRow
              onClick={() =>
                trigger('router', 'goTo', `/users/${u.userId}/edit`)
              }
              key={u.userId}
              user={u}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};
