import { Bite, Slice } from '@reflexio/core-v1';
import { BiteStatusWrap } from '@reflexio/core-v1/lib/types';
import {
  IRouterTriggers,
  IRouterState,
} from '@reflexio/bite-routing-v1/lib/types';
import { IStagingTriggers } from '@reflexio/bite-staging-v1/lib/types';
import { _IState, _ITriggers } from '../_redux/types';
import { biteRouting } from '@reflexio/bite-routing-v1';
import { AppScript } from './scripts/App.script';

import { biteStaging } from '@reflexio/bite-staging-v1';
import { biteEventManager } from '@reflexio/bite-event-manager-v1';
import { IEventManagerTriggers } from '@reflexio/bite-event-manager-v1/lib/types';
import { IUsersTriggers } from '../users/users.slice';
import { NotificationScript } from './scripts/Notification.script';
import { INotificationConfig } from '../_interfaces/app/NotificationConfig.interface';
import { ERRORS } from '../_utils/app/mapErrors';
import { biteAtom } from '@reflexio/bite-atom-v1';
import { IAtomTriggersApi } from '@reflexio/bite-atom-v1/lib/types';

export type IAppState = {
  appController?: {
    isReady: boolean;
    rightColumn?: boolean;
    page: {
      loading?: boolean;
      error?: boolean;
      pageNotFound?: boolean;
      signIn?: boolean;
      users?: boolean;
      groups?: boolean;
      invites?: boolean;
    };
    dialog?: {
      createUser?: boolean;
      editUser?: boolean;
      createGroup?: boolean;
      editGroup?: boolean;
      createInvite?: boolean;
      deleteInvite?: boolean;
    };
    sideBar?: 'users' | 'groups' | 'off';
  };
  router?: IRouterState;
  notification?: {
    smartNotification?: {
      leaveForm?: boolean;
      returnToForm?: boolean;
    };
    isShown: boolean;
    color?: 'ERROR' | 'SUCCESS' | 'PRIMARY';
    text?: string;
  };
};

export type IAppTriggers = {
  appController: IAtomTriggersApi<
    IAppState['appController'],
    {
      throwError: { text: ERRORS; type: string };
      throwSuccess: { text: string };
      setState: Partial<IAppState>;
      setSideBar: 'users' | 'groups' | 'off';
      setPage: Partial<IAppState['appController']['page']>;
      setDialog: Partial<IAppState['appController']['dialog']>;
      setRightColumn: boolean;
      closeDialog: null;
    }
  >;
  notification: IAtomTriggersApi<
    IAppState['notification'],
    {
      init: { config?: INotificationConfig };
      show: {
        text: string;
        color?: 'ERROR' | 'SUCCESS' | 'PRIMARY';
        timeout?: number | 'permament';
      };
      clickYes: null;
      clickYesReturnToForm: null;
      showSmart: Partial<IAppState['notification']['smartNotification']>;
      setState: Partial<IAppState['notification']>;
      close: null;
      drop: null;
    }
  >;
  router: BiteStatusWrap<IRouterTriggers>;
  stager: BiteStatusWrap<IStagingTriggers<_ITriggers, _IState>>;
};

export const appControllerBite = biteAtom<
  IAppTriggers,
  IAppState,
  'appController',
  _ITriggers
>('appController', {
  init: (opt, args) => {
    console.log(opt.getCurrentState());
  },
  reducers: {
    setRightColumn(state, payload) {
      state.appController.rightColumn = payload;
    },
    setDialog(state, payload) {
      if (!state.appController.dialog) {
        state.appController.dialog = {};
      }
      Object.assign(state.appController.dialog, payload);
    },
    closeDialog(state, payload) {
      state.appController.dialog = null;
    },
    setPage(state, payload) {
      Object.assign(state.appController.page, payload);
    },
  },
  initialState: {
    isReady: false,
    page: {},
    rightColumn: false,
  },
  script: AppScript,
  watchScope: ['appController', 'router'],
});

export const appSlice = Slice<IAppTriggers, IAppState, _ITriggers, _IState>(
  'app',
  {
    appController: appControllerBite,
    notification: biteAtom('notification', {
      script: NotificationScript,
    }),
    router: biteRouting('router'),
    stager: biteStaging('stager'),
  },
  {
    appController: {
      isReady: false,
      sideBar: 'users',
      page: {},
    },
    router: {
      currentLocation: null,
      destination: null,
      isBlocked: false,
      prevLocation: null,
    },
  }
);
