import * as React from 'react';
//import { useSelector } from 'react-redux';
import { _IState, _ITriggers } from 'src/_redux/types';
import { useReflector } from '@reflexio/react-v1/lib/useReflector';
import { useTrigger } from '@reflexio/react-v1/lib/useTrigger';
import classNames from 'classnames';
import './style.less';

export const LeaveFormNotification = () => {
  const notifications = useReflector<
    _ITriggers,
    _IState,
    _IState['app']['notification']
  >((state) => state.app.notification, ['notification']);
  const trigger = useTrigger<_ITriggers>();
  const colorClass = notifications?.color || 'primary';

  return (
    <div className={'leave-form-notification'}>
      <div className='text'>Уйти без сохранения?</div>
      <div className='buttons'>
        <button
          className={classNames(
            'button',
            `notification-${colorClass.toLowerCase()}`
          )}
          onClick={() => trigger('notification', 'clickYes', null)}
        >
          Да
        </button>
        {/* <button
          className='button'
          onClick={() => trigger('notification', 'clickNo', null)}
        >
          Нет
        </button> */}
        <button
          className={classNames(
            'button',
            `notification-${colorClass.toLowerCase()}`
          )}
          onClick={() => trigger('notification', 'close', null)}
        >
          Отмена
        </button>
      </div>
    </div>
  );
};
