import React from 'react';
import styles from './styles.module.less';

export const List = (props) => (
  <div className={styles.root}>
    <div className={styles.list}>{props.children}</div>
  </div>
);
