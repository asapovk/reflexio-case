import { Script } from '@reflexio/core-v1/lib/Script';
import { _IState, _ITriggers } from '../../_redux/types';
import { ScriptOptsType, WatchArgsType } from '@reflexio/core-v1/lib/types';

export class FormPageControllerScript extends Script<
  _ITriggers,
  _IState,
  'formPageController',
  'init',
  null
> {
  opts: ScriptOptsType<_ITriggers, _IState, 'formPageController', null>;
  constructor(opts) {
    super();
    this.opts = opts;
  }

  private nexRowIndex: number = 0;
  private options = [
    {
      text: 'Goldfish',
      value: 'goldfish',
    },
    {
      text: 'Dog',
      value: 'dog',
    },
    {
      text: 'Cat',
      value: 'cat',
    },
    {
      text: 'Homster',
      value: 'homster',
    },
  ];

  private setRows() {
    const appState = this.opts.getCurrentState();
    const fieldsObject = appState.formPage.dynamicForm.fields;
    const formFieldsNames = Object.keys(fieldsObject);
    const selectorFields = formFieldsNames.filter((fn) =>
      fn.includes('row_selector_')
    );
    const isRemovable = selectorFields.length > 2;
    this.opts.setStatus(
      'setFormRows',
      selectorFields.map((sf) => ({
        isRemovable: isRemovable,
        name: sf.split('_')[sf.split('_').length - 1],
      }))
    );
  }

  private getSelecorsValues() {
    const appState = this.opts.getCurrentState();
    const fieldsObject = appState.formPage.dynamicForm.fields;
    const formFieldsNames = Object.keys(fieldsObject);
    const selectorFields = formFieldsNames.filter((fn) =>
      fn.includes('row_selector_')
    );
    const values = selectorFields.map((sf) => fieldsObject[sf].value);

    return values;
  }

  private updateSelectorsMeta() {
    const appState = this.opts.getCurrentState();
    const fieldsObject = appState.formPage.dynamicForm.fields;
    //console.log(fieldsObject);
    const formFieldsNames = Object.keys(fieldsObject);
    const selectorFields = formFieldsNames.filter((fn) =>
      fn.includes('row_selector_')
    );
    const selectorsValues = this.getSelecorsValues();
    const availableOptions = this.options.filter(
      (o) => !selectorsValues.includes(o.value)
    );

    for (const sf of selectorFields) {
      const currVal = fieldsObject[sf].value;
      const currOption = this.options.find((o) => o.value === currVal);
      this.opts.trigger('dynamicForm', 'updateFieldMeta', {
        fieldName: sf,
        meta: [...availableOptions, currOption],
      });
    }
  }

  private handleDeleteRow(name: string) {
    const selectorName = `row_selector_${name}`;
    const textInputName = `row_text_${name}`;
    this.opts.trigger('dynamicForm', 'dropField', selectorName);
    this.opts.trigger('dynamicForm', 'dropField', textInputName);
  }
  private handleAddRow(rowConfig: {
    selectorOpt: Array<{ text: string; value: string }>;
  }) {
    const selectorsValues = this.getSelecorsValues();
    const availableOptions = this.options.filter(
      (o) => !selectorsValues.includes(o.value)
    );
    if (!availableOptions.length) {
      return;
    }
    this.opts.trigger('dynamicForm', 'addField', {
      name: `row_text_${this.nexRowIndex}`,
      validators: [],
      initialValue: '',
    });
    this.opts.trigger('dynamicForm', 'addField', {
      sync: true,
      name: `row_selector_${this.nexRowIndex}`,
      validators: [],
      meta: availableOptions,
      initialValue: availableOptions[0].value,
    });
    this.nexRowIndex += 1;
  }

  init(args: null): void {
    this.opts.trigger('dynamicForm', 'init', {
      fieldsOpts: [],
    });
    this.handleAddRow({
      selectorOpt: this.options,
    });
    this.setRows();
  }
  watch(args: WatchArgsType<_ITriggers, 'formPageController'>): void {
    const typeFormFieldEvent = this.opts.catchEvent(
      'dynamicForm',
      'typeField',
      args
    );
    if (typeFormFieldEvent.isCatched) {
      this.updateSelectorsMeta();
    }
    const dropEvent = this.opts.catchStatus('drop', args);
    if (dropEvent.isCatched) {
      this.opts.trigger('dynamicForm', 'dropForm', null);
      this.opts.drop();
    }
    const addFormRowEvent = this.opts.catchStatus('addFormRow', args);
    if (addFormRowEvent.isCatched) {
      this.handleAddRow({
        selectorOpt: this.options,
      });
      this.setRows();
      this.updateSelectorsMeta();
    }
    const deleteFormRowEvent = this.opts.catchStatus('deleteFormRow', args);
    if (deleteFormRowEvent.isCatched) {
      this.handleDeleteRow(deleteFormRowEvent.payload.name);
      this.setRows();
      this.updateSelectorsMeta();
    }
  }
}
