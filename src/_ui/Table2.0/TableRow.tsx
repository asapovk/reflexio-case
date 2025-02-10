import classNames from 'classnames';
import React from 'react';
import styles from './styles.module.less';

interface RowCell {
  value: any;
  name: string;
  position?: number;
}

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
    className={classNames(
      styles.dataRow,
      isSelected ? styles.dataRowSelected : null
    )}
  >
    {data.map((c, i) => (
      <th
        key={`${rowId}_${c.name}`}
        className={data.length - 1 !== i ? styles.cell : styles.actionCell}
      >
        {c.value}
      </th>
    ))}
  </tr>
);
