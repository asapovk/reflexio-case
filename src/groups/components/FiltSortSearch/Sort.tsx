/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { Fragment, memo, useState } from 'react';
import { useTrigger } from '@reflexio/react-v1/lib/useTrigger';
import { useReflector } from '@reflexio/react-v1/lib/useReflector';
import { _IState, _ITriggers } from '../../../_redux/types';
import styles from './styles.module.less';
import { Suggester } from '../Suggester';

export const Sort = () => (
  <div className={styles.root}>
    <div className={styles.filtersLabel}>
      <div className={styles.filtersCount}>Сортировка по 10 полям</div>
      <button className={styles.resetFiltersButton}>Сбросить сортировку</button>
    </div>
    <Suggester />
  </div>
);
