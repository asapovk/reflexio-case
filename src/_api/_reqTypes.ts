import {
  Query,
  Mutation,
  QuerySingleSerieArgs,
  MutationUpdateScriptArgs,
  QueryAuthenticateArgs,
  QueryChaptersArgs,
  MutationCreatePublicLinkArgs,
  QuerySignInArgs,
  MutationCreateWordstampArgs,
  MutationCreateInviteArgs,
  MutationDeleleInviteArgs,
  MutationCreateGroupArgs,
  MutationUpdateGroupArgs,
  MutationManageGroupUserArgs,
  MutationManageGroupMomentArgs,
  QueryClientsArgs,
  QueryInvitesArgs,
  QueryPublicLinksArgs,
} from './_gqlSchema';

export type ResQType<Name extends keyof Query> = Record<Name, Query[Name]>;
export type ResMType<Name extends keyof Mutation> = Record<
  Name,
  Mutation[Name]
>;

export interface Queries {
  loadClients: {
    params: QueryClientsArgs['input'];
    respose: ResQType<'clients'>;
  };
  loadInvites: {
    params: QueryInvitesArgs['input'];
    respose: ResQType<'invites'>;
  };
  loadGroups: {
    params: null;
    respose: ResQType<'groups'>;
  };
  loadPublicLinks: {
    params: QueryPublicLinksArgs['input'];
    respose: ResQType<'publicLinks'>;
  };
  chapters: {
    params: QueryChaptersArgs['input'];
    response: ResQType<'chapters'>;
  };
  checkSession: {
    params: null;
    response: ResQType<'checkSession'>;
  };
  loadSingleSerie: {
    params: QuerySingleSerieArgs['input'];
    response: ResQType<'singleSerie'>;
  };
  authenticate: {
    params: QueryAuthenticateArgs['input'];
    response: ResQType<'authenticate'>;
  };
  loadGroupedWordStamps: {
    params: never;
    response: ResQType<'loadGroupedWordStamps'>;
  };
  signIn: {
    params: QuerySignInArgs['input'];
    response: ResQType<'signIn'>;
  };
}

export interface Mutations {
  manageGroupLinks: {
    params: MutationManageGroupMomentArgs['input'];
    response: ResMType<'manageGroupMoment'>;
  };
  manageGroupUsers: {
    params: MutationManageGroupUserArgs['input'];
    response: ResMType<'manageGroupUser'>;
  };
  updateGroup: {
    params: MutationUpdateGroupArgs['input'];
    response: ResMType<'updateGroup'>;
  };
  createGroup: {
    params: MutationCreateGroupArgs['input'];
    response: ResMType<'createGroup'>;
  };
  deleteInvite: {
    params: MutationDeleleInviteArgs['input'];
    response: ResMType<'deleleInvite'>;
  };
  createInvite: {
    params: MutationCreateInviteArgs['input'];
    response: ResMType<'createInvite'>;
  };
  updateSerieScript: {
    params: MutationUpdateScriptArgs['input'];
    response: ResMType<'updateScript'>;
  };
  createPublicLink: {
    params: MutationCreatePublicLinkArgs['input'];
    response: ResMType<'createPublicLink'>;
  };
  createWordStamp: {
    params: MutationCreateWordstampArgs['input'];
    response: ResMType<'createWordstamp'>;
  };
}
