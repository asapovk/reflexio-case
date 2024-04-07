import { Stage, Opts } from '@reflexio/bite-staging-v1/lib/types';
import { _IState, _ITriggers } from '../../_redux/types';
import { mapUsersToRow } from '../../_utils/users/mapUsersToRow';

export type OPTS = Opts<_ITriggers, _IState>;

export const userProfileStages: { [key: string]: (p?: any) => Stage<OPTS> } = {
  LOAD_USERS: (params?: Array<number>) => ({
    name: 'LOAD_USERS',
    validator: (opt) =>
      Boolean(opt.getCurrentState().users.usersComponent.usersList.length),
    notValidHandler: async (opt) => {
      opt.trigger('appController', 'setPage', {
        users: true,
      });
      const res = await opt.hook(
        'usersController',
        'init',
        'setIsReady',
        null,
        5000
      );

      return Boolean(res);
    },
    disassemble: (opt) => {
      console.log('start dis');
    },
  }),
  PAGE_USERS: (params?: Array<number>) => ({
    name: 'PAGE_USERS',
    assemble: async (opt) => {
      const data = opt.getCurrentState().users.loadUsers.data;
      opt.trigger('usersController', 'setUsersList', mapUsersToRow(data));
      opt.trigger('appController', 'setPage', {
        users: true,
      });
    },
    disassemble: async (opt) => {
      opt.trigger('appController', 'setPage', {
        users: false,
      });
    },
  }),
  DIALOG_EDIT_USER: (params?: Array<number>) => ({
    name: 'DIALOG_EDIT_USER',
    assemble: async (opt, { paramVals }) => {
      const userId = Number(paramVals[params[0]]);
      opt.trigger('appController', 'setDialog', {
        editUser: true,
      });
      opt.trigger('eventManager', 'forward', {
        from: { appController: 'closeDialog' },
        to: { router: 'goTo' },
        payload: '/users',
      });
    },
    disassemble: (opt) => {
      opt.trigger('eventManager', 'unbind', { appController: 'closeDialog' });
      opt.trigger('appController', 'closeDialog', null);
    },
  }),
  DIALOG_CREATE_USER: (params?: Array<number>) => ({
    name: 'DIALOG_CREATE_USER',
    assemble: async (opt) => {
      opt.trigger('usersController', 'openCreateUserForm', null);
      opt.trigger('appController', 'setDialog', {
        createUser: true,
      });
      opt.trigger('eventManager', 'forward', {
        from: { appController: 'closeDialog' },
        to: { router: 'goTo' },
        payload: '/users',
      });
    },
    disassemble: (opt) => {
      opt.trigger('eventManager', 'unbind', { appController: 'closeDialog' });
      opt.trigger('appController', 'closeDialog', null);
      opt.trigger('createUserForm', 'dropForm', null);
    },
  }),
};
