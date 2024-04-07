import './styles.less';
import {
  ISize,
  IMargin,
  IPadding,
  IButtonColor,
  ITextColor,
  IBlockColor,
} from '../theme/types';
import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { mToStyle, pToStyle, sizeToButtonClass } from '../theme/utils';

interface ISmoothAppearance {
  type: 'opacity' | 'width' | 'height';
  duration?: string;
  at?: 'start' | 'center' | 'end';
}

interface IBlock extends IMargin, IPadding {
  onClick?: () => void;
  position?: 'relative | absolute | fixed | sticky';
  w?: string;
  h?: string;
  t?: string;
  b?: string;
  r?: string;
  l?: string;
  backgoundColor?: IBlockColor;
  style?: React.CSSProperties;
  children?: any;
  border?: boolean; //'none | left | right | top | bottom';
  decoration?: 'none | rounder | shadow | shadow-rounded';
  hoverable?: boolean;
  smoothAppearance?: ISmoothAppearance;
}

export const Block = (props: IBlock) => {
  const borderClass = !props.border ? 'oj-ui-block-noborder' : '';
  const hoverableClass = !props.hoverable ? 'oj-ui-block-nohover' : '';
  const classes = cn(
    `oj-ui-block-${props.backgoundColor || 'transparent'}`,
    borderClass,
    hoverableClass,
    props.backgoundColor
  );

  const [opacity, setOpacity] = useState<number>(0);

  let isZeroOpacity: boolean = false;

  if (props.smoothAppearance) {
    if (props.smoothAppearance.type === 'opacity') {
      isZeroOpacity = true;
    }
  }

  useEffect(() => {
    if (props.smoothAppearance) {
      setOpacity(1);
    }
  }, []);

  return (
    <div
      onClick={props.onClick}
      style={{
        ...props.style,
        ...mToStyle(props),
        ...pToStyle(props),
        opacity: isZeroOpacity ? opacity : 1,
        transition: isZeroOpacity
          ? `all ${props.smoothAppearance.duration}`
          : undefined,
      }}
      className={classes}
    >
      {props.children}
    </div>
  );
};
