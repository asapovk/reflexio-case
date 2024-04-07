import { Stage, Opts } from '@reflexio/bite-staging-v1/lib/types';
import { _IState, _ITriggers } from '../../_redux/types';
import { mapInvitesToRow } from '../../_utils/invites/mapInvitesToRow';

export type OPTS = Opts<_ITriggers, _IState>;

export const invitesStages: { [key: string]: (p?: any) => Stage<OPTS> } = {
  LOAD_INVITES: (params?: Array<number>) => ({
    name: 'LOAD_INVITES',
    validator: (opt) =>
      Boolean(
        opt.getCurrentState().invites.invitesComponent.invitesList.length
      ),
    notValidHandler: async (opt) => {
      const res = await opt.hook(
        'invitesController',
        'init',
        'setIsReady',
        null,
        5000
      );

      return Boolean(res);
    },
  }),
  PAGE_INVITES: (params?: Array<number>) => ({
    name: 'PAGE_INVITES',
    assemble: async (opt) => {
      const data = opt.getCurrentState().invites.loadInvites.data;
      opt.trigger('invitesController', 'setInvitesList', mapInvitesToRow(data));
      opt.trigger('appController', 'setPage', {
        invites: true,
      });
    },
    disassemble: async (opt) => {
      opt.trigger('appController', 'setPage', {
        invites: false,
      });
    },
  }),
  DIALOG_CREATE_INVITE: (params?: Array<number>) => ({
    name: 'DIALOG_CREATE_INVITE',
    assemble: async (opt) => {
      opt.trigger('invitesController', 'openCreateInviteForm', null);
      opt.trigger('appController', 'setDialog', {
        createInvite: true,
      });
      opt.trigger('eventManager', 'forward', {
        from: { appController: 'closeDialog' },
        to: { router: 'goTo' },
        payload: '/invites',
      });
      opt.trigger('eventManager', 'forward', {
        from: { invitesController: 'closeInviteForm' },
        to: { router: 'goTo' },
        payload: '/invites',
      });
    },
    disassemble: (opt) => {
      opt.trigger('eventManager', 'unbind', {
        invitesController: 'closeInviteForm',
      });
      opt.trigger('eventManager', 'unbind', {
        appController: 'closeDialog',
      });
      opt.trigger('appController', 'closeDialog', null);
      opt.trigger('createInviteForm', 'dropForm', null);
    },
  }),
};
