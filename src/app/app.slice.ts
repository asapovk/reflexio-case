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
  stager?: StagerContext;
  notification?: {
    isShown: boolean;
    color: 'GREEN' | 'RED' | 'PRIMARY';
    text: string;
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
      color?: 'GREEN' | 'RED' | 'PRIMARY';
      timeout?: number;
    };
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
    setState(state, payload) {
      state.notification = payload as any;
    },
    show: null,
    init(state, payload) {
      state.notification = {} as any;
    },
  },
  {
    initOn: 'init',
    instance: 'stable',
    watchScope: ['notification'],
    script: NotificationScript,
  }
);

export const appSlice = Slice<IAppTriggers, IAppState, _ITriggers, _IState>(
  'app',
  {
    appController: appControllerBite,
    notification: notificationBite,
    router: biteRouting('router'),
    stager: biteStaging('stager'),
    eventManager: biteEventManager('eventManager', {
      watchScope: [],
    }),
  },
  appInitialState
);
