/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { Fragment, memo, useState } from 'react';
import { useTrigger } from '@reflexio/react-v1/lib/useTrigger';
import { useReflector } from '@reflexio/react-v1/lib/useReflector';
import { _IState, _ITriggers } from '../../../_redux/types';
import styles from './styles.module.less';
import { Suggester } from '../Suggester';
import { Filter } from './Filter';
import { Search } from './Search';
import { Sort } from './Sort';

export const FiltSortSearch = () => (
  <div>
    <Filter />
    <Sort />
  </div>
);
