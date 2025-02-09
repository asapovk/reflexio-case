import React from 'react';
import styles from './styles.module.less';

interface ListItemProps {
  rowId: number | string;
  value: any;
  rightValue?: any;
  justifyContent?: 'start' | 'end' | 'center';
  padding?: number;
  lineHeight?: number;
}

export const ListItem = (props: ListItemProps) => (
  <div className={styles.listItem}>
    <div>{props.value}</div>
    {props.rightValue ? <div>{props.rightValue}</div> : null}
  </div>
);
