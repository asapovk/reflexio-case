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
import { QueryClientsArgs, QueryInvitesArgs } from '../_api/_gqlSchema';
//import request from '../../../core/__scripts-gql-service/request';
import { IInviteRow } from '../_interfaces/invites/IInvitesRow.interface';
import { mapInvitesToRow } from '../_utils/invites/mapInvitesToRow';
import { loadInvites } from '../_api/invites/loadInvites';

//import { biteStaging } from '../../../../packages/bite-staging-v1/lib/index';

export type IInvitesState = {
  loadInvites: AsyncState<QueryInvitesArgs['input'], ResQType<'invites'>>;
  createInviteForm?: IFormState;
  invitesComponent: IUsersComponent;
  invitesController?: {
    currentInvite?: IInviteRow;
    isReady: boolean;
  };
};

export type IUsersComponent = {
  invitesList: Array<IInviteRow>;
  invitesCount: 0;
};

export const invitesInitialState: IInvitesState = {
  loadInvites: asyncInitialState(),
  invitesComponent: {
    invitesList: [],
    invitesCount: 0,
  },
};

export type IInvitesTriggers = {
  invitesController: BiteStatusWrap<{
    init: null;
    setCurrentInvite: IInviteRow;
    setInvitesList: Array<IInviteRow>;
    setIsReady: boolean;
    openCreateInviteForm: null;
    openDeleteForm: { inviteId: number };
    closeInviteForm: null;
  }>;
  // usersComponent: BiteStatusWrap<{
  //   init: null;
  //   drop: null;
  //   usersList: Array<IUserRow>,
  //   usersCount: number
  // }>;
  loadInvites: BiteStatusWrap<
    AsyncTrigger<QueryInvitesArgs['input'], ResQType<'invites'>>
  >;
  createInviteForm: BiteStatusWrap<IFormBiteTriggers>;
};

//form1 => form 2 form 3 onFail => back

export const invitesSlice = Slice<
  IInvitesTriggers,
  IInvitesState,
  _ITriggers,
  _IState
>(
  'invites',
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
    invitesController: biteLightController('invitesController', {
      reducer: {
        setInvitesList(state: IInvitesState, payload) {
          state.invitesComponent.invitesList = payload;
        },
        openCreateInviteForm: null,
        setIsReady: null,
        init: null,
        closeInviteForm: null,
        openDeleteForm: null,
        setCurrentInvite(state: IInvitesState, payload) {
          if (state.invitesController) {
            state.invitesController.currentInvite = payload;
          }
        },
      },
      script: {
        watchScope: ['invitesController'],
        watch: async (opt, pld) => {
          const openCreateForm = opt.catchStatus('openCreateInviteForm', pld);
          if (openCreateForm.isCatched) {
            opt.trigger('createInviteForm', 'init', {
              fieldsOpts: [
                {
                  name: 'inviteName',
                  initialValue: 'link',
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
            'loadInvites',
            'init',
            'done',
            {
              limit: 10,
              offset: 0,
            },
            10000
          );
          if (res.data) {
            opts.setStatus('setInvitesList', mapInvitesToRow(res.data));
            opts.setStatus('setIsReady', true);
          }
        },
      },
    }),
    createInviteForm: biteForms('createInviteForm'),
    loadInvites: biteAsync('loadInvites', {
      pr: (opt, input) => loadInvites(), //opt.injected.loadUsers(),
      timeout: 9000,
      errorCatcher: (opt, err) => true,
    }),
  },
  invitesInitialState
);
