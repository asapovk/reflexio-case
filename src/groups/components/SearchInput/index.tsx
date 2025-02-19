/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { Fragment, memo, useState } from 'react';
import { useTrigger } from '@reflexio/react-v1/lib/useTrigger';
import { useReflector } from '@reflexio/react-v1/lib/useReflector';
import { _IState, _ITriggers } from '../../../_redux/types';
import style from './search-styles.module.less';
import { Expand, Search } from 'lucide-react';

export const SearchInput = () => (
  <div className={style.root}>
    <div className={style.icon}>
      <Search />
    </div>
    <textarea />
    <div className={style.icon}>
      <Expand />
    </div>
  </div>
);
