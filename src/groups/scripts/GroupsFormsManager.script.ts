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
  private lockedFormId: number;
  private pinnedFormId: number;
  private pinnedRoute: string;
  private formsMap: Record<number, { data: any; type: 'edit' | 'create' }> = {};
  private openGroupCreateForm(data: any) {
    this.opts.trigger('createGroupForm', 'init', {
      fieldsOpts: [
        {
          name: 'groupName',
          initialValue: data,
          validators: [],
          sync: true,
        },
      ],
      onSubmit: async (fst, ut) => {
        const inputValue = fst.fields['groupName'].value;
        this.opts.setStatus('updateCurrentForm', { data: inputValue });
        this.opts.trigger('groupsController', 'submitCreateGroupForm', fst);
      },
    });
  }
  private opentGroupEfitForm(data: any) {
    this.opts.trigger('createGroupForm', 'init', {
      fieldsOpts: [
        {
          name: 'groupName',
          initialValue: data,
          validators: [],
          sync: true,
        },
      ],
      onSubmit: async (fst, ut) => {
        const inputValue = fst.fields['groupName'].value;
        this.opts.setStatus('updateCurrentForm', { data: inputValue });
        this.opts.trigger('groupsController', 'submitEditGroupForm', fst);
      },
    });
  }
  private saveFormData(formId: number, data: any, type: 'edit' | 'create') {
    this.formsMap[formId] = { data, type };
  }

  private pinLockedForm() {
    this.pinnedFormId = this.lockedFormId;
    this.lockedFormId = null;
  }

  private openPinnedForm() {
    const formId = this.pinnedFormId;
    this.pinnedFormId = null;
    this.pinnedRoute = null;
    //this.dropFormInTray(formId);
  }
  private dropFormInTray(fromId: number) {
    const newFormsList = this.opts
      .getCurrentState()
      .groups.groupsFormsManager.formsList.filter((f) => f.formId !== fromId);
    delete this.formsMap[fromId];
  }
  private dropCurrentForm() {
    const currentFormId = this.currentFormId;
    if (!this.lockedFormId || this.lockedFormId !== currentFormId) {
      const newFormsList = this.opts
        .getCurrentState()
        .groups.groupsFormsManager.formsList.filter(
          (f) => f.formId !== currentFormId
        );
      delete this.formsMap[currentFormId];
    }
    this.currentFormId = null;
    this.opts.trigger('createGroupForm', 'dropForm', null);
  }
  private currentFormId: number;
  init(args: null): void {
    console.log('INIT FORMS MANAGES');
  }
  watch(args: WatchArgsType<_ITriggers, 'groupsFormsManager'>): void {
    const lockCurrentFormEvent = this.opts.catchStatus('lockCurrentForm', args);
    if (lockCurrentFormEvent.isCatched) {
      this.pinnedRoute = this.opts.getCurrentState().app.router.currentLocation;
      this.lockedFormId = this.currentFormId;
    }
    const releaseLockedFormEvent = this.opts.catchStatus(
      'releaseLockedForm',
      args
    );
    if (releaseLockedFormEvent.isCatched) {
      this.lockedFormId = null;
      this.pinnedRoute = null;
    }
    const pinLockedFormEvent = this.opts.catchStatus('pinLockedForm', args);
    if (pinLockedFormEvent.isCatched) {
      this.pinLockedForm();
      this.opts.trigger('notification', 'showSmart', {
        returnToForm: true,
      });
    }
    const openPinnedFormEvent = this.opts.catchStatus('openPinnedForm', args);
    if (openPinnedFormEvent.isCatched) {
      this.opts.trigger('router', 'goTo', this.pinnedRoute);
      setTimeout(() => this.openPinnedForm());
    }

    const dropCurrentFormEvent = this.opts.catchStatus('dropCurrentForm', args);
    if (dropCurrentFormEvent.isCatched) {
      this.dropCurrentForm();
    }
    const openNewFormEvent = this.opts.catchStatus('openNewForm', args);
    if (openNewFormEvent.isCatched) {
      if (!this.pinnedFormId) {
        const newFormId = Date.now();
        this.currentFormId = newFormId;
        const formData = openNewFormEvent.payload.initialData;
        const formType = openNewFormEvent.payload.type;
        if (formType === 'create') {
          this.openGroupCreateForm('');
        }
        if (formType === 'edit') {
          this.opentGroupEfitForm(formData);
        }
        this.saveFormData(newFormId, {}, formType);
      } else {
        this.opts.setStatus('openForm', {
          formId: this.pinnedFormId,
        });
      }
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

      this.saveFormData(
        currentFormId,
        updateCurrentFormEvent.payload.data,
        currentFormType
      );
    }
  }
}
