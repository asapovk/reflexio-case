/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { Fragment, memo } from 'react';
import { useTrigger } from '@reflexio/react-v1/lib/useTrigger';
import { useReflector } from '@reflexio/react-v1/lib/useReflector';
import { _IState, _ITriggers } from '../../_redux/types';
import '../styles/groups-page.less';
import { Button } from '../../_ui/Button';
import { IGroupRow } from '../../_interfaces/groups/IGroupsRow.interface';
import classNames from 'classnames';

export const GroupsTableHeader = () => (
  <div className='table-header'>
    <div className='table-column'>Group ID</div>
    <div className='table-column'>Group Name</div>
    <div className='table-column'>Date create</div>
  </div>
);
export const GroupsTableRow = (props: {
  group: IGroupRow;
  onClick: () => void;
  isSelected: boolean;
}) => (
  <div
    onClick={() => props.onClick()}
    className={classNames('table-row', { selected: props.isSelected })}
  >
    <div className='table-column'>{props.group.groupId}</div>
    <div className='table-column'>{props.group.name}</div>
    <div className='table-column'>{props.group.dtCreate}</div>
  </div>
);

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
      <div className='users-page-header'>
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
      <div className='users-table'>
        <GroupsTableHeader />
        {list.map((u, i) => (
          <GroupsTableRow
            isSelected={i === selectedIndex}
            onClick={() => trigger('router', 'goTo', `/groups/${u.groupId}`)}
            key={u.groupId}
            group={u}
          />
        ))}
      </div>
    </div>
  );
};
