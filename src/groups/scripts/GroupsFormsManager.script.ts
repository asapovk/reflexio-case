/* eslint-disable @typescript-eslint/no-empty-function */
import { Script } from '@reflexio/core-v1/lib/interfaces/IScript';
import { _IState, _ITriggers } from '../../_redux/types';
import { ScriptOptsType, WatchArgsType } from '@reflexio/core-v1/lib/types';

export class GroupsFormsManagerScript extends Script<
  _ITriggers,
  _IState,
  'groupsFormsManager',
  'init',
  null
> {
  opts: ScriptOptsType<_ITriggers, _IState, 'groupsFormsManager', null>;
  constructor(opts) {
    super();
    this.opts = opts;
  }
  private formsMap: Record<number, { data: any; type: 'edit' | 'create' }> = {};
  private openGroupCreateForm(data: any) {
    this.opts.trigger('createGroupForm', 'init', {
      fieldsOpts: [
        {
          name: 'groupName',
          sync: true,
          initialValue: data,
          validators: [],
        },
      ],
    });
  }
  private opentGroupEfitForm(data: any) {
    this.opts.trigger('createGroupForm', 'init', {
      fieldsOpts: [
        {
          name: 'groupName',
          sync: true,
          initialValue: data,
          validators: [],
        },
      ],
    });
  }
  private saveFormData(formId: number, data: any, type: 'edit' | 'create') {
    this.formsMap[formId] = { data, type };
  }
  private dropCurrentForm() {
    const newFormsList = this.opts
      .getCurrentState()
      .groups.groupsFormsManager.formsList.filter(
        (f) => f.formId !== this.currentFormId
      );
    delete this.formsMap[this.currentFormId];
    this.currentFormId = null;
  }
  private currentFormId: number;
  init(args: null): void {
    console.log('INIT FORMS MANAGES');
  }
  watch(args: WatchArgsType<_ITriggers, 'groupsFormsManager'>): void {
    const dropCurrentFormEvent = this.opts.catchStatus('dropCurrentForm', args);
    if (dropCurrentFormEvent.isCatched) {
      this.dropCurrentForm();
    }
    const openNewFormEvent = this.opts.catchStatus('openNewForm', args);
    if (openNewFormEvent.isCatched) {
      const newFormId = Date.now();
      const formData = openNewFormEvent.payload.initialData;
      const formType = openNewFormEvent.payload.type;
      if (formType === 'create') {
        this.openGroupCreateForm('');
      }
      if (formType === 'edit') {
        this.opentGroupEfitForm(formData);
      }
      this.saveFormData(newFormId, {}, formType);
    }
    const openFormEvent = this.opts.catchStatus('openForm', args);
    if (openFormEvent.isCatched) {
      this.currentFormId = openFormEvent.payload.formId;
      const currForm = this.formsMap[this.currentFormId];
      const currFormType = currForm.type;
      if (currFormType === 'create') {
        this.openGroupCreateForm(currForm.data);
      }
      if (currFormType === 'edit') {
        this.opentGroupEfitForm(currForm.data);
      }
    }
    const updateCurrentFormEvent = this.opts.catchStatus(
      'updateCurrentForm',
      args
    );
    if (updateCurrentFormEvent.isCatched) {
      const currentFormId = this.currentFormId;
      const currentFormType = this.formsMap[currentFormId].type;

      this.saveFormData(currentFormId, {}, currentFormType);
    }
  }
}
