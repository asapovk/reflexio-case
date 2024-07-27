/* eslint-disable max-len */
import { Bite, Slice } from '@reflexio/core-v1';
import { BiteStatusWrap } from '@reflexio/core-v1/lib/types';

import { _IState, _ITriggers } from '../_redux/types';
import { ResQType, ResMType } from '../_api/_reqTypes';
import { biteAsync, asyncInitialState } from '@reflexio/bite-async-v1'; //'../../../../packages/bite-async-v1/lib/index';
import { AsyncState, AsyncTrigger } from '@reflexio/bite-async-v1/lib/types'; //'../../../../packages/bite-async-v1/lib/types';
import { biteForms } from '@reflexio/bite-forms-v1';
import {
  IFormBiteTriggers,
  IFieldState,
  IFormState,
} from '@reflexio/bite-forms-v1/lib/types';
import { biteLightController } from '@reflexio/bite-light-controller-v1';
import { biteDerivatives } from '@reflexio/bite-derivatives-v1';
import { QueryClientsArgs } from '../_api/_gqlSchema';

import { IUsersRow } from '../_interfaces/users/IUsersRow.interface';
import { mapUsersToRow } from '../_utils/users/mapUsersToRow';
import { loadUsers } from '../_api/users/loadUsers';
import { ERRORS } from '../_utils/app/mapErrors';

//import { biteStaging } from '../../../../packages/bite-staging-v1/lib/index';

export type IUsersState = {
  loadUsers: AsyncState<QueryClientsArgs['input'], ResQType<'clients'>>;
  createUserForm?: IFormState;
  usersComponent: IUsersComponent;
  usersController?: {
    currentUser?: IUsersRow;
    isReady: boolean;
    error?: string;
  };
};

export type IUsersComponent = {
  usersList: Array<IUsersRow>;
  usersCount: 0;
};

export const usersInitialState: IUsersState = {
  loadUsers: asyncInitialState(),
  usersComponent: {
    usersList: [],
    usersCount: 0,
  },
};

export type IUsersTriggers = {
  usersController: BiteStatusWrap<{
    init: null;
    setCurrentUser: IUsersRow;
    setUsersList: Array<IUsersRow>;
    setIsReady: boolean;
    setError: string | null;
    throwError: { type: string; text: ERRORS };
    openCreateUserForm: null;
  }>;
  // usersComponent: BiteStatusWrap<{
  //   init: null;
  //   drop: null;
  //   usersList: Array<IUserRow>,
  //   usersCount: number
  // }>;
  loadUsers: BiteStatusWrap<
    AsyncTrigger<QueryClientsArgs['input'], ResQType<'clients'>>
  >;
  createUserForm: BiteStatusWrap<IFormBiteTriggers>;
};

//form1 => form 2 form 3 onFail => back

const loadUsersBite = biteAsync<
  IUsersTriggers,
  IUsersState,
  'loadUsers',
  _ITriggers
>('loadUsers', {
  pr: (opt, input) => loadUsers(input),
  timeout: 9000,
  errorCatcher: (opt, res: any) => {
    if (!res.clients) {
      opt.trigger('usersController', 'throwError', {
        type: 'http',
        text: 'LOAD_USERS_FAIL',
      });

      return true;
    }

    return false;
  },
});

const usersControllerBite = biteLightController<
  IUsersTriggers,
  IUsersState,
  'usersController',
  _ITriggers
>('usersController', {
  reducer: {
    throwError: null,
    setError(state: IUsersState, payload) {
      state.usersController.error = payload;
    },
    setUsersList(state: IUsersState, payload) {
      state.usersComponent.usersList = payload;
    },
    openCreateUserForm: null,
    setIsReady(state: IUsersState, payload) {
      state.usersController.isReady = true;
    },
    init(state: IUsersState, payload) {
      state.usersController = {
        isReady: false,
      };
    },
    setCurrentUser(state: IUsersState, payload) {
      state.usersController.currentUser = payload;
    },
  },
  script: {
    watchScope: ['usersController'],
    watch: async (opt, pld) => {
      const openCreateForm = opt.catchStatus('openCreateUserForm', pld);
      if (openCreateForm.isCatched) {
        opt.trigger('createUserForm', 'init', {
          fieldsOpts: [
            {
              name: 'username',
              initialValue: 'Ivan',
              validators: [],
              sync: true,
            },
          ],
          onSubmit(fst, ut) {
            console.log('submit');
            //opt.trigger('')
          },
        });
      }
    },
    init: async (opts, pld) => {
      const res = await opts.hook(
        'loadUsers',
        'init',
        'done',
        {
          limit: 10,
          offset: 0,
        },
        10000
      );
      if (res.data) {
        opts.setStatus('setUsersList', mapUsersToRow(res.data));
        opts.setStatus('setIsReady', true);
      }
    },
  },
});

const createUserForm = biteForms<
  IUsersTriggers,
  IUsersState,
  'createUserForm',
  _ITriggers
>('createUserForm');

export const usersSlice = Slice<
  IUsersTriggers,
  IUsersState,
  _ITriggers,
  _IState
>(
  'users',
  {
    // usersComponent: biteDerivatives('usersComponent', {
    //   computers: {
    //     'usersList':  (state: _IState)=> state.users.loadUsers?.data || [],
    //     'usersCount': (state: _IState)=> state.users.usersComponent.usersList.length
    //   },
    //   watchScope: ['loadUsers'],
    //   // comparators: {
    //   //    'usersCount': (prev, next) => false,
    //   //    'usersList': (prev, next) => false,
    //   //  }
    // }),
    usersController: usersControllerBite,
    createUserForm: createUserForm,
    loadUsers: loadUsersBite,
  },
  usersInitialState
);
