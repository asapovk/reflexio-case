import { Stage, Opts } from '@reflexio/bite-staging-v1/lib/types';
import { _IState, _ITriggers } from '../../_redux/types';
import { mapGroupsToRow } from '../../_utils/groups/mapGroupsToRow';

export type OPTS = Opts<_ITriggers, _IState>;

export const groupsStages: { [key: string]: (p?: any) => Stage<OPTS> } = {
  CONNECT_GROUPS: (params?: Array<number>) => ({
    name: 'CONNECT_GROUPS',
    assemble: (opt) => {
      opt.trigger('eventManager', 'forward', {
        from: { groupsController: 'throwError' },
        to: { notification: 'show' },
        payload: { text: 'Ошибка загрузки' },
      });
    },
    disassemble: (opt) => {
      opt.trigger('eventManager', 'unbind', { groupsController: 'throwError' });
    },
  }),
  LOAD_GROUPS: (params?: Array<number>) => ({
    name: 'LOAD_GROUPS',
    validator: (opt) =>
      Boolean(opt.getCurrentState().groups.groupsComponent.groupsList.length),
    notValidHandler: async (opt) => {
      const res = await opt.hook(
        'groupsController',
        'init',
        'setIsReady',
        null,
        5000
      );
      const data = opt.getCurrentState().groups.loadGroups.data;
      opt.trigger('groupsController', 'setGroupsList', mapGroupsToRow(data));

      return Boolean(res);
    },
  }),
  PAGE_GROUPS: (params?: Array<number>) => ({
    name: 'PAGE_GROUPS',
    assemble: async (opt) => {
      opt.trigger('appController', 'setPage', {
        groups: true,
      });
    },
    disassemble: async (opt) => {
      opt.trigger('appController', 'setPage', {
        groups: false,
      });
    },
  }),
  DIALOG_CREATE_GROUP: (params?: Array<number>) => ({
    name: 'DIALOG_CREATE_GROUP',
    assemble: async (opt) => {
      opt.trigger('groupsController', 'openCreateGroupForm', null);
      opt.trigger('appController', 'setDialog', {
        createGroup: true,
      });
      opt.trigger('eventManager', 'forward', {
        from: { appController: 'closeDialog' },
        to: { router: 'goTo' },
        payload: '/groups',
      });
      opt.trigger('eventManager', 'forward', {
        from: { groupsController: 'closeGroupForm' },
        to: { router: 'goTo' },
        payload: '/groups',
      });
    },
    disassemble: (opt) => {
      opt.trigger('eventManager', 'unbind', {
        groupsController: 'closeGroupForm',
      });
      opt.trigger('eventManager', 'unbind', {
        appController: 'closeDialog',
      });
      opt.trigger('appController', 'closeDialog', null);
      opt.trigger('createGroupForm', 'dropForm', null);
    },
  }),
  DIALOG_EDIT_GROUP: (params?: Array<number>) => ({
    name: 'DIALOG_EDIT_GROUP',
    assemble: async (opt, { paramVals }) => {
      opt.trigger('eventManager', 'unbind', { groupsController: 'throwError' });
      opt.trigger('eventManager', 'forward', {
        from: { groupsController: 'throwError' },
        to: { createGroupForm: 'setFormError' },
        payload: { error: 'Ошибка' },
      });
      const groupId = Number(paramVals[params[0]]);
      opt.trigger('groupsController', 'openEditGroupForm', {
        groupId,
      });
      opt.trigger('appController', 'setDialog', {
        editGroup: true,
      });
      opt.trigger('eventManager', 'forward', {
        from: { appController: 'closeDialog' },
        to: { router: 'goTo' },
        payload: '/groups',
      });
      opt.trigger('eventManager', 'forward', {
        from: { groupsController: 'closeGroupForm' },
        to: { router: 'goTo' },
        payload: '/groups',
      });
    },
    disassemble: (opt) => {
      opt.trigger('eventManager', 'unbind', {
        groupsController: 'closeGroupForm',
      });
      opt.trigger('eventManager', 'unbind', { appController: 'closeDialog' });
      opt.trigger('appController', 'closeDialog', null);
      opt.trigger('createGroupForm', 'dropForm', null);
      //opt.trigger('groupsController', 'unselectCurrentGroup', null);
    },
  }),
  GROUP_SELECT_CURRENT_GROUP: (params?: Array<number>) => ({
    name: 'GROUP_SELECT_CURRENT_GROUP',
    //Проверка что группа с переданным в url id есть в списке
    validator: (opt, { paramVals }) => {
      const groupId = Number(paramVals[params[0]]);
      const currGroup = opt
        .getCurrentState()
        .groups.groupsComponent.groupsList.find((g) => g.groupId === groupId);

      return Boolean(currGroup);
    },
    /// Здесь не notValiedHandler поэтому сразу в случае ошибки показываем страницу pageNotFound
    onFail: (opt) => {
      //Нужно закрыть все страници и поставить pageNotFound;
      //При последующей навигации pageNotFound нужно убрать;
      opt.trigger('appController', 'setPage', {
        pageNotFound: true,
      });
    },
    //Если да, то делаем select указанной группы
    assemble: (opt, { paramVals }) => {
      const groupId = Number(paramVals[params[0]]);
      opt.trigger('groupsController', 'selectCurrentGroup', {
        groupId: groupId,
      });
      opt.trigger('appController', 'setRightColumn', true);
    },
    //удаляем из состояния current группу при покидании этого stage
    disassemble: (opt) => {
      opt.trigger('groupsController', 'unselectCurrentGroup', null);
      opt.trigger('appController', 'setRightColumn', false);
    },
  }),
  GROUP_RIGTH_COL_USERS: (params?: Array<number>) => ({
    name: 'GROUP_RIGTH_COL_USERS',
    assemble: async (opt, { paramVals }) => {
      opt.trigger('eventManager', 'forward', {
        from: { groupsRightColumn: 'loadUsers' },
        to: { loadUsers: 'init' },
      });
      opt.trigger('eventManager', 'forward', {
        from: { loadUsers: 'done' },
        to: { groupsRightColumn: 'setUsersLoadResponse' },
      });
      opt.trigger('groupsRightColumn', 'drop', null);
      opt.trigger('groupsRightColumn', 'init', null);
      opt.trigger('groupsRightColumn', 'startLoadUsers', null);
    },
    disassemble: async (opt, { paramVals }) => {
      opt.trigger('eventManager', 'unbind', { groupsRightColumn: 'loadUsers' });
      opt.trigger('eventManager', 'unbind', { loadUsers: 'done' });
      opt.trigger('groupsRightColumn', 'drop', null);
      //opt.trigger('groupsController', 'unselectCurrentGroup', null);
    },
  }),
  GROUP_RIGTH_COL_INVITES: (params?: Array<number>) => ({
    name: 'GROUP_RIGTH_COL_INVITES',
    assemble: async (opt, { paramVals }) => {
      opt.trigger('eventManager', 'forward', {
        from: { groupsRightColumn: 'loadUsers' },
        to: { loadUsers: 'init' },
      });
      opt.trigger('eventManager', 'forward', {
        from: { loadUsers: 'done' },
        to: { groupsRightColumn: 'setUsersLoadResponse' },
      });
      opt.trigger('groupsRightColumn', 'drop', null);
      opt.trigger('groupsRightColumn', 'init', null);
      opt.trigger('groupsRightColumn', 'startLoadUsers', null);
    },
    disassemble: async (opt, { paramVals }) => {
      opt.trigger('eventManager', 'unbind', { groupsRightColumn: 'loadUsers' });
      opt.trigger('eventManager', 'unbind', { loadUsers: 'done' });
      opt.trigger('groupsRightColumn', 'drop', null);
      //opt.trigger('groupsController', 'unselectCurrentGroup', null);
    },
  }),
};
