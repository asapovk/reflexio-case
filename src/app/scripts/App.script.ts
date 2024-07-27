/* eslint-disable @typescript-eslint/no-empty-function */
import { EffectiveScript, type WatchArgsType } from '@reflexio/core-v1';
import { _IState, _ITriggers } from '../../_redux/types';
import { commonRoutes } from '../routes/common';
import { groupsRoutes } from '../routes/groups';
import { mapError } from '../../_utils/auth/errors';
import { errorsMap } from '../../_utils/app/mapErrors';
import store from '../../_redux';
const routes = [...commonRoutes, ...groupsRoutes];

export class AppScript extends EffectiveScript<
  _ITriggers,
  _IState,
  'appController',
  'init'
> {
  constructor(opts) {
    super(opts);
  }
  afterEffects(args: WatchArgsType<_ITriggers, 'appController'>): void {
    console.log('afterEffet', args.trigger, args.status, args.payload);
    console.log(
      'Store getState:',
      store ? store.getState() : 'store is undefined'
    );
  }
  async init(args: null): Promise<void> {
    this.opts.trigger('eventManager', 'init', null);
    this.opts.trigger('router', 'init', null);
    this.opts.trigger('notification', 'init', { config: null });
    this.opts.trigger('groupsFormsManager', 'init', null);
    this.opts.trigger('stager', 'init', {
      failHandler: (opt) => {
        console.log('fail');
        opt.trigger('router', 'goTo', '/users');
      },
      routes,
    });
    const href = window.location.href.replace(window.location.origin, '');
    this.opts.trigger('router', 'goTo', href);
    //this.opts.trigger('router', 'goTo', '/users');
  }

  watch(args: WatchArgsType<_ITriggers, 'appController'>): void {
    //console.log('catch LOG event', args.trigger, args.status);

    const goToDestinationEvent = this.opts.catchEvent(
      'router',
      'goToDestination',
      args
    );
    if (goToDestinationEvent.isCatched) {
      const destination = this.opts.getCurrentState().app.router.destination;
      if (destination) {
        this.opts.trigger('stager', 'go', destination);
      }
    }
    const throwErrorEvent = this.opts.catchStatus('throwError', args);
    if (throwErrorEvent.isCatched) {
      console.log('THROW APP ERR');
      const text = throwErrorEvent.payload.text;
      const mappedErrorText = errorsMap[text];
      if (mappedErrorText) {
        this.opts.trigger('notification', 'show', {
          text: mappedErrorText,
          color: 'ERROR',
          timeout: 2000,
        });
      }
    }
    const throwSuccessEvent = this.opts.catchStatus('throwSuccess', args);
    if (throwSuccessEvent.isCatched) {
      const text = throwSuccessEvent.payload.text;
      this.opts.trigger('notification', 'show', {
        text: text,
        color: 'SUCCESS',
        timeout: 2000,
      });
    }
  }
}
