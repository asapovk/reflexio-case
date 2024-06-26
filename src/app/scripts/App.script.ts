import { Script } from '@reflexio/core-v1/lib/interfaces/IScript';
import { _IState, _ITriggers } from '../../_redux/types';
import { ScriptOptsType, WatchArgsType } from '@reflexio/core-v1/lib/types';
import { commonRoutes } from '../routes/common';
import { groupsRoutes } from '../routes/groups';
import { mapError } from '../../_utils/auth/errors';
import { errorsMap } from '../../_utils/app/mapErrors';

const routes = [...commonRoutes, ...groupsRoutes];

export class AppScript extends Script<
  _ITriggers,
  _IState,
  'appController',
  'init',
  null
> {
  public opts: ScriptOptsType<_ITriggers, _IState, 'appController', null>;

  constructor(opts) {
    super();
    this.opts = opts;
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
