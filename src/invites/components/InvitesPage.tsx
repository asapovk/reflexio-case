/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { Fragment, memo } from 'react';
import { useTrigger } from '@reflexio/react-v1/lib/useTrigger';
import { useReflector } from '@reflexio/react-v1/lib/useReflector';
import { _IState, _ITriggers } from '../../_redux/types';
import '../styles/users-table.less';
import { Button } from '../../_ui/Button';
import { IInviteRow } from '../../_interfaces/invites/IInvitesRow.interface';

export const InvitesTableHeader = () => (
  <div className='table-header'>
    <div className='table-column'>Group ID</div>
    <div className='table-column'>Group Name</div>
    <div className='table-column'>Date create</div>
  </div>
);
export const InvitesTableRow = (props: {
  invite: IInviteRow;
  onClick: () => void;
}) => (
  <div onClick={() => props.onClick()} className='table-row'>
    <div className='table-column'>{props.invite.inviteId}</div>
    <div className='table-column'>{props.invite.link}</div>
    <div className='table-column'>{props.invite.dtCreate}</div>
  </div>
);

export const InvitesPage = () => {
  const trigger = useTrigger<_ITriggers>('InvitesPage');
  const appState = useReflector<_ITriggers, _IState, _IState>(
    (state) => state,
    ['invitesController', 'createInviteForm']
  );
  const list = appState.invites.invitesComponent.invitesList;

  return (
    <div>
      <div className='users-page-header'>
        <Button onClick={() => trigger('router', 'goTo', '/invites/create')}>
          Создать группу
        </Button>
      </div>
      <div className='users-table'>
        <InvitesTableHeader />
        {list.map((u) => (
          <InvitesTableRow
            onClick={() =>
              trigger('router', 'goTo', `/invites/${u.inviteId}/edit`)
            }
            key={u.inviteId}
            invite={u}
          />
        ))}
      </div>
    </div>
  );
};
