import React from 'react';
import styles from './styles.module.less';

interface HeaderCell {
  name: string;
}

export const TableHeaderRow = ({ columns }: { columns: Array<HeaderCell> }) => (
  <thead>
    <tr className={styles.headerRow}>
      {columns.map((c, i) => (
        <th
          key={`header_${c.name}`}
          className={
            columns.length - 1 !== i ? styles.column : styles.actionColumn
          }
        >
          {c.name}
        </th>
      ))}
    </tr>
  </thead>
);
