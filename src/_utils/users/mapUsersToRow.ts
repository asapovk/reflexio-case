import { ResQType } from '../../_api/_reqTypes';
import { IUsersRow } from '../../_interfaces/users/IUsersRow.interface';

export const mapUsersToRow = (clients: ResQType<'clients'>): Array<IUsersRow> =>
  clients?.clients
    ? clients.clients.map((c) => ({
        email: c.email,
        group: c.group.groupName,
        plan: 'regular',
        groupId: c.group.groupId,
        userId: c.userId,
        name: c.username,
      }))
    : [];
