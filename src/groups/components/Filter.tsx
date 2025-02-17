/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { Fragment, memo, useState } from 'react';
import { useTrigger } from '@reflexio/react-v1/lib/useTrigger';
import { useReflector } from '@reflexio/react-v1/lib/useReflector';
import { _IState, _ITriggers } from '../../_redux/types';
import { Button } from '../../_ui/Button';
import { IGroupRow } from '../../_interfaces/groups/IGroupsRow.interface';
import classNames from 'classnames';
import { MoreVertical, Filter, Plus, Edit, Trash } from 'lucide-react';

import { TableHeaderRow } from '../../_ui/Table2.0/TableHeader';
import { TableDataRow } from '../../_ui/Table2.0/TableRow';
import { Table } from '../../_ui/Table2.0/Table';
import { IconButton } from '../../_ui/IconButton';
import { Select } from '../../_ui/Select';
import { Switch } from '../../_ui/Switch';
import styles from '../styles/filters.module.less';

export const FilterRow = () => {
  const trigger = useTrigger<_ITriggers>('GroupsPageTableMenu');
  const appState = useReflector<_ITriggers, _IState, _IState>(
    (state) => state,
    ['groupsController', 'createGroupForm']
  );
  const list = appState.groups.groupsComponent.groupsList;
  const selectedIndex = appState.groups.groupsController.selectedGroupIndex;
  const currentGroup = appState.groups.groupsController.currentGroup;

  const selectOpts = [{ text: 'FilterValue_1', value: 'FilterValue_1' }];

  return (
    <div className={styles.formRow}>
      <div className={styles.leftGroup}>
        <div className={styles.formRowItem}>
          <Select onChange={(val) => console.log(val)} opts={selectOpts} />
        </div>
        <div className={styles.formRowItem}>
          <Select onChange={(val) => console.log(val)} opts={selectOpts} />
        </div>
        <div className={styles.formRowItem}>
          <Select onChange={(val) => console.log(val)} opts={selectOpts} />
        </div>
      </div>
      <div className={styles.rightGroup}>
        <div className={styles.filterSwitch}>
          <Switch value={true} />
        </div>
        <div className={styles.formRowItem}>
          <IconButton>
            <Trash />
          </IconButton>
        </div>
      </div>
    </div>
  );
};
