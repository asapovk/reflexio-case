/* eslint-disable @typescript-eslint/no-empty-function */
import { Script } from '@reflexio/core-v1/lib/interfaces/IScript';
import { _IState, _ITriggers } from '../../_redux/types';
import { ScriptOptsType, WatchArgsType } from '@reflexio/core-v1/lib/types';
import { IUsersRow } from '../../_interfaces/users/IUsersRow.interface';
import { IInviteRow } from '../../_interfaces/invites/IInvitesRow.interface';
import { mapUsersToRow } from '../../_utils/users/mapUsersToRow';
import { mapInvitesToRow } from '../../_utils/invites/mapInvitesToRow';

export class GroupsRightColumnScript extends Script<
  _ITriggers,
  _IState,
  'groupsRightColumn',
  'init',
  null
> {
  opts: ScriptOptsType<_ITriggers, _IState, 'groupsRightColumn', null>;
  constructor(opts) {
    super();
    this.opts = opts;
  }
  private usersLoaded: Array<IUsersRow> = [];
  private invitesLoaded: Array<IInviteRow> = [];
  init(args: null): void {
    console.log('INIT');
  }

  watch(args: WatchArgsType<_ITriggers, 'groupsRightColumn'>): void {
    const dropEvent = this.opts.catchStatus('drop', args);
    if (dropEvent.isCatched) {
      this.opts.drop();
    }
    const startLoadUsersEvent = this.opts.catchStatus('startLoadUsers', args);
    if (startLoadUsersEvent.isCatched) {
      this.opts.setStatus('setLoading', true);
      const selectedGroupId =
        this.opts.getCurrentState().groups.groupsController?.currentGroup
          ?.groupId;
      this.opts.setStatus('loadUsers', {
        limit: 20,
        offset: 0,
        groupId: selectedGroupId,
      });
    }
    const loadUsersEvent = this.opts.catchStatus('setUsersLoadResponse', args);
    if (loadUsersEvent.isCatched) {
      this.opts.setStatus('setLoading', false);
      const pld = loadUsersEvent.payload;
      if (pld.data?.clients) {
        const newUsers = mapUsersToRow(pld.data);
        this.usersLoaded = [...this.usersLoaded, ...newUsers];
        this.opts.setStatus('setUsersList', this.usersLoaded);
      } else if (pld.rejected) {
        this.opts.setStatus('setError', 'Произошла ошибка');
      }
    }
    const loadInvitesEvent = this.opts.catchStatus(
      'setInvitesLoadResponse',
      args
    );
    if (loadInvitesEvent.isCatched) {
      const pld = loadInvitesEvent.payload;
      if (pld.data) {
        const newInvites = mapInvitesToRow(pld.data);
        this.invitesLoaded = [...this.invitesLoaded, ...newInvites];
        this.opts.setStatus('setInvitesList', this.invitesLoaded);
      } else if (pld.rejected) {
        this.opts.setStatus('setError', 'Произошла ошибка');
      }
    }
  }
}
