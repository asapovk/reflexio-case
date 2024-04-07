/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { Fragment, memo } from 'react';
import { CreateUserDialog } from '../../users/components/CreateProfileDialog';
import cn from 'classnames';
import { useTrigger } from '@reflexio/react-v1/lib/useTrigger';
import { useReflector } from '@reflexio/react-v1/lib/useReflector';
import { _IState, _ITriggers } from '../../_redux/types';
import './styles.less';
import { GroupsRightColumn } from '../../groups/components/GroupsRightColumn';

export const RightColumn = () => {
  const trigger = useTrigger<_ITriggers>('RightColumn');
  const appState = useReflector<_ITriggers, _IState, _IState>(
    (state) => state,
    ['appController']
  );
  const currentPage = appState.app.appController.page;

  return (
    <div className='right-column'>
      <div className='right-column-header'>
        {currentPage.groups ? <GroupsRightColumn /> : null}
      </div>
    </div>
  );
};
