export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
export type RequireFields<T, K extends keyof T> = {
  [X in Exclude<keyof T, K>]?: T[X];
} & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type Authenticate = {
  __typename?: 'Authenticate';
  data?: Maybe<PublicLinkData>;
  errorCode?: Maybe<Scalars['String']['output']>;
  isMaster?: Maybe<Scalars['Boolean']['output']>;
  session?: Maybe<Scalars['String']['output']>;
};

export type AuthenticateInput = {
  link: Scalars['String']['input'];
  login?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
};

export type Chapter = {
  __typename?: 'Chapter';
  audioUrl?: Maybe<Scalars['String']['output']>;
  chapterContent: Scalars['String']['output'];
  chapterId: Scalars['Int']['output'];
  isTop: Scalars['Boolean']['output'];
  serieId: Scalars['Int']['output'];
};

export type ChaptersInput = {
  chapterIds: Array<Scalars['Int']['input']>;
};

export type CheckSessionResult = {
  __typename?: 'CheckSessionResult';
  isAuth: Scalars['Boolean']['output'];
  isMaster?: Maybe<Scalars['Boolean']['output']>;
};

export type Client = {
  __typename?: 'Client';
  dtCreate: Scalars['String']['output'];
  dtExpire?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  group: Group;
  invite?: Maybe<Invite>;
  password?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  plan?: Maybe<Scalars['String']['output']>;
  tgId?: Maybe<Scalars['String']['output']>;
  tgUsername?: Maybe<Scalars['String']['output']>;
  userId: Scalars['Int']['output'];
  username: Scalars['String']['output'];
};

export type ClientsInput = {
  accessStatus?: InputMaybe<Scalars['String']['input']>;
  dtInvite?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  groupId?: InputMaybe<Scalars['Int']['input']>;
  inviteId?: InputMaybe<Scalars['Int']['input']>;
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
  username?: InputMaybe<Scalars['String']['input']>;
};

export type CreateGroupInput = {
  groupName: Scalars['String']['input'];
};

export type CreateInviteInput = {
  dtExpire?: InputMaybe<Scalars['String']['input']>;
  groupId: Scalars['Int']['input'];
  nameInvite: Scalars['String']['input'];
};

export type CreatePublicLink = {
  __typename?: 'CreatePublicLink';
  data?: Maybe<Scalars['Int']['output']>;
  errorCode?: Maybe<Scalars['String']['output']>;
};

export type CreatePublicLinkInput = {
  end?: InputMaybe<Scalars['String']['input']>;
  linkValue: Scalars['String']['input'];
  serieId: Scalars['Int']['input'];
  start?: InputMaybe<Scalars['String']['input']>;
};

export type CreateWordstampInput = {
  chapterId?: InputMaybe<Scalars['Int']['input']>;
  kana?: InputMaybe<Scalars['String']['input']>;
  serieId?: InputMaybe<Scalars['Int']['input']>;
  transcription?: InputMaybe<Scalars['String']['input']>;
  translation?: InputMaybe<Scalars['String']['input']>;
  writing: Scalars['String']['input'];
};

export type DeleteInviteInput = {
  inviteId: Scalars['Int']['input'];
};

export type Group = {
  __typename?: 'Group';
  dtCreate: Scalars['String']['output'];
  groupId: Scalars['Int']['output'];
  groupName: Scalars['String']['output'];
};

export type Invite = {
  __typename?: 'Invite';
  dtCreate?: Maybe<Scalars['String']['output']>;
  dtExpire?: Maybe<Scalars['String']['output']>;
  inviteId: Scalars['Int']['output'];
  name?: Maybe<Scalars['String']['output']>;
  plan: Scalars['String']['output'];
  status?: Maybe<Scalars['String']['output']>;
  token: Scalars['String']['output'];
  useCount: Scalars['Int']['output'];
};

export type InvitesInput = {
  groupId?: InputMaybe<Scalars['Int']['input']>;
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
  status?: InputMaybe<Scalars['String']['input']>;
};

export type ManageGroupMomentInput = {
  addMomentIds: Array<Scalars['Int']['input']>;
  deleteMomentIds: Array<Scalars['Int']['input']>;
  groupId: Scalars['Int']['input'];
};

export type ManageGroupUserInput = {
  addUserIds: Array<Scalars['Int']['input']>;
  deleteUserIds: Array<Scalars['Int']['input']>;
  groupId: Scalars['Int']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createGroup: Scalars['Int']['output'];
  createInvite: Invite;
  createPublicLink: CreatePublicLink;
  createWordstamp: Scalars['Int']['output'];
  deleleInvite: Scalars['Boolean']['output'];
  manageGroupMoment: Scalars['Boolean']['output'];
  manageGroupUser: Scalars['Boolean']['output'];
  saveQuizResult: Scalars['Int']['output'];
  updateGroup: Scalars['Boolean']['output'];
  updateScript: Scalars['Boolean']['output'];
  updateSerie: Scalars['Boolean']['output'];
  useGroupInviete: Scalars['Boolean']['output'];
};

export type MutationCreateGroupArgs = {
  input: CreateGroupInput;
};

