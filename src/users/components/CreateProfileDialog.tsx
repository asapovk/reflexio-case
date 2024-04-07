/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { Fragment, memo } from 'react';
import { TextInput } from '../../_ui/Input';
import { Button } from '../../_ui/Button';
import { useReflector, useTrigger } from '@reflexio/react-v1';
import { _IState, _ITriggers } from '../../_redux/types';

export const CreateUserDialog = () => {
  const trigger = useTrigger<_ITriggers>('AppContainer');
  const appState = useReflector<_ITriggers, _IState, _IState>(
    (state) => state,
    ['loadUsers', 'createUserForm']
  );

  return (
    <div>
      <div>Create User</div>
      <TextInput
        value={appState.users.createUserForm?.fields['username']?.value}
        onChange={(e) =>
          trigger('createUserForm', 'typeField', {
            fieldName: 'username',
            value: e.target.value,
          })
        }
      />
      <div>{appState.users.createUserForm?.fields['username']?.error}</div>
      <Button onClick={() => trigger('createUserForm', 'submitForm', null)}>
        submit
      </Button>
    </div>
  );
};
