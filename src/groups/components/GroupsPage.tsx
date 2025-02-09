/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { Fragment, memo, useState } from 'react';
import { useTrigger } from '@reflexio/react-v1/lib/useTrigger';
import { useReflector } from '@reflexio/react-v1/lib/useReflector';
import { _IState, _ITriggers } from '../../_redux/types';
import '../styles/groups-page.less';
import { Button } from '../../_ui/Button';
import { IGroupRow } from '../../_interfaces/groups/IGroupsRow.interface';
import classNames from 'classnames';
import { MoreVertical } from 'lucide-react';
import '../styles/groups-table.less';

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

interface RowCell {
  value: any;
  name: string;
  position?: number;
}
interface HeaderCell {
  name: string;
}

export const TableHeaderRow = ({ columns }: { columns: Array<HeaderCell> }) => (
  <tr className={'headerRow'}>
    {columns.map((c, i) => (
      <th
        key={`header_${c.name}`}
        className={columns.length - 1 !== i ? 'column' : 'actionColumn'}
      >
        {c.name}
      </th>
    ))}
  </tr>
);

export const TableDataRow = ({
  data,
  rowId,
  isSelected,
  onClick,
  onHover,
}: {
  data: Array<RowCell>;
  rowId: number | string;
  isSelected?: boolean;
  onClick?: (rowId: number) => void;
  onHover?: (rowId: number) => void;
}) => (
  <tr
    onClick={() => onClick(1)}
    key={rowId}
    className={classNames('dataRow', { dataRowSelected: isSelected })}
  >
    {data.map((c, i) => (
      <th
        key={`${rowId}_${c.name}`}
        className={data.length - 1 !== i ? 'cell' : 'actionCell'}
      >
        {c.value}
      </th>
    ))}
  </tr>
);

export const TableComponent = () => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const data = [
    { id: 1, col1: 'Row 1 Col 1', col2: 'Row 1 Col 2', col3: 'Row 1 Col 3' },
    { id: 2, col1: 'Row 2 Col 1', col2: 'Row 2 Col 2', col3: 'Row 2 Col 3' },
    { id: 3, col1: 'Row 3 Col 1', col2: 'Row 3 Col 2', col3: 'Row 3 Col 3' },
  ];

  return (
    <div className={'groupsTableContainer'}>
      <table className={'table'}>
        <thead>
          <tr className={'headerRow'}>
            <th className={'column'}>Column 1</th>
            <th className={'column'}>Column 2</th>
            <th className={'column'}>Column 3</th>
            <th className={'actionColumn'}>Actions</th>
          </tr>
        </thead>
        <tbody className='tableBody'>
          {data.map((row) => (
            <tr key={row.id} className={'dataRow'}>
              <td className={'cell'}>{row.col1}</td>
              <td className={'cell'}>{row.col2}</td>
              <td className={'cell'}>{row.col3}</td>
              <td className={'actionCell'}>
                <button
                  className={'menuButton'}
                  onClick={() =>
                    setOpenDropdown(openDropdown === row.id ? null : row.id)
                  }
                >
                  <MoreVertical size={20} />
                </button>
                {openDropdown === row.id && (
                  <div className={'dropdownMenu'}>
                    <button
                      onClick={() => alert('Edit clicked')}
                      className={'dropdownItem'}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => alert('Delete clicked')}
                      className={'dropdownItem'}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

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
      <div className={classNames('groupsTableContainer', 'tableBody')}>
        <table className={'table'}>
          <thead>
            <TableHeaderRow
              columns={[
                { name: 'Column 1' },
                { name: 'Column 2' },
                { name: 'Column 3' },
                { name: 'Column Actions' },
              ]}
            />
          </thead>
          <tbody>
            {list.map((u, i) => (
              <TableDataRow
                isSelected={i === selectedIndex}
                onClick={() =>
                  trigger('router', 'goTo', `/groups/${u.groupId}`)
                }
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
        </table>
      </div>
      {/* <TableComponent />
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
      </div> */}
    </div>
  );
};