export type MutationCreateInviteArgs = {
  input: CreateInviteInput;
};

export type MutationCreatePublicLinkArgs = {
  input: CreatePublicLinkInput;
};

export type MutationCreateWordstampArgs = {
  input: CreateWordstampInput;
};

export type MutationDeleleInviteArgs = {
  input?: InputMaybe<DeleteInviteInput>;
};

export type MutationManageGroupMomentArgs = {
  input: ManageGroupMomentInput;
};

export type MutationManageGroupUserArgs = {
  input: ManageGroupUserInput;
};

export type MutationSaveQuizResultArgs = {
  input: SaveQuizResultInput;
};

export type MutationUpdateGroupArgs = {
  input: UpdateGroupInput;
};

export type MutationUpdateScriptArgs = {
  input: UpdateScriptInput;
};

export type MutationUpdateSerieArgs = {
  input: UpdateSerieInput;
};

export type MutationUseGroupInvieteArgs = {
  input: UseGroupInviteInput;
};

export type PublicLink = {
  __typename?: 'PublicLink';
  dtCreate: Scalars['String']['output'];
  group?: Maybe<Group>;
  isAuthRequired: Scalars['Boolean']['output'];
  linkId: Scalars['Int']['output'];
  linkValue: Scalars['String']['output'];
};

export type PublicLinkData = {
  __typename?: 'PublicLinkData';
  end?: Maybe<Scalars['String']['output']>;
  linkValue?: Maybe<Scalars['String']['output']>;
  serieId?: Maybe<Scalars['Int']['output']>;
  start?: Maybe<Scalars['String']['output']>;
};

export type PublicLinksInput = {
  groupId?: InputMaybe<Scalars['Int']['input']>;
};

export type Query = {
  __typename?: 'Query';
  authenticate: Authenticate;
  chapters: Array<Chapter>;
  checkSession: CheckSessionResult;
  clients: Array<Client>;
  groups: Array<Group>;
  invites: Array<Invite>;
  loadGroupedWordStamps: Array<WordStampsGroup>;
  publicLinks: Array<PublicLink>;
  signIn: SignInResult;
  singleSerie: Array<Serie>;
};

export type QueryAuthenticateArgs = {
  input: AuthenticateInput;
};

export type QueryChaptersArgs = {
  input: ChaptersInput;
};

export type QueryClientsArgs = {
  input: ClientsInput;
};

export type QueryInvitesArgs = {
  input: InvitesInput;
};

export type QueryPublicLinksArgs = {
  input: PublicLinksInput;
};

export type QuerySignInArgs = {
  input: SignInInput;
};

export type QuerySingleSerieArgs = {
  input: SingleSerieInput;
};

export type SaveQuizResultInput = {
  value: Scalars['String']['input'];
};

export type Serie = {
  __typename?: 'Serie';
  description?: Maybe<Scalars['String']['output']>;
  imageUrl?: Maybe<Scalars['String']['output']>;
  isLiked?: Maybe<Scalars['Boolean']['output']>;
  isScriptVerified: Scalars['Boolean']['output'];
  likes: Scalars['Int']['output'];
  movieId: Scalars['Int']['output'];
  ruScript?: Maybe<Scalars['String']['output']>;
  script?: Maybe<Scalars['String']['output']>;
  scriptId?: Maybe<Scalars['Int']['output']>;
  serieId: Scalars['Int']['output'];
  title: Scalars['String']['output'];
  videoUrl?: Maybe<Scalars['String']['output']>;
  views: Scalars['Int']['output'];
};

export type SignInInput = {
  login: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type SignInResult = {
  __typename?: 'SignInResult';
  errorCode?: Maybe<Scalars['String']['output']>;
  session?: Maybe<Scalars['String']['output']>;
};

export type SingleSerieInput = {
  serieId: Scalars['Int']['input'];
};

export type UpdateGroupInput = {
  groupId: Scalars['Int']['input'];
  groupName?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UpdateScriptInput = {
  body: Scalars['String']['input'];
  serieId: Scalars['Int']['input'];
};

export type UpdateSerieInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  script?: InputMaybe<Scalars['String']['input']>;
  scriptId?: InputMaybe<Scalars['Int']['input']>;
  serieId: Scalars['Int']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['String']['input'];
  videoUrl?: InputMaybe<Scalars['String']['input']>;
};

export type UseGroupInviteInput = {
  email: Scalars['String']['input'];
  inviteToken: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type WordStamp = {
  __typename?: 'WordStamp';
  chapterId: Scalars['Int']['output'];
  kana: Scalars['String']['output'];
  levelOfKnowledge: Scalars['Int']['output'];
  numberOfTests: Scalars['Int']['output'];
  transcription: Scalars['String']['output'];
  translation: Scalars['String']['output'];
  wordStampId: Scalars['Int']['output'];
  writing: Scalars['String']['output'];
};

export type WordStampsGroup = {
  __typename?: 'WordStampsGroup';
  moviedId: Scalars['Int']['output'];
  serieId: Scalars['Int']['output'];
  title: Scalars['String']['output'];
  wordStamps: Array<WordStamp>;
};
