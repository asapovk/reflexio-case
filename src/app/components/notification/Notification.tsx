import * as React from 'react';
//import { useSelector } from 'react-redux';
import { _IState, _ITriggers } from 'src/_redux/types';
import { useReflector } from '@reflexio/react-v1/lib/useReflector';
import { useTrigger } from '@reflexio/react-v1/lib/useTrigger';
import './style.less';

export const Notification = () => {
  const notifications = useReflector<
    _ITriggers,
    _IState,
    _IState['app']['notification']
  >((state) => state.app.notification, ['notification']);
  const trigger = useTrigger<_ITriggers>();

  return notifications?.isShown ? (
    <div
      onClick={() => trigger('notification', 'close', null)}
      className='notification'
    >
      {notifications.text}
    </div>
  ) : null;
};
