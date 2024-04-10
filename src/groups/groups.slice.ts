/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/ban-ts-comment */
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
  IFormState,
} from '@reflexio/bite-forms-v1/lib/types';
import {
  MutationCreateGroupArgs,
  MutationUpdateGroupArgs,
  QueryClientsArgs,
  QueryInvitesArgs,
} from '../_api/_gqlSchema';
import { GroupsRightColumnScript } from './scripts/GroupsRightColumn.script';
import { IUsersRow } from '../_interfaces/users/IUsersRow.interface';
import { IInviteRow } from '../_interfaces/invites/IInvitesRow.interface';
import { IGroupRow } from '../_interfaces/groups/IGroupsRow.interface';
import { GroupsControllerScript } from './scripts/GroupsController.script';
import { loadGroups } from '../_api/groups/loadGroups';
import { createGroup } from '../_api/groups/createGroup';
import { updateGroup } from '../_api/groups/updateGroup';
import { ERRORS } from '../_utils/app/mapErrors';
import { GroupsFormsManagerScript } from './scripts/GroupsFormsManager.script';

export type IGroupsState = {
  loadGroups: AsyncState<null, ResQType<'groups'>>;
  createGroup: AsyncState<
    MutationCreateGroupArgs['input'],
    ResMType<'createGroup'>
  >;
  updateGroup: AsyncState<
    MutationUpdateGroupArgs['input'],
    ResMType<'updateGroup'>
  >;
  createGroupForm?: IFormState;
  groupsComponent: IGroupsComponent;
  groupsController: {
    currentGroup?: IGroupRow;
    selectedGroupIndex?: number;
    isReady?: boolean;
    error?: string;
    successMessage?: string;
  };
  groupsFormsManager?: {
    formsList: Array<{
      formId: number;
      value: string;
      type: 'edit' | 'create';
    }>;
  };
  groupsRightColumn: {
    usersList: Array<IUsersRow>;
    invitesList: Array<IInviteRow>;
    menu: 'users' | 'invites';
    isLoading: boolean;
    error?: string;
  };
};

export type IGroupsComponent = {
  groupsList: Array<IGroupRow>;
  groupsCount: 0;
};

export const groupsInitialState: IGroupsState = {
  loadGroups: asyncInitialState(),
  createGroup: asyncInitialState(),
  updateGroup: asyncInitialState(),
  groupsRightColumn: {
    usersList: [],
    invitesList: [],
    menu: 'users',
    isLoading: false,
  },
  groupsController: {},
  groupsComponent: {
    groupsCount: 0,
    groupsList: [],
  },
};

export type IGroupsTriggers = {
  groupsFormsManager: BiteStatusWrap<{
    init: null;
    drop: null;
    openForm: { formId: number };
    openNewForm: { type: 'edit' | 'create'; initialData?: string };
    releaseLockedForm: null;
    lockCurrentForm: null;
    pinLockedForm: null;
    openPinnedForm: null;
    setFormsList: IGroupsState['groupsFormsManager'];
    dropForm: { formId: number };
    updateCurrentForm: { data: any };
    dropCurrentForm: null;
  }>;
  groupsController: BiteStatusWrap<{
    init: null;
    blockCurrentPage: null;
    selectCurrentGroup: { groupId: number };
    setCurrentGroup: IGroupRow;
    unselectCurrentGroupIndex: null;
    unselectCurrentGroup: null;
    setSelectedCurrentGroupIndex: { index: number };
    setGroupsList: Array<IGroupRow>;
    setIsReady: boolean;
    setError: string | null;
    setSuccessMessage: string | null;
    throwSuccess: { text: string };
    throwError: { text: ERRORS; type: string };
    openCreateGroupForm: null;
    submitCreateGroupForm: IFormState;
    openEditGroupForm: { groupId: number };
    submitEditGroupForm: IFormState;
    closeGroupForm: null;
  }>;
  groupsRightColumn: BiteStatusWrap<{
    init: null;
    drop: null;
    switchMenu: 'users' | 'invites';
    startLoadUsers: null;
    startLoadInvites: null;
    loadUsers: QueryClientsArgs['input'];
    loadInvites: QueryInvitesArgs['input'];
    setInvitesLoadResponse: { data?: ResQType<'invites'>; rejected: boolean };
    setUsersLoadResponse: { data?: ResQType<'clients'>; rejected: boolean };
    setUsersList: Array<IUsersRow>;
    setInvitesList: Array<IInviteRow>;
    setError: string;
    setLoading: boolean;
  }>;
  loadGroups: BiteStatusWrap<AsyncTrigger<null, ResQType<'groups'>>>;
  createGroup: BiteStatusWrap<
    AsyncTrigger<MutationCreateGroupArgs['input'], ResMType<'createGroup'>>
  >;
  updateGroup: BiteStatusWrap<
    AsyncTrigger<MutationUpdateGroupArgs['input'], ResMType<'updateGroup'>>
  >;
  createGroupForm: BiteStatusWrap<IFormBiteTriggers>;
};

