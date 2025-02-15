import { Bite, Slice } from '@reflexio/core-v1';
import { BiteStatusWrap } from '@reflexio/core-v1/lib/types';
import { _IState, _ITriggers } from '../_redux/types';

import {
  IFormBiteTriggers,
  IFormState,
} from '@reflexio/bite-forms-v1/lib/types';
import { biteForms } from '@reflexio/bite-forms-v1';
import { FormPageControllerScript } from './script/FormPageController.script';

export type IFormPageState = {
  dynamicForm: IFormState;
  formRows: Array<{
    name: string;
    isRemovable: boolean;
  }>;
};

export type IFormPageTriggers = {
  formPageController: BiteStatusWrap<{
    init: null;
    drop: null;
    addFormRow: null;
    deleteFormRow: { name: string };
    setFormRows: IFormPageState['formRows'];
  }>;
  dynamicForm: BiteStatusWrap<IFormBiteTriggers>;
};

export const formPageBite = Bite<
  IFormPageTriggers,
  {},
  'formPageController',
  _ITriggers
>(
  {
    init: null,
    drop(state: IFormPageState, payload) {
      state.formRows = [];
    },
    setFormRows(state: IFormPageState, payload) {
      state.formRows = payload;
    },
    addFormRow: null,
    deleteFormRow: null,
  },
  {
    script: FormPageControllerScript,
    instance: 'stable',
    watchScope: ['formPageController', { dynamicForm: 'typeField' }],
    initOn: 'init',
  }
);

export const formPageSlice = Slice<
  IFormPageTriggers,
  IFormPageState,
  _ITriggers,
  _IState
>(
  'formPage',
  {
    dynamicForm: biteForms('dynamicForm'),
    formPageController: formPageBite,
  },
  { dynamicForm: null, formRows: [] }
);
