/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { Fragment, memo, useState } from 'react';
import { useTrigger } from '@reflexio/react-v1/lib/useTrigger';
import { useReflector } from '@reflexio/react-v1/lib/useReflector';
import { _IState, _ITriggers } from '../../../_redux/types';
import styles from './styles.module.less';
import { Suggester } from '../Suggester';

export const Filter = () => (
  <div className={styles.root}>
    <div className={styles.filtersLabel}>
      <div className={styles.filtersCount}>Фильтров: 10</div>
      <button className={styles.resetFiltersButton}>Сбросить фильтры</button>
    </div>
    <Suggester />
  </div>
);
