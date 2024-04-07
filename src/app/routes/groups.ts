import { userProfileStages } from '../../users/stages/users.stage';
import { groupsStages } from '../../groups/stages/groups.stage';
import { invitesStages } from '../../invites/stages/invites.stage';
import { authStages } from '../../auth/stages/auth.stages';

export const groupsRoutes = [
  {
    route: '/groups',
    stages: [
      authStages.AUTH(),
      groupsStages.CONNECT_GROUPS(),
      groupsStages.LOAD_GROUPS(),
      groupsStages.PAGE_GROUPS(),
    ],
  },
  {
    route: '/groups/:paramVal',
    stages: [
      authStages.AUTH(),
      groupsStages.CONNECT_GROUPS(),
      groupsStages.LOAD_GROUPS(),
      groupsStages.PAGE_GROUPS(),
      groupsStages.GROUP_SELECT_CURRENT_GROUP([0]),
    ],
  },
  {
    route: '/groups/create',
    stages: [
      authStages.AUTH(),
      groupsStages.CONNECT_GROUPS(),
      groupsStages.LOAD_GROUPS(),
      groupsStages.PAGE_GROUPS(),
      groupsStages.DIALOG_CREATE_GROUP(),
    ],
  },
  {
    route: '/groups/:paramVal/edit',
    stages: [
      authStages.AUTH(),
      groupsStages.CONNECT_GROUPS(),
      groupsStages.LOAD_GROUPS(),
      groupsStages.PAGE_GROUPS(),
      groupsStages.GROUP_SELECT_CURRENT_GROUP([0]),
      groupsStages.DIALOG_EDIT_GROUP([0]),
    ],
  },
  {
    route: '/groups/:paramVal/users',
    stages: [
      authStages.AUTH(),
      groupsStages.CONNECT_GROUPS(),
      groupsStages.LOAD_GROUPS(),
      groupsStages.PAGE_GROUPS(),
      groupsStages.GROUP_SELECT_CURRENT_GROUP([0]),
      groupsStages.GROUP_RIGTH_COL_USERS(),
    ],
  },
  {
    route: '/groups/:paramVal/invites',
    stages: [
      authStages.AUTH(),
      groupsStages.CONNECT_GROUPS(),
      groupsStages.LOAD_GROUPS(),
      groupsStages.PAGE_GROUPS(),
      groupsStages.GROUP_SELECT_CURRENT_GROUP([0]),
      groupsStages.GROUP_RIGTH_COL_INVITES(),
    ],
  },
];
