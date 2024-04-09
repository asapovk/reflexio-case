import * as React from 'react';
//import { useSelector } from 'react-redux';
import { _IState, _ITriggers } from 'src/_redux/types';
import { useReflector } from '@reflexio/react-v1/lib/useReflector';
import { useTrigger } from '@reflexio/react-v1/lib/useTrigger';
import classNames from 'classnames';
import './style.less';

export const ReturnToFormNotification = () => {
  const notifications = useReflector<
    _ITriggers,
    _IState,
    _IState['app']['notification']
  >((state) => state.app.notification, ['notification']);
  const trigger = useTrigger<_ITriggers>();
  const colorClass = notifications?.color || 'primary';

  return (
    <div className={'leave-form-notification'}>
      <div className='text'>Вернуться к редактированию формы?</div>
      <div className='buttons'>
        <button
          className={classNames(
            'button',
            `notification-${colorClass.toLowerCase()}`
          )}
          onClick={() => trigger('notification', 'clickYesReturnToForm', null)}
        >
          Да
        </button>
        <button
          className={classNames(
            'button',
            `notification-${colorClass.toLowerCase()}`
          )}
          onClick={() => trigger('notification', 'close', null)}
        >
          Закрыть
        </button>
      </div>
    </div>
  );
};
