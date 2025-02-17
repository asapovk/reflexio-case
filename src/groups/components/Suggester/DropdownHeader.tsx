/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { Fragment, memo, useState } from 'react';
import { useTrigger } from '@reflexio/react-v1/lib/useTrigger';
import { useReflector } from '@reflexio/react-v1/lib/useReflector';
import { _IState, _ITriggers } from '../../../_redux/types';
import style from './styles.module.less';
export const DropdownHeader = () => (
  <div className={style.dropdownHeader}></div>
);
