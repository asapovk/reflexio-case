import * as React from 'react';
//import { useSelector } from 'react-redux';
import { _IState, _ITriggers } from 'src/_redux/types';
import { useReflector } from '@reflexio/react-v1/lib/useReflector';
import { useTrigger } from '@reflexio/react-v1/lib/useTrigger';
import './style.less';
import { LeaveFormNotification } from './LeaveFormNofication';
import classNames from 'classnames';
import { ReturnToFormNotification } from './ReturnToFormNotification';

export const Notification = () => {
  const state = useReflector<_ITriggers, _IState, _IState>(
    (state) => state,
    ['notification']
  );
  const trigger = useTrigger<_ITriggers>();

  const notificationState = state.app.notification;
  const colorClass = state.app?.notification?.color || 'primary';

  return notificationState?.isShown ? (
    <div
      className={classNames(
        'notification',
        `notification-${colorClass.toLowerCase()}`
      )}
    >
      {!notificationState.smartNotification ? notificationState.text : null}
      {notificationState.smartNotification?.leaveForm ? (
        <LeaveFormNotification />
      ) : null}
      {notificationState.smartNotification?.returnToForm ? (
        <ReturnToFormNotification />
      ) : null}
    </div>
  ) : null;
};
