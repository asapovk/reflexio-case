/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { Fragment, memo } from 'react';
import { TextInput } from '../../_ui/Input';
import { Button } from '../../_ui/Button';
import { useReflector, useTrigger } from '@reflexio/react-v1';
import { _IState, _ITriggers } from '../../_redux/types';
import { Menu } from '../../_ui/Menu';

export const GroupsRightColumn = () => {
  const trigger = useTrigger<_ITriggers>('GroupsRightColumn');
  const appState = useReflector<_ITriggers, _IState, _IState>(
    (state) => state,
    ['groupsController', 'groupsRightColumn']
  );

  const usersList = appState.groups.groupsRightColumn.usersList;
  const isLoading = appState.groups.groupsRightColumn.isLoading;
  const currentGroup = appState.groups.groupsController.currentGroup;

  return (
    <div>
      <Menu
        size='m'
        items={['Users', 'Invites']}
        onSelect={(n) => {
          if (n === 0) {
            trigger('router', 'goTo', `/groups/${currentGroup.groupId}/users`);
            //go relational path groups/?/users
          } else {
            trigger(
              'router',
              'goTo',
              `/groups/${currentGroup.groupId}/invites`
            );
            //go relational path groups/?/invites
          }
        }}
      />
      <div>
        {isLoading ? 'Loading...' : null}
        {!isLoading
          ? usersList.map((u) => <ol key={u.userId}>{u.name}</ol>)
          : null}
      </div>
    </div>
  );
};
