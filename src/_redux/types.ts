import { IAppState, IAppTriggers } from '../app/app.slice';
import { IEMTriggers } from '../app/event-manager.slice';
import { IAuthState, IAuthTriggers } from '../auth/auth.slice';
import { IGroupsState, IGroupsTriggers } from '../groups/groups.slice';
import { IInvitesState, IInvitesTriggers } from '../invites/invites.slice';
import { IUsersState, IUsersTriggers } from '../users/users.slice';

export interface _IState {
  app: IAppState;
  users: IUsersState;
  eventManager: null;
  groups: IGroupsState;
  invites: IInvitesState;
  auth: IAuthState;
}

export type _ITriggers = IAppTriggers &
  IUsersTriggers &
  IEMTriggers &
  IGroupsTriggers &
  IInvitesTriggers &
  IAuthTriggers;
