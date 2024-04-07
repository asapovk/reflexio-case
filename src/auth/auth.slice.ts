/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Bite, Slice } from '@reflexio/core-v1';
import { BiteStatusWrap } from '@reflexio/core-v1/lib/types';
import {
  IRouterTriggers,
  IRouterState,
} from '@reflexio/bite-routing-v1/lib/types';
import { IStagingTriggers } from '@reflexio/bite-staging-v1/lib/types';
import { _IState, _ITriggers } from '../_redux/types';
import { biteRouting } from '@reflexio/bite-routing-v1';
import { biteStaging } from '@reflexio/bite-staging-v1';
import { biteEventManager } from '@reflexio/bite-event-manager-v1';
import { IEventManagerTriggers } from '@reflexio/bite-event-manager-v1/lib/types';
import { biteLightController } from '@reflexio/bite-light-controller-v1';
import {
  IFormBiteTriggers,
  IFormState,
} from '@reflexio/bite-forms-v1/lib/types';
import { biteForms } from '@reflexio/bite-forms-v1';
import { asyncInitialState, biteAsync } from '@reflexio/bite-async-v1';
import { AsyncState, AsyncTrigger } from '@reflexio/bite-async-v1/lib/types';
import { Queries } from '../_api/_reqTypes';
//import { LS } from '../../../core/localStorage';
import { mapError } from '../_utils/auth/errors';
import { signIn } from '../_api/auth/signIn';
import { checkSession } from '../_api/auth/checkSession';
export type IAuthTriggers = {
  authForm: BiteStatusWrap<IFormBiteTriggers>;
  authReq: BiteStatusWrap<
    AsyncTrigger<
      Queries['checkSession']['params'],
      Queries['checkSession']['response']
    >
  >;
  signInReq: BiteStatusWrap<
    AsyncTrigger<Queries['signIn']['params'], Queries['signIn']['response']>
  >;
  authController: BiteStatusWrap<{
    init: null;
    done: boolean;
    auth: boolean;
    openSingIn: null;
    closeSignIn: null;
    drop: null;
    throwHttpError: {
      code?: number;
      message: string;
      type?: string;
    };
  }>;
};

export type IAuthState = {
  isAuth: boolean;
  authReq: AsyncState<
    Queries['checkSession']['params'],
    Queries['checkSession']['response']
  >;
  signInReq: AsyncState<
    Queries['signIn']['params'],
    Queries['signIn']['response']
  >;
  authForm: IFormState;
};

export const authInitialState: IAuthState = {
  isAuth: false,
  authForm: null,
  authReq: asyncInitialState(),
  signInReq: asyncInitialState(),
};

const authControllerBite = biteLightController<
  _ITriggers,
  IAuthState,
  'authController',
  _ITriggers
>('authController', {
  reducer: {
    done(state: IAuthState, payload) {
      state.isAuth = payload;
    },
    auth: null,
    openSingIn: null,
    closeSignIn: null,
    init: null,
    throwHttpError: null,
    drop: null,
  },
  script: {
    watchScope: ['authForm', 'authController'],
    async init(opt, pld) {
      console.log('AUTH init');
    },
    async watch(opt, args) {
      const closeSignInEvent = opt.catchStatus('closeSignIn', args);
      if (closeSignInEvent.isCatched) {
        opt.trigger('authForm', 'dropForm', null);
      }
      const authEvent = opt.catchStatus('auth', args);
      if (authEvent.isCatched) {
        const res = await opt.hook('authReq', 'init', 'done', null, 10000);
        opt.setStatus('done', !res.rejected);
      }
      const errorEvent = opt.catchStatus('throwHttpError', args);
      if (errorEvent.isCatched) {
        console.log('throwHttpError');
        const payload = errorEvent.payload;
        //@ts-ignore
        if (opt.getCurrentState().auth.authForm) {
          console.log('setForm error');
          opt.trigger('authForm', 'setFormError', {
            error: payload.message,
          });
        } else {
          //show error in notification
        }
      }
      const openSingInEvent = opt.catchStatus('openSingIn', args);
      if (openSingInEvent.isCatched) {
        opt.trigger('authForm', 'init', {
          fieldsOpts: [
            {
              sync: true,
              name: 'login',
              initialValue: 'password',
              validators: [],
            },
            {
              sync: true,
              name: 'password',
              initialValue: 'login',
              validators: [],
            },
          ],
          async onSubmit(fs) {
            console.log('onSubmit');
            console.log(fs);
            const response = await opt.hook('signInReq', 'init', 'done', {
              login: fs.fields['login'].value,
              password: fs.fields['password'].value,
            });
            if (!response.rejected) {
              console.log('SUUCEES');
              //LS.setPreference('session', response.data.signIn.session);
              opt.trigger('router', 'goBack', null);
            }
          },
        });
      }
    },
  },
});

export const authSlice = Slice<IAuthTriggers, IAuthState, _ITriggers, _IState>(
  'auth',
  {
    authController: authControllerBite,
    authForm: biteForms('authForm'),
    signInReq: biteAsync('signInReq', {
      pr: (opt, input) => signIn(input),
      errorCatcher: (opt, resp: any) => {
        console.log(resp);
        if (!resp) {
          opt.trigger('authController', 'throwHttpError', {
            type: 'signIn',
            message: 'FAILED_SIGN_IN',
          });

          return true;
        } else if (resp.signIn.errorCode) {
          opt.trigger('authController', 'throwHttpError', {
            type: 'signIn',
            message: mapError(resp.signIn.errorCode),
          });

          return true;
        }
      },
    }),
    authReq: biteAsync('authReq', {
      pr: (opt, input) => checkSession(input),
      errorCatcher: (opt, resp: any) => {
        if (!resp || !resp.checkSession) {
          console.log('FAILED AUTHENTICATE');
          opt.trigger('authController', 'throwHttpError', {
            type: 'signIn',
            message: 'FAILED_AUTH',
          });

          return true;
        }
      },
    }),
  },
  authInitialState
);
