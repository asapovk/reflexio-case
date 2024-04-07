/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, useLayoutEffect } from 'react';
import { _IState, _ITriggers } from '../../_redux/types';
import '../styles/auth.less';
import { Text } from '../../_ui/Text';
import { TextInput } from '../../_ui/Input';
import { useReflector, useTrigger } from '@reflexio/react-v1';

export const AuthPage = () => {
  const trigger = useTrigger<_ITriggers>('AuthPage');
  const appState = useReflector<_ITriggers, _IState, _IState>(
    (state) => state,
    ['authForm', 'authController']
  );

  const formState = appState.auth?.authForm;

  return (
    <div className='auth-page'>
      <div className='auth-form'>
        <TextInput
          onChange={(e) =>
            trigger('authForm', 'typeField', {
              fieldName: 'login',
              value: e.target.value,
            })
          }
          value={appState.auth?.authForm?.fields['login']?.value}
        />
        <TextInput
          onChange={(e) =>
            trigger('authForm', 'typeField', {
              fieldName: 'password',
              value: e.target.value,
            })
          }
          value={appState.auth?.authForm?.fields['password']?.value}
        />
        <div>{formState?.formError}</div>
        <button onClick={() => trigger('authForm', 'submitForm', null)}>
          Войти
        </button>
      </div>
    </div>
  );
};
