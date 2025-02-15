/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { Fragment, memo, useState } from 'react';
import { useTrigger } from '@reflexio/react-v1/lib/useTrigger';
import { useReflector } from '@reflexio/react-v1/lib/useReflector';
import { _IState, _ITriggers } from '../../_redux/types';
import { Button } from '../../_ui/Button';
import { IGroupRow } from '../../_interfaces/groups/IGroupsRow.interface';
import classNames from 'classnames';
import { MoreVertical } from 'lucide-react';
import styles from '../styles/groups-page.module.less';
import { TableHeaderRow } from '../../_ui/Table2.0/TableHeader';
import { TableDataRow } from '../../_ui/Table2.0/TableRow';
import { Table } from '../../_ui/Table2.0/Table';
import { Filters } from '../../filters/components';

export const GroupsPage = () => {
  const trigger = useTrigger<_ITriggers>('GroupsPage');
  const appState = useReflector<_ITriggers, _IState, _IState>(
    (state) => state,
    ['groupsController', 'createGroupForm']
  );
  const list = appState.groups.groupsComponent.groupsList;
  const selectedIndex = appState.groups.groupsController.selectedGroupIndex;
  const currentGroup = appState.groups.groupsController.currentGroup;

  return (
    <div>
      <div className={styles.header}>
        <Button onClick={() => trigger('router', 'goTo', '/groups/create')}>
          Создать группу
        </Button>
        {currentGroup ? (
          <Button
            ml='20px'
            onClick={() =>
              trigger('router', 'goTo', `/groups/${currentGroup.groupId}/edit`)
            }
          >
            Редактировать группу
          </Button>
        ) : null}
      </div>
      <Filters />
      <Table>
        <TableHeaderRow
          columns={[
            { name: 'Column 1' },
            { name: 'Column 2' },
            { name: 'Column 3' },
            { name: 'Column Actions' },
          ]}
        />
        <tbody>
          {list.map((u, i) => (
            <TableDataRow
              isSelected={i === selectedIndex}
              onClick={() => trigger('router', 'goTo', `/groups/${u.groupId}`)}
              key={i}
              rowId={u.groupId}
              data={[
                {
                  name: 'groupId',
                  value: u.groupId,
                },
                {
                  name: 'name',
                  value: u.name,
                },
                {
                  name: 'dtCreate',
                  value: u.dtCreate,
                },
                {
                  name: 'actions',
                  value: <div></div>,
                },
              ]}
            />
          ))}
        </tbody>
      </Table>
    </div>
  );
};
