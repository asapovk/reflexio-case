/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { Fragment, memo } from 'react';
import { TextInput } from '../../_ui/Input';
import { Button } from '../../_ui/Button';
import { useReflector, useTrigger } from '@reflexio/react-v1';
import { _IState, _ITriggers } from '../../_redux/types';

export const CreateInviteDialog = () => {
  const trigger = useTrigger<_ITriggers>('CreateInviteDialog');
  const appState = useReflector<_ITriggers, _IState, _IState>(
    (state) => state,
    ['loadInvites', 'createInviteForm']
  );

  return (
    <div>
      <div>Создать приглашение</div>
      <TextInput
        value={appState.invites.createInviteForm?.fields['inviteName']?.value}
        onChange={(e) =>
          trigger('createInviteForm', 'typeField', {
            fieldName: 'inviteName',
            value: e.target.value,
          })
        }
      />
      <div>{appState.groups.createGroupForm?.fields['inviteName']?.error}</div>
      <Button onClick={() => trigger('createInviteForm', 'submitForm', null)}>
        submit
      </Button>
    </div>
  );
};
