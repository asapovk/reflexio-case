import { ResQType } from '../../_api/_reqTypes';
import { IInviteRow } from '../../_interfaces/invites/IInvitesRow.interface';

export const mapInvitesToRow = (data: ResQType<'invites'>): Array<IInviteRow> =>
  data?.invites
    ? data.invites.map((c) => ({
        dtCreate: c.dtCreate,
        groupId: 1,
        groupName: '',
        inviteId: c.inviteId,
        useCount: c.useCount,
        link: c.token,
      }))
    : [];
