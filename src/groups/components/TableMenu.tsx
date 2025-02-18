/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { Fragment, memo, useState } from 'react';
import { useTrigger } from '@reflexio/react-v1/lib/useTrigger';
import { useReflector } from '@reflexio/react-v1/lib/useReflector';
import { _IState, _ITriggers } from '../../_redux/types';
import { Button } from '../../_ui/Button';
import { IGroupRow } from '../../_interfaces/groups/IGroupsRow.interface';
import classNames from 'classnames';
import { MoreVertical, Filter, Plus, Edit } from 'lucide-react';
import styles from './table-menu-styles.module.less';
import { TableHeaderRow } from '../../_ui/Table2.0/TableHeader';
import { TableDataRow } from '../../_ui/Table2.0/TableRow';
import { Table } from '../../_ui/Table2.0/Table';
import { IconButton } from '../../_ui/IconButton';

export const TableMenu = () => {
  const trigger = useTrigger<_ITriggers>('GroupsPageTableMenu');
  const appState = useReflector<_ITriggers, _IState, _IState>(
    (state) => state,
    ['groupsController', 'createGroupForm']
  );
  const list = appState.groups.groupsComponent.groupsList;
  const selectedIndex = appState.groups.groupsController.selectedGroupIndex;
  const currentGroup = appState.groups.groupsController.currentGroup;

  return (
    <div>
      {currentGroup ? (
        <IconButton h='50px' w='50px' m={'10px'}>
          <Edit
            onClick={() =>
              trigger('router', 'goTo', `/groups/${currentGroup.groupId}/edit`)
            }
          />
        </IconButton>
      ) : null}
      <IconButton h='50px' w='50px' m={'10px'}>
        <Plus onClick={() => trigger('router', 'goTo', '/groups/create')} />
      </IconButton>
      <div className={styles.menuButtonContainer}>
        <IconButton h='50px' w='50px'>
          <Filter />
        </IconButton>
        <div className={styles.menuButtonContainerBadge}>13</div>
      </div>
    </div>
  );
};
