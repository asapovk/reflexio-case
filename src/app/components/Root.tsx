/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, useLayoutEffect } from 'react';
import { useTrigger } from '@reflexio/react-v1/lib/useTrigger';
import { useReflector } from '@reflexio/react-v1/lib/useReflector';
import { _IState, _ITriggers } from '../../_redux/types';
import { UsersPage } from '../../users/components/UsersPage';
import { Dialog } from './Dialog';
import { Sidebar } from './Sidebar';
import { GroupsPage } from '../../groups/components/GroupsPage';
import { RightColumn } from './RightColumn';
import { InvitesPage } from '../../invites/components/InvitesPage';
import { AuthPageLoading } from '../../auth/components/loadingPage';
import { AuthPage } from '../../auth/components';
import { Notification } from './notification/Notification';

import store from '../../_redux';
export const AppContainer = () => {
  const trigger = useTrigger<_ITriggers>('AppContainer');
  const appState = useReflector<_ITriggers, _IState, _IState>(
    (state) => state,
    ['appController']
  );

  useEffect(() => trigger('appController', 'init', null), []);

  const currentPage = appState.app.appController.page;
  const sideBar = appState.app.appController.sideBar;
  const isAuth = appState.auth.isAuth;
  const isRightCol = appState.app.appController.rightColumn;

  return (
    <div>
      {currentPage.loading ? <AuthPageLoading /> : null}
      {currentPage.pageNotFound ? <AuthPageLoading /> : null}
      {currentPage.signIn ? <AuthPage /> : null}
      {isAuth ? (
        <div>
          <Sidebar
            clickGroups={() => trigger('router', 'goTo', '/groups')}
            clickUsers={() => trigger('router', 'goTo', '/users')}
            clickInvites={() => trigger('router', 'goTo', '/invites')}
          />
          <div className='container'>
            <div className='page-container'>
              {currentPage.users ? <UsersPage /> : null}
              {currentPage.groups ? <GroupsPage /> : null}
              {currentPage.invites ? <InvitesPage /> : null}
            </div>
            {isRightCol ? <RightColumn /> : null}
          </div>
        </div>
      ) : null}
      <Dialog />
      <Notification />
    </div>
  );
};
