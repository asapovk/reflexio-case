/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, useLayoutEffect } from 'react';
import { _IState, _ITriggers } from '../../_redux/types';
import '../styles/users-table.less';

export const UsersPageLoading = () => (
  <div className='users-page-loaded'>Users loading...</div>
);
