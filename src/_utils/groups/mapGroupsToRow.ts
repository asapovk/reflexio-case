import { ResQType } from '../../_api/_reqTypes';
import { IGroupRow } from '../../_interfaces/groups/IGroupsRow.interface';

export const mapGroupsToRow = (data: ResQType<'groups'>): Array<IGroupRow> =>
  data.groups.map((c) => ({
    dtCreate: c.dtCreate,
    groupId: c.groupId,
    name: c.groupName,
  }));
