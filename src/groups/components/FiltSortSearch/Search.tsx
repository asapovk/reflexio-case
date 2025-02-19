/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { Fragment, memo, useState } from 'react';
import { useTrigger } from '@reflexio/react-v1/lib/useTrigger';
import { useReflector } from '@reflexio/react-v1/lib/useReflector';
import { _IState, _ITriggers } from '../../../_redux/types';
import styles from './styles.module.less';
import { Suggester } from '../Suggester';
import { SearchInput } from '../SearchInput';

export const Search = () => (
  <div className={styles.searchRoot}>
    <div className={styles.filtersLabel}>
      <div className={styles.filtersCount}>Поиск</div>
      <button className={styles.resetFiltersButton}>Сбросить поиск</button>
    </div>
    <SearchInput />
  </div>
);
