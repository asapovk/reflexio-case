import { Slice } from '@reflexio/core-v1';
import { type BiteStatusWrap } from '@reflexio/core-v1';
import { _IState, _ITriggers } from '../_redux/types';
import { biteEventManager } from '@reflexio/bite-event-manager-v1';
import { IEventManagerTriggers } from '@reflexio/bite-event-manager-v1/lib/types';
import { IUsersTriggers } from '../users/users.slice';
import { IAppTriggers } from './app.slice';
import { IGroupsTriggers } from '../groups/groups.slice';
import { IInvitesTriggers } from '../invites/invites.slice';

export type IEMTriggers = {
  eventManager: BiteStatusWrap<
    IEventManagerTriggers<
      IAppTriggers & IGroupsTriggers & IInvitesTriggers & IUsersTriggers,
      _IState
    >
  >;
};

const biteEventManagering = biteEventManager<
  IEMTriggers,
  null,
  'eventManager',
  _ITriggers
>('eventManager', {
  watchScope: [],
});

export const eventManagerSlice = Slice<IEMTriggers, null, _ITriggers, _IState>(
  'eventManager',
  {
    eventManager: biteEventManagering,
  },
  null
);
