/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { Fragment, memo, useState } from 'react';
import { useTrigger } from '@reflexio/react-v1/lib/useTrigger';
import { useReflector } from '@reflexio/react-v1/lib/useReflector';
import { _IState, _ITriggers } from '../../../_redux/types';
import style from './styles.module.less';
import { SuggesterItem as ISuggesterItem } from '.';
import { IconButton } from '../../../_ui/IconButton';
import { Trash } from 'lucide-react';

export const SuggesterItem = ({ item }: { item: ISuggesterItem }) => (
  <div className={style.suggesterItem}>
    <div className={style.filterName}>{item.filterName}</div>
    <div className={style.filterOperator}>{item.operator}</div>
    <div className={style.filterValue}>{item.filterValue.name}</div>
    <Trash />
  </div>
);
