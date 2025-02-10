import React from 'react';
import styles from './styles.module.less';
import classNames from 'classnames';

export const Table = (props) => (
  <div className={classNames(styles.groupsTableContainer, styles.tableBody)}>
    <table className={styles.table}>{props.children}</table>
  </div>
);
