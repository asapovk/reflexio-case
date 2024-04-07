import {
  IMargin,
  IPadding,
  ISize,
  ITextColor,
  ITextMode,
} from '../theme/types';
import { sizeToHeaderClass, mToStyle, pToStyle } from '../theme/utils';
import cn from 'classnames';
import React from 'react';
import './styles.less';

export interface IText extends IMargin, IPadding {
  size?: ISize;
  style?: React.CSSProperties;
  color?: ITextColor;
  mode?: ITextMode;
  children?: any;
  onClick?: () => void;
}

export const Text = (props: IText) => {
  const headerSizeClass = props.size ? sizeToHeaderClass(props.size) : '';
  const className = cn(
    `oj-ui-text-${props.size || 'm'}`,
    `oj-ui-text-${props.color || 'on-background-plain'}`
  );

  return (
    <p
      onClick={props.onClick}
      style={{ ...props.style, ...mToStyle(props), ...pToStyle(props) }}
      className={className}
    >
      {props.children}
    </p>
  );
};
