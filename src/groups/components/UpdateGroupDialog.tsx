/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { Fragment, memo } from 'react';
import { TextInput } from '../../_ui/Input';
import { Button } from '../../_ui/Button';
import { useReflector, useTrigger } from '@reflexio/react-v1';
import { _IState, _ITriggers } from '../../_redux/types';
import '../styles/groups-dialog.less';

export const UpdateGroupDialog = () => {
  const trigger = useTrigger<_ITriggers>('CreateGroupDialog');
  const appState = useReflector<_ITriggers, _IState, _IState>(
    (state) => state,
    ['groupsController', 'createGroupForm']
  );

  return (
    <div className='groups-dialog'>
      <div className='up-group'>
        <div className='form-title'>Обновить группу</div>
        <div className='form-input'>
          <TextInput
            value={appState.groups.createGroupForm?.fields['groupName']?.value}
            onChange={(e) =>
              trigger('createGroupForm', 'typeField', {
                fieldName: 'groupName',
                value: e.target.value,
              })
            }
          />
          <div className='form-error'>
            {appState.groups.createGroupForm?.formError}
          </div>
          <div className='success-message'>
            {appState.groups.groupsController.successMessage}
          </div>
        </div>
      </div>
      <div className='down-block'>
        <Button onClick={() => trigger('createGroupForm', 'submitForm', null)}>
          submit
        </Button>
      </div>
    </div>
  );
};
