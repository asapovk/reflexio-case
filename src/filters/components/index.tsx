/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, useLayoutEffect } from 'react';
import { useTrigger } from '@reflexio/react-v1/lib/useTrigger';
import { useReflector } from '@reflexio/react-v1/lib/useReflector';
import { _IState, _ITriggers } from '../../_redux/types';
import { Button } from '../../_ui/Button';
import { TextInput } from '../../_ui/Input';
import { Select } from '../../_ui/Select';
import '../styles.less';
import { Trash } from '../../_ui/Svg/Trash';

export const Filters = () => {
  const trigger = useTrigger<_ITriggers>('FormPage');
  const appState = useReflector<_ITriggers, _IState, _IState>(
    (state) => state,
    ['dynamicForm', 'formPageController']
  );

  const fieldsObject = appState.formPage.dynamicForm.fields;
  const rows = appState.formPage.formRows;

  return (
    <div>
      <Button
        m='20px'
        onClick={() => trigger('formPageController', 'addFormRow', null)}
      >
        Добавить фильтр
      </Button>
      <div className='dynamic-form'>
        {rows.map((r, i) => (
          <div className='dynamic-form-row' key={r.name}>
            <div className='dynamic-form-row-item'>
              <Select
                opts={fieldsObject[`row_selector_${r.name}`].meta}
                value={fieldsObject[`row_selector_${r.name}`].value}
                onChange={(val) => {
                  trigger('dynamicForm', 'typeField', {
                    fieldName: `row_selector_${r.name}`,
                    value: val,
                  });
                }}
              />
            </div>
            <div className='dynamic-form-row-item'>
              <TextInput
                onChange={(e) =>
                  trigger('dynamicForm', 'typeField', {
                    fieldName: `row_text_${r.name}`,
                    value: e.target.value,
                  })
                }
                value={fieldsObject[`row_text_${r.name}`].meta}
              />
            </div>
            <div className='dynamic-form-row-item'>
              {r.isRemovable ? (
                <Trash
                  color={'error'}
                  onClick={() => {
                    trigger('formPageController', 'deleteFormRow', {
                      name: r.name,
                    });
                  }}
                />
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
