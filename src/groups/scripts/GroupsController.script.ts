/* eslint-disable @typescript-eslint/no-empty-function */
import { Script } from '@reflexio/core-v1/lib/interfaces/IScript';
import { _IState, _ITriggers } from '../../_redux/types';
import { ScriptOptsType, WatchArgsType } from '@reflexio/core-v1/lib/types';
import { mapGroupsToRow } from '../../_utils/groups/mapGroupsToRow';
import { IGroupRow } from '../../_interfaces/groups/IGroupsRow.interface';

export class GroupsControllerScript extends Script<
  _ITriggers,
  _IState,
  'groupsController',
  'init',
  null
> {
  opts: ScriptOptsType<_ITriggers, _IState, 'groupsController', null>;
  constructor(opts) {
    super();
    this.opts = opts;
  }
  private selectCurrentGroup(groupId: number) {
    let index;
    const currGroup = this.opts
      .getCurrentState()
      .groups.groupsComponent.groupsList.find((g, i) => {
        if (g.groupId === groupId) {
          index = i;

          return g;
        }
      });

    return { currGroup, index };
  }
  private handleAddGroupToList(row: IGroupRow) {
    const currList =
      this.opts.getCurrentState().groups.groupsComponent.groupsList;
    this.opts.setStatus('setGroupsList', [row, ...currList]);
  }
  private handleUpdateGroupInList(row: Partial<IGroupRow>, groupId: number) {
    const currList =
      this.opts.getCurrentState().groups.groupsComponent.groupsList;
    const groupIndex = currList.findIndex((g) => g.groupId === groupId);
    if (groupIndex !== -1) {
      const newRow = { ...currList[groupIndex], ...row };
      currList[groupIndex] = newRow;
      this.opts.setStatus('setGroupsList', currList);
    }
  }
  async init(args: null) {
    //this.opts.trigger('groupsRightColumn', 'init', null);
    const res = await this.opts.hook('loadGroups', 'init', 'done', null, 10000);
    if (res.data) {
      this.opts.setStatus('setGroupsList', mapGroupsToRow(res.data));
      this.opts.setStatus('setIsReady', true);
    }
  }
  watch(args: WatchArgsType<_ITriggers, 'groupsController'>): void {
    const throwSuccessEvent = this.opts.catchStatus('throwSuccess', args);
    if (throwSuccessEvent.isCatched) {
      const text = throwSuccessEvent.payload.text;
      this.opts.setStatus('setSuccessMessage', text);
    }

    const unselectCurrentGroupEvent = this.opts.catchStatus(
      'unselectCurrentGroup',
      args
    );
    if (unselectCurrentGroupEvent.isCatched) {
      this.opts.setStatus('unselectCurrentGroupIndex', null);
    }
    const selectCurrentGroupEventg = this.opts.catchStatus(
      'selectCurrentGroup',
      args
    );
    if (selectCurrentGroupEventg.isCatched) {
      const groupId = selectCurrentGroupEventg.payload.groupId;
      const { currGroup, index } = this.selectCurrentGroup(groupId);
      this.opts.setStatus('setCurrentGroup', currGroup);
      this.opts.setStatus('setSelectedCurrentGroupIndex', { index });
    }
    const openEditGroupEvent = this.opts.catchStatus('openEditGroupForm', args);
    if (openEditGroupEvent.isCatched) {
      const groupId = openEditGroupEvent.payload.groupId;
      const { currGroup, index } = this.selectCurrentGroup(groupId);
      this.opts.setStatus('setCurrentGroup', currGroup);
      this.opts.trigger('createGroupForm', 'init', {
        fieldsOpts: [
          {
            name: 'groupName',
            initialValue: currGroup.name,
            validators: [],
            sync: true,
          },
        ],
        onSubmit: async (fst, ut) => {
          const newGroupName = fst.fields['groupName'].value;
          const saveRes = await this.opts.hook('updateGroup', 'init', 'done', {
            groupId: groupId,
            groupName: newGroupName,
          });
          if (!saveRes.rejected) {
            this.handleUpdateGroupInList({ name: newGroupName }, groupId);
            this.opts.setStatus('throwSuccess', {
              text: `Группа ${newGroupName} обновлена`,
            });
            setTimeout(() => {
              this.opts.setStatus('closeGroupForm', null);
            }, 300);
          }
        },
      });
    }
    const openCreateForm = this.opts.catchStatus('openCreateGroupForm', args);
    if (openCreateForm.isCatched) {
      this.opts.trigger('createGroupForm', 'init', {
        fieldsOpts: [
          {
            sync: true,
            name: 'groupName',
            initialValue: '',
            validators: [],
          },
        ],
        onSubmit: async (fst, ut) => {
          const newGroupName = fst.fields['groupName'].value;
          const saveRes = await this.opts.hook('createGroup', 'init', 'done', {
            groupName: newGroupName,
          });
          if (!saveRes.rejected) {
            this.handleAddGroupToList({
              dtCreate: new Date().toISOString(),
              groupId: Date.now(), //saveRes.data.createGroup,
              name: newGroupName,
            });
            this.opts.setStatus('throwSuccess', {
              text: `Группа ${newGroupName} создана`,
            });
            setTimeout(() => {
              this.opts.setStatus('setSuccessMessage', null);
              this.opts.setStatus('closeGroupForm', null);
            }, 400);
          }
        },
      });
    }
  }
}
