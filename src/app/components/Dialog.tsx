/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { Fragment, memo } from 'react';
import { CreateUserDialog } from '../../users/components/CreateProfileDialog';
import cn from 'classnames';
import { useTrigger } from '@reflexio/react-v1/lib/useTrigger';
import { useReflector } from '@reflexio/react-v1/lib/useReflector';
import { _IState, _ITriggers } from '../../_redux/types';
import './styles.less';
import { CreateGroupDialog } from '../../groups/components/CreateGroupDialog';
import { UpdateGroupDialog } from '../../groups/components/UpdateGroupDialog';
import { CreateInviteDialog } from '../../invites/components/DialogCreateInvite';

export const Dialog = memo(() => {
  const trigger = useTrigger<_ITriggers>('Dialog');

  const appState = useReflector<_ITriggers, _IState, _IState['app']>(
    (state) => state.app,
    ['appController']
  );

  const onDialogClose = () => {
    trigger('appController', 'closeDialog', null);
  };

  return appState.appController.dialog ? (
    <div className='dialog-background'>
      <div className='dialog-layer' onClick={onDialogClose}></div>
      <div className='dialog-window'>
        {appState.appController.dialog?.createUser ? (
          <CreateUserDialog />
        ) : null}
        {appState.appController.dialog?.editUser ? <CreateUserDialog /> : null}
        {appState.appController.dialog?.createGroup ? (
          <CreateGroupDialog />
        ) : null}
        {appState.appController.dialog?.editGroup ? (
          <UpdateGroupDialog />
        ) : null}
        {appState.appController.dialog?.createInvite ? (
          <CreateInviteDialog />
        ) : null}
      </div>
    </div>
  ) : null;
});