const initialClone = JSON.parse(
  JSON.stringify(groupsInitialState)
) as IGroupsState;
const groupsRightColumnBite = Bite<
  IGroupsTriggers,
  IGroupsState,
  'groupsRightColumn',
  _ITriggers
>(
  {
    init(state, payload) {
      state.groupsRightColumn = initialClone.groupsRightColumn;
    },
    drop(state, payload) {
      state.groupsRightColumn = groupsInitialState.groupsRightColumn;
    },
    setUsersList: (state: IGroupsState, pld) => {
      state.groupsRightColumn.usersList = pld;
    },
    startLoadUsers: null,
    startLoadInvites: null,
    setUsersLoadResponse: null,
    setInvitesLoadResponse: null,
    setInvitesList: null,
    switchMenu: null,
    setError: null,
    setLoading(state, payload) {
      state.groupsRightColumn.isLoading = payload;
    },
    loadInvites: null,
    loadUsers: null,
  },
  {
    initOn: 'init',
    instance: 'stable',
    watchScope: ['groupsRightColumn'],
    script: GroupsRightColumnScript,
  }
);

const biteGroupsFormsManager = Bite<
  IGroupsTriggers,
  IGroupsState,
  'groupsFormsManager',
  _ITriggers
>(
  {
    init(state, pld) {
      state.groupsFormsManager = {
        formsList: [],
      };
    },
    drop(state, payload) {
      state.groupsFormsManager = null;
    },
    releaseLockedForm: null,
    lockCurrentForm: null,
    pinLockedForm: null,
    openPinnedForm: null,
    dropForm: null,
    openForm: null,
    openNewForm: null,
    updateCurrentForm: null,
    dropCurrentForm: null,
    setFormsList(state, payload) {
      state.groupsFormsManager = payload;
    },
  },
  {
    initOn: 'init',
    watchScope: ['groupsFormsManager'],
    script: GroupsFormsManagerScript,
    instance: 'stable',
  }
);

const biteGroupsController = Bite<
  IGroupsTriggers,
  IGroupsState,
  'groupsController',
  _ITriggers
>(
  {
    selectCurrentGroup: null,
    blockCurrentPage: null,
    setGroupsList(state: IGroupsState, payload) {
      state.groupsComponent.groupsList = payload;
    },
    throwSuccess: null,
    throwError: null,
    setError(state, payload) {
      state.groupsController.error = payload;
    },
    setSuccessMessage(state, payload) {
      state.groupsController.successMessage = payload;
    },
    openCreateGroupForm: null,
    submitCreateGroupForm: null,
    openEditGroupForm: null,
    submitEditGroupForm: null,
    closeGroupForm: null,
    setIsReady: null,
    init: null,
    unselectCurrentGroupIndex(state, payload) {
      state.groupsController.selectedGroupIndex = null;
    },
    setSelectedCurrentGroupIndex(state, payload) {
      state.groupsController.selectedGroupIndex = payload.index;
    },
    setCurrentGroup(state: IGroupsState, payload) {
      state.groupsController.currentGroup = payload;
    },
    unselectCurrentGroup(state: IGroupsState, payload) {
      state.groupsController.currentGroup = null;
    },
  },
  {
    initOn: 'init',
    watchScope: ['groupsController'],
    script: GroupsControllerScript,
    instance: 'stable',
  }
);

export const groupsSlice = Slice<
  IGroupsTriggers,
  IGroupsState,
  _ITriggers,
  _IState
>(
  'groups',
  {
    groupsRightColumn: groupsRightColumnBite,
    groupsController: biteGroupsController,
    createGroupForm: biteForms('createGroupForm'),
    groupsFormsManager: biteGroupsFormsManager,
    loadGroups: biteAsync('loadGroups', {
      pr: (opt, input) => loadGroups(input), //opt.injected.loadUsers(),
      timeout: 9000,
      errorCatcher: (opt, res: any) => {
        if (!res?.groups) {
          opt.trigger('groupsController', 'throwError', {
            type: 'http',
            text: 'LOAD_GROUPS_FAIL',
          });

          return true;
        }

        return false;
      },
    }),
    createGroup: biteAsync('createGroup', {
      pr: (opt, input) => createGroup(input), //opt.injected.loadUsers(),
      timeout: 9000,
      errorCatcher: (opt, resp: any) => {
        if (!resp?.createGroup) {
          opt.trigger('groupsController', 'throwError', {
            type: 'http',
            text: 'GROUP_CREATE_FAIL',
          });

          return true;
        }

        return false;
      },
    }),
    updateGroup: biteAsync('updateGroup', {
      pr: (opt, input) => updateGroup(input), //opt.injected.loadUsers(),
      timeout: 9000,
      errorCatcher: (opt, resp: any) => {
        if (!resp?.updateGroups) {
          // opt.trigger('groupsController', 'throwError', {
          //   type: 'http',
          //   text: 'GROUP_UPDATE_FAIL',
          // });

          return true;
        }

        return false;
      },
    }),
  },
  JSON.parse(JSON.stringify(groupsInitialState))
);
