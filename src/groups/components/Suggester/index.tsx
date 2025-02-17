/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { Fragment, memo, useState } from 'react';
import { useTrigger } from '@reflexio/react-v1/lib/useTrigger';
import { useReflector } from '@reflexio/react-v1/lib/useReflector';
import { _IState, _ITriggers } from '../../../_redux/types';
import style from './styles.module.less';
import { SuggesterItem } from './SuggesterItem';
import { Dropdown } from './DropDown';

export interface SuggesterItem {
  filterName: string;
  operator: string;
  filterValue: {
    name: string;
    value: any;
  };
}

const suggesterItems: Array<SuggesterItem> = [
  {
    filterName: 'Label',
    operator: 'is',
    filterValue: {
      name: 'Artur',
      value: 1,
    },
  },
];

const dropdownItems = [
  { name: 'Vasya', value: 3 },
  { name: 'Dima', value: 4 },
  { name: 'Kolya', value: 5 },
];

export const Suggester = () => (
  <div className={style.root}>
    {suggesterItems.map((si, i) => (
      <SuggesterItem key={i} item={si} />
    ))}
    <div className={style.input}>
      <input />
      <Dropdown items={dropdownItems} />
    </div>
  </div>
);
