import { Bite, Slice } from '@reflexio/core-v1';
import { type BiteStatusWrap } from '@reflexio/core-v1/lib/types';
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

export interface StagerContext {
  data: any;
}

export type IAppState = {
  appController: {
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
  router: IRouterState;
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

export const appInitialState: IAppState = {
  router: {
    currentLocation: null,
    destination: null,
    isBlocked: false,
    prevLocation: null,
  },
  appController: {
    isReady: false,
    page: {},
    rightColumn: false,
  },
};

export type IAppTriggers = {
  appController: BiteStatusWrap<{
    init: null;
    throwError: { text: ERRORS; type: string };
    throwSuccess: { text: string };
    setState: Partial<IAppState>;
    setSideBar: 'users' | 'groups' | 'off';
    setPage: Partial<IAppState['appController']['page']>;
    setDialog: Partial<IAppState['appController']['dialog']>;
    setRightColumn: boolean;
    closeDialog: null;
  }>;
  notification: BiteStatusWrap<{
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
  }>;
  router: BiteStatusWrap<IRouterTriggers>;
  stager: BiteStatusWrap<IStagingTriggers<_ITriggers, _IState>>;
  eventManager: BiteStatusWrap<IEventManagerTriggers<IUsersTriggers, _IState>>;
};

export const appControllerBite = Bite<
  IAppTriggers,
  IAppState,
  'appController',
  _ITriggers
>(
  {
    init: null,
    throwError: null,
    throwSuccess: null,
    setState(state, payload) {
      Object.assign(state.appController, payload);
    },
    setRightColumn(state, payload) {
      state.appController.rightColumn = payload;
    },
    setDialog(state, payload) {
      if (!state.appController.dialog) {
        state.appController.dialog = {};
      }
      Object.assign(state.appController.dialog, payload);
    },
    setSideBar: null,
    closeDialog(state, payload) {
      state.appController.dialog = null;
    },
    setPage(state, payload) {
      Object.assign(state.appController.page, payload);
    },
  },
  {
    script: AppScript,
    instance: 'stable',
    watchScope: ['appController', 'router'],
    initOn: 'init',
  }
);

export const notificationBite = Bite<
  IAppTriggers,
  IAppState,
  'notification',
  _ITriggers
>(
  {
    close: null,
    drop: null,
    showSmart: null,
    setState(state, payload) {
      state.notification = payload as any;
    },
    clickYes: null,
    clickYesReturnToForm: null,
    show: null,
    init(state, payload) {
      state.notification = {
        // isShown: true,
        // smartNotification: {
        //   leaveForm: true,
        // },
      } as any;
    },
  },
  {
    initOn: 'init',
    instance: 'stable',
    watchScope: ['notification'],
    script: NotificationScript,
  }
);

const biteRouter = biteRouting<IAppTriggers, IAppState, 'router', _ITriggers>(
  'router'
);

const biteStager = biteStaging<IAppTriggers, IAppState, 'stager', _ITriggers>(
  'stager'
);

const biteEventManagering = biteEventManager<
  IAppTriggers,
  IAppState,
  'eventManager',
  _ITriggers
>('eventManager', {
  watchScope: [],
});

export const appSlice = Slice<IAppTriggers, IAppState, _ITriggers, _IState>(
  'app',
  {
    appController: appControllerBite,
    notification: notificationBite,
    router: biteRouter,
    stager: biteStager,
    eventManager: biteEventManagering,
  },
  appInitialState
);
