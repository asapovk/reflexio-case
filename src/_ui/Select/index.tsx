import React from 'react';
import './styles.less';

export interface ISelect {
  onChange: (val) => void,
  value?: string;
  opts: Array<{
    text: string,
    value: any,
  }>
}


export const Select = (props: ISelect) => (
  <select value={props.value} onChange={(e) => props.onChange(e.target.value)} name='pets' id='pet-select' className='oj-ui-select'>
    {props.opts.map( (o, i) => <option key={i} value={o.value}>{o.text}</option>)}
  </select>
);
