import { userProfileStages } from '../users/stages/users.stage';
import { groupsStages } from '../groups/stages/groups.stage';
import { invitesStages } from '../invites/stages/invites.stage';
import { authStages } from '../auth/stages/auth.stages';

export const routes = [
  {
    route: '/users/:paramVal/edit',
    stages: [
      authStages.AUTH(),
      userProfileStages.LOAD_USERS(),
      userProfileStages.PAGE_USERS(),
      userProfileStages.DIALOG_EDIT_USER([0]),
    ],
  },
  {
    route: '/users/create',
    stages: [
      authStages.AUTH(),
      userProfileStages.LOAD_USERS(),
      userProfileStages.PAGE_USERS(),
      userProfileStages.DIALOG_CREATE_USER(),
    ],
  },
  {
    route: '/users',
    stages: [
      authStages.AUTH(),
      userProfileStages.LOAD_USERS(),
      userProfileStages.PAGE_USERS(),
    ],
  },
  {
    route: '/invites',
    stages: [
      authStages.AUTH(),
      invitesStages.LOAD_INVITES(),
      invitesStages.PAGE_INVITES(),
    ],
  },
  {
    route: '/invites/create',
    stages: [
      authStages.AUTH(),
      invitesStages.LOAD_INVITES(),
      invitesStages.PAGE_INVITES(),
      invitesStages.DIALOG_CREATE_INVITE(),
    ],
  },
  {
    route: '/sign_in',
    stages: [authStages.SIGN_IN_PAGE()],
  },
];
